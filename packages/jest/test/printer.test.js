/** @jsx jsx */
import 'test-utils/setup-env'
import React from 'react'
import { act } from 'react'
import prettyFormat from 'pretty-format'
import { css, jsx, CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { createSerializer } from '@emotion/jest'
import { render } from '@testing-library/react'
import * as testRenderer from 'react-test-renderer'
import { ignoreConsoleErrors } from 'test-utils'

let emotionPlugin = createSerializer()

const { ReactElement, ReactTestComponent, DOMElement } = prettyFormat.plugins

describe('jest-emotion with dom elements', () => {
  const divStyle = css`
    color: red;
  `

  const svgStyle = css`
    width: 100%;
  `

  test('replaces class names and inserts styles into React test component snapshots', async () => {
    const tree = (
      await act(() =>
        testRenderer.create(
          <div css={divStyle}>
            <svg css={svgStyle} />
          </div>
        )
      )
    ).toJSON()

    const output = prettyFormat(tree, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toMatchSnapshot()
  })

  test('replaces class names and inserts styles into DOM element snapshots', () => {
    const divRef = React.createRef()
    render(
      <div css={divStyle} ref={divRef}>
        <svg css={svgStyle} />
      </div>
    )

    const output = prettyFormat(divRef.current, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toMatchSnapshot()
  })
})

describe('jest-emotion with DOM elements disabled', () => {
  const emotionPlugin = createSerializer({ DOMElements: false })

  const divStyle = css`
    color: red;
  `

  const svgStyle = css`
    width: 100%;
  `

  test('replaces class names and inserts styles into React test component snapshots', async () => {
    const tree = await act(() =>
      testRenderer.create(
        <div css={divStyle}>
          <svg css={svgStyle} />
        </div>
      )
    )

    const output = prettyFormat(tree.toJSON(), {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toMatchSnapshot()
  })

  test('does not replace class names or insert styles into DOM element snapshots', async () => {
    const divRef = React.createRef()
    render(
      <div css={divStyle} ref={divRef}>
        <svg css={svgStyle} />
      </div>
    )

    const output = prettyFormat(divRef.current, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toMatchSnapshot()
  })
})

test('allows to opt-out from styles printing', () => {
  const emotionPlugin = createSerializer({ includeStyles: false })

  const divStyle = css`
    color: red;
  `

  const svgStyle = css`
    width: 100%;
  `

  const divRef = React.createRef()
  render(
    <div css={divStyle} ref={divRef}>
      <svg css={svgStyle} />
    </div>
  )

  const output = prettyFormat(divRef.current, {
    plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
  })

  expect(output).toMatchSnapshot()
})

test('does not replace class names that are not from emotion', () => {
  let { container } = render(
    <div
      className="net-42 net"
      css={css`
        color: darkorchid;
      `}
    />
  )

  const output = prettyFormat(container.firstChild, {
    plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
  })

  expect(output).toMatchSnapshot()
})

describe('jest-emotion with nested selectors', () => {
  const divStyle = css`
    color: blue;

    header & {
      color: red;
    }
  `

  test('replaces class names and inserts styles into React test component snapshots', async () => {
    const tree = (
      await act(() => testRenderer.create(<div css={divStyle} />))
    ).toJSON()

    const output = prettyFormat(tree, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toBe(`.emotion-0 {
  color: blue;
}

header .emotion-0 {
  color: red;
}

<div
  className="emotion-0"
/>`)
  })

  test('replaces class names and inserts styles into DOM element snapshots', () => {
    const { container } = render(<div css={divStyle} />)

    const output = prettyFormat(container.firstChild, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toBe(`.emotion-0 {
  color: blue;
}

header .emotion-0 {
  color: red;
}

<div
  class="emotion-0"
/>`)
  })
})

test('prints speedy styles', () => {
  const speedyCache = createCache({
    key: 'speedy-key',
    speedy: true
  })
  const { container } = render(
    <CacheProvider value={speedyCache}>
      <div
        css={css`
          color: hotpink;
        `}
      />
    </CacheProvider>
  )

  expect(
    prettyFormat(container.firstChild, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })
  ).toMatchSnapshot()
})
