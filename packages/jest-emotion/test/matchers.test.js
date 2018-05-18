import React from 'react'
import renderer from 'react-test-renderer'
import * as enzyme from 'enzyme'
import * as emotion from 'emotion'
import { createSerializer, createMatchers } from '../src'

expect.addSnapshotSerializer(createSerializer(emotion))
expect.extend(createMatchers(emotion))

describe('toHaveStyleRule', () => {
  const divStyle = emotion.css`
    color: red;
  `

  const svgStyle = emotion.css`
    width: 100%;
  `

  it('matches styles on the top-most node passed in', () => {
    const tree = renderer
      .create(
        <div className={divStyle}>
          <svg className={svgStyle} />
        </div>
      )
      .toJSON()

    expect(tree).toHaveStyleRule('color', 'red')
    expect(tree).not.toHaveStyleRule('width', '100%')

    const svgNode = tree.children[0]

    expect(svgNode).toHaveStyleRule('width', '100%')
    expect(svgNode).not.toHaveStyleRule('color', 'red')
  })

  it('supports asymmetric matchers', () => {
    const tree = renderer
      .create(
        <div className={divStyle}>
          <svg className={svgStyle} />
        </div>
      )
      .toJSON()

    expect(tree).toHaveStyleRule('color', expect.anything())
    expect(tree).not.toHaveStyleRule('padding', expect.anything())

    const svgNode = tree.children[0]

    expect(svgNode).toHaveStyleRule('width', expect.stringMatching(/.*%$/))
  })

  it('supports enzyme render methods', () => {
    const Component = () => (
      <div className={divStyle}>
        <svg className={svgStyle} />
      </div>
    )
    const enzymeMethods = ['shallow', 'mount']

    enzymeMethods.forEach(method => {
      const wrapper = enzyme[method](<Component />)
      expect(wrapper).toHaveStyleRule('color', 'red')
      expect(wrapper).not.toHaveStyleRule('width', '100%')
      const svgNode = wrapper.find('svg')
      expect(svgNode).toHaveStyleRule('width', '100%')
      expect(svgNode).not.toHaveStyleRule('color', 'red')
    })
  })
})
