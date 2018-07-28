import renderer from 'react-test-renderer'
import * as enzyme from 'enzyme'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { matchers } from '@emotion/snapshot-serializer'

expect.extend(matchers)

describe('toHaveStyleRule', () => {
  const divStyle = css`
    color: red;
  `

  const svgStyle = css`
    width: 100%;
  `

  const enzymeMethods = ['shallow', 'mount', 'render']

  it('matches styles on the top-most node passed in', () => {
    const tree = renderer
      .create(
        <div css={divStyle}>
          <svg css={svgStyle} />
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
        <div css={divStyle}>
          <svg css={svgStyle} />
        </div>
      )
      .toJSON()

    expect(tree).toHaveStyleRule('color', expect.anything())
    expect(tree).not.toHaveStyleRule('padding', expect.anything())

    const svgNode = tree.children[0]

    expect(svgNode).toHaveStyleRule('width', expect.stringMatching(/.*%$/))
  })

  it.skip('supports enzyme render methods', () => {
    const Component = () => (
      <div css={divStyle}>
        <svg css={svgStyle} />
      </div>
    )

    enzymeMethods.forEach(method => {
      const wrapper = enzyme[method](<Component />)
      expect(wrapper).toHaveStyleRule('color', 'red')
      expect(wrapper).not.toHaveStyleRule('width', '100%')
      const svgNode = wrapper.find('svg')
      expect(svgNode).toHaveStyleRule('width', '100%')
      expect(svgNode).not.toHaveStyleRule('color', 'red')
    })
  })

  it.skip('supports styled components', () => {
    const Div = styled.div`
      color: red;
    `
    const Svg = styled.svg`
      width: 100%;
    `

    enzymeMethods.forEach(method => {
      const wrapper = enzyme[method](
        <Div>
          <Svg />
        </Div>
      )
      expect(wrapper).toHaveStyleRule('color', 'red')
      expect(wrapper).not.toHaveStyleRule('width', '100%')
      const svgNode =
        method === 'render' ? wrapper.find('svg') : wrapper.find(Svg)
      expect(svgNode).toHaveStyleRule('width', '100%')
      expect(svgNode).not.toHaveStyleRule('color', 'red')
    })
  })

  it('fails if no styles are found', () => {
    expect(() => {
      const tree = renderer.create(<div />).toJSON()
      expect(tree).toHaveStyleRule('color', 'red')
    }).toThrowErrorMatchingSnapshot()
  })

  it('supports regex values', () => {
    const tree = renderer.create(<div css={divStyle} />).toJSON()
    expect(tree).toHaveStyleRule('color', /red/)
  })
})
