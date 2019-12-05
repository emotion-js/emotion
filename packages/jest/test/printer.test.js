// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import 'test-utils/legacy-env'
import renderer from 'react-test-renderer'
import prettyFormat from 'pretty-format'
/** @jsx jsx */
import { css, jsx, CacheProvider } from '@emotion/core'
import createCache from '@emotion/cache'
import { createSerializer } from 'jest-emotion'
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

  it('replaces class names and inserts styles into React test component snapshots', () => {
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

  it('replaces class names and inserts styles into DOM element snapshots', () => {
    const divRef = React.createRef()
    ReactDOM.render(
      <div css={divStyle} ref={divRef}>
        <svg css={svgStyle} />
      </div>,
      document.createElement('div')
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

  it('replaces class names and inserts styles into React test component snapshots', () => {
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

  it('does not replace class names or insert styles into DOM element snapshots', () => {
    const divRef = React.createRef()
    ReactDOM.render(
      <div css={divStyle} ref={divRef}>
        <svg css={svgStyle} />
      </div>,
      document.createElement('div')
    )

    const output = prettyFormat(divRef.current, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toMatchSnapshot()
  })
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

  it('replaces class names and inserts styles into React test component snapshots', () => {
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

test('throws nice error for invalid css', () => {
  const tree = renderer.create(<div css={css`jnnjvh@'jevhevhb`} />).toJSON()

  expect(() => {
    ignoreConsoleErrors(() => {
      prettyFormat(tree, {
        plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
      })
    })
  }).toThrowErrorMatchingSnapshot()
})

test('prints speedy styles', () => {
  const speedyCache = createCache({
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
