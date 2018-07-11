/* eslint-disable react/no-unknown-property */
import { h } from 'preact'
import render from 'preact-render-to-json'
import prettyFormat from 'pretty-format'
import * as emotion from 'emotion'
import { createSerializer } from '../src'
const { ReactElement, ReactTestComponent, DOMElement } = prettyFormat.plugins

/** @jsx h */

describe('jest-emotion with preact', () => {
  const emotionPlugin = createSerializer(emotion)

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
