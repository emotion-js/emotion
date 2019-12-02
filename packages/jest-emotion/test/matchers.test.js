import 'test-utils/legacy-env'
import renderer from 'react-test-renderer'
/** @jsx jsx */
import * as enzyme from 'enzyme'
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { matchers } from 'jest-emotion'

const { toHaveStyleRule } = matchers

expect.extend(matchers)

describe('toHaveStyleRule', () => {
  const divStyle = css`
    color: red;
  `

  const svgStyle = css`
    width: 100%;
  `

  const enzymeMethods = ['mount', 'render']

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

  it('supports enzyme render methods', () => {
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

  // i think this isn't working because of forwardRef
  it.skip('supports styled components', () => {
    const Div = styled('div')`
      color: red;
    `
    const Svg = styled('svg')`
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
    const tree = renderer.create(<div />).toJSON()
    const result = toHaveStyleRule(tree, 'color', 'red')
    expect(result.pass).toBe(false)
    expect(result.message()).toBe('Property not found: color')
  })

  it('supports regex values', () => {
    const tree = renderer.create(<div css={divStyle} />).toJSON()
    expect(tree).toHaveStyleRule('color', /red/)
  })

  it.skip('returns a message explaining the failure', () => {
    const tree = renderer.create(<div css={divStyle} />).toJSON()

    // When expect(tree).toHaveStyleRule('color', 'blue') fails
    const resultFail = toHaveStyleRule(tree, 'color', 'blue')
    expect(resultFail.message()).toMatchSnapshot()

    // When expect(tree).not.toHaveStyleRule('color', 'red')
    const resultPass = toHaveStyleRule(tree, 'color', 'red')
    expect(resultPass.message()).toMatchSnapshot()
  })

  it('matches styles on the focus, hover targets', () => {
    const localDivStyle = css`
      color: white;
      &:hover {
        color: yellow;
      }
      &:focus {
        color: black;
      }
    `
    const tree = renderer
      .create(
        <div css={localDivStyle}>
          <svg css={svgStyle} />
        </div>
      )
      .toJSON()

    expect(tree).toHaveStyleRule('color', 'yellow', { target: ':hover' })
    expect(tree).toHaveStyleRule('color', 'black', { target: ':focus' })
    expect(tree).toHaveStyleRule('color', 'white')
  })

  it('matches styles on the nested component or html element', () => {
    const Svg = styled('svg')`
      width: 100%;
      fill: blue;
    `
    const Div = styled('div')`
      color: red;
      ${Svg} {
        fill: green;
      }
      span {
        color: yellow;
      }
    `

    const tree = renderer
      .create(
        <Div>
          <Svg />
          <span>Test</span>
        </Div>
      )
      .toJSON()

    expect(tree).toHaveStyleRule('color', 'yellow', { target: 'span' })
    expect(tree).toHaveStyleRule('color', 'red')

    expect(tree).toHaveStyleRule('fill', 'green', { target: `${Svg}` })
  })

  it('matches target styles by regex', () => {
    const localDivStyle = css`
      a {
        color: yellow;
      }
      a:hover {
        color: black;
      }
    `
    const tree = renderer
      .create(
        <div css={localDivStyle}>
          <svg css={svgStyle} />
        </div>
      )
      .toJSON()

    expect(tree).toHaveStyleRule('color', 'yellow', { target: /a$/ })
  })

  it('matches proper style for css', () => {
    const tree = renderer
      .create(
        <div
          css={css`
            color: green;
            color: hotpink;
          `}
        />
      )
      .toJSON()
    expect(tree).not.toHaveStyleRule('color', 'green')
    expect(tree).toHaveStyleRule('color', 'hotpink')
  })

  it('matches style of the media', () => {
    const Svg = styled('svg')`
      width: 100%;
    `
    const Div = styled('div')`
      font-size: 30px;
      @media (min-width: 420px) {
        font-size: 50px;
      }
      @media (min-width: 920px) and (max-width: 1200px) {
        font-size: 70px;
      }
      @media screen and (max-width: 1200px) {
        font-size: 80px;
      }
      @media not all and (monochrome) {
        font-size: 90px;
      }
    `

    const tree = renderer
      .create(
        <Div>
          <Svg />
        </Div>
      )
      .toJSON()

    expect(tree).toHaveStyleRule('font-size', '30px')
    expect(tree).toHaveStyleRule('font-size', '50px', {
      media: '(min-width: 420px)'
    })
    expect(tree).toHaveStyleRule('font-size', '70px', {
      media: '(min-width: 920px) and (max-width: 1200px)'
    })
    expect(tree).toHaveStyleRule('font-size', '80px', {
      media: 'screen and (max-width: 1200px)'
    })
    expect(tree).toHaveStyleRule('font-size', '90px', {
      media: 'not all and (monochrome)'
    })
  })

  it('matches styles with target and media options', () => {
    const localDivStyle = css`
      color: white;
      @media (min-width: 420px) {
        color: green;
        &:hover {
          color: yellow;
        }
      }
    `
    const tree = renderer
      .create(
        <div css={localDivStyle}>
          <span>Test</span>
        </div>
      )
      .toJSON()

    expect(tree).toHaveStyleRule('color', 'yellow', {
      target: ':hover',
      media: '(min-width: 420px)'
    })
    expect(tree).toHaveStyleRule('color', 'green', {
      media: '(min-width: 420px)'
    })
    expect(tree).toHaveStyleRule('color', 'white')
  })

  it('fails if option media invalid', () => {
    const Div = styled('div')`
      font-size: 30px;
      @media (min-width: 420px) {
        font-size: 50px;
      }
    `

    const tree = renderer.create(<Div />).toJSON()

    const result = toHaveStyleRule(tree, 'font-size', '50px', {
      media: '(min-width-'
    })
    expect(result.pass).toBe(false)
    expect(result.message()).toBe('Property not found: font-size')
  })
})
