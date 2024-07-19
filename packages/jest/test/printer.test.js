import React from 'react'
import 'test-utils/legacy-env'
import renderer from 'react-test-renderer'
import prettyFormat from 'pretty-format'
/** @jsx jsx */
import { css, jsx, CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { createSerializer } from '@emotion/jest'
import { render } from '@testing-library/react'
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

  test('replaces class names and inserts styles into React test component snapshots', () => {
    const tree = renderer
      .create(
        <div css={divStyle}>
          <svg css={svgStyle} />
        </div>
      )
      .toJSON()

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

  test('replaces class names and inserts styles into React test component snapshots', () => {
    const tree = renderer
      .create(
        <div css={divStyle}>
          <svg css={svgStyle} />
        </div>
      )
      .toJSON()

    const output = prettyFormat(tree, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toMatchSnapshot()
  })

  test('does not replace class names or insert styles into DOM element snapshots', () => {
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
  let tree = renderer
    .create(
      <div
        className="net-42 net"
        css={css`
          color: darkorchid;
        `}
      />
    )
    .toJSON()

  const output = prettyFormat(tree, {
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

  test('replaces class names and inserts styles into React test component snapshots', () => {
    const tree = renderer.create(<div css={divStyle} />).toJSON()

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
})

test('prints speedy styles', () => {
  const speedyCache = createCache({
    key: 'speedy-key',
    speedy: true
  })
  const tree = renderer
    .create(
      <CacheProvider value={speedyCache}>
        <div
          css={css`
            color: hotpink;
          `}
        />
      </CacheProvider>
    )
    .toJSON()

  expect(
    prettyFormat(tree, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })
  ).toMatchSnapshot()
})
