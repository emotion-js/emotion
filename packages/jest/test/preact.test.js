/* eslint-disable react/no-unknown-property */
import 'test-utils/legacy-env'
/** @jsx h */
import { h } from 'preact'
import render from 'preact-render-to-json'
import prettyFormat from 'pretty-format'
import * as emotion from '@emotion/css'
import emotionPlugin from '@emotion/jest'
const { ReactElement, ReactTestComponent, DOMElement } = prettyFormat.plugins

describe('jest-emotion with preact', () => {
  const divStyle = emotion.css`
    color: red;
  `
  const svgStyle = emotion.css`
    width: 100%;
  `

  it('replaces class names and inserts styles into preact test component snapshots', () => {
    const tree = render(
      <div class={divStyle}>
        <svg class={svgStyle} />
      </div>
    )

    const output = prettyFormat(tree, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toMatchSnapshot()
  })

  it('handles elements with no props', () => {
    const tree = render(<div />)

    const output = prettyFormat(tree, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toMatchSnapshot()
  })
})
