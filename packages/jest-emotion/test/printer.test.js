import React from 'react'
import renderer from 'react-test-renderer'
import prettyFormat from 'pretty-format'
import * as emotion from 'emotion'
import { createSerializer } from '../src'

const { ReactElement, ReactTestComponent, DOMElement } = prettyFormat.plugins

describe('jest-emotion with dom elements', () => {
  const emotionPlugin = createSerializer(emotion)

  const divStyle = emotion.css`
    color: red;
  `

  const svgStyle = emotion.css`
    width: 100%;
  `

  it('replaces class names and inserts styles into React test component snapshots', () => {
    const tree = renderer
      .create(
        <div className={divStyle}>
          <svg className={svgStyle} />
        </div>
      )
      .toJSON()

    const output = prettyFormat(tree, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toMatchSnapshot()
  })

  it('replaces class names and inserts styles into DOM element snapshots', () => {
    const divElement = document.createElement('div')
    divElement.setAttribute('class', divStyle)
    const svgElement = document.createElement('svg')
    svgElement.setAttribute('class', svgStyle)
    divElement.appendChild(svgElement)

    const output = prettyFormat(divElement, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toMatchSnapshot()
  })
})

describe('jest-emotion with DOM elements disabled', () => {
  const emotionPlugin = createSerializer(emotion, { DOMElements: false })

  const divStyle = emotion.css`
    color: red;
  `

  const svgStyle = emotion.css`
    width: 100%;
  `

  it('replaces class names and inserts styles into React test component snapshots', () => {
    const tree = renderer
      .create(
        <div className={divStyle}>
          <svg className={svgStyle} />
        </div>
      )
      .toJSON()

    const output = prettyFormat(tree, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toMatchSnapshot()
  })

  it('does not replace class names or insert styles into DOM element snapshots', () => {
    const divElement = document.createElement('div')
    divElement.setAttribute('class', divStyle)
    const svgElement = document.createElement('svg')
    svgElement.setAttribute('class', svgStyle)
    divElement.appendChild(svgElement)

    const output = prettyFormat(divElement, {
      plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
    })

    expect(output).toMatchSnapshot()
  })
})

test('does not replace class names that are not from emotion', () => {
  const emotionPlugin = createSerializer(emotion)

  const classes = emotion.cx(
    'net-42',
    'net',
    emotion.css`
      color: darkorchid;
    `
  )

  let tree = renderer.create(<div className={classes} />).toJSON()

  const output = prettyFormat(tree, {
    plugins: [emotionPlugin, ReactElement, ReactTestComponent, DOMElement]
  })

  expect(output).toMatchSnapshot()
})

describe('jest-emotion with nested selectors', () => {
  const emotionPlugin = createSerializer(emotion)

  const divStyle = emotion.css`
    color: blue;

    header & {
      color: red;
    }
  `

  it('replaces class names and inserts styles into React test component snapshots', () => {
    const tree = renderer.create(<div className={divStyle} />).toJSON()

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
