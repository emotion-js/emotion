import 'test-utils/setup-env'
import renderer from 'react-test-renderer'
/** @jsx jsx */
import React from 'react'
import { act } from 'react'
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { matchers } from '@emotion/jest'

const isReact16 = React.version.split('.')[0] === '16'

const { toHaveStyleRule } = matchers

expect.extend(matchers)

describe('toHaveStyleRule', () => {
  const divStyle = css`
    color: red;
  `

  const svgStyle = css`
    width: 100%;
  `

  test('matches styles on the top-most node passed in', async () => {
    const tree = (
      await act(() =>
        renderer.create(
          <div css={divStyle}>
            <svg css={svgStyle} />
          </div>
        )
      )
    ).toJSON()

    expect(tree).toHaveStyleRule('color', 'red')
    expect(tree).not.toHaveStyleRule('width', '100%')

    const svgNode = tree.children[0]

    expect(svgNode).toHaveStyleRule('width', '100%')
    expect(svgNode).not.toHaveStyleRule('color', 'red')
  })

  test('supports asymmetric matchers', async () => {
    const tree = (
      await act(() =>
        renderer.create(
          <div css={divStyle}>
            <svg css={svgStyle} />
          </div>
        )
      )
    ).toJSON()

    expect(tree).toHaveStyleRule('color', expect.anything())
    expect(tree).not.toHaveStyleRule('padding', expect.anything())

    const svgNode = tree.children[0]

    expect(svgNode).toHaveStyleRule('width', expect.stringMatching(/.*%$/))
  })

  test('fails if no styles are found', async () => {
    const tree = (await act(() => renderer.create(<div />))).toJSON()
    const result = toHaveStyleRule(tree, 'color', 'red')
    expect(result.pass).toBe(false)
    expect(result.message()).toBe('Property not found: color')
  })

  test('supports regex values', async () => {
    const tree = (
      await act(() => renderer.create(<div css={divStyle} />))
    ).toJSON()
    expect(tree).toHaveStyleRule('color', /red/)
  })

  it.skip('returns a message explaining the failure', async () => {
    const tree = (
      await act(() => renderer.create(<div css={divStyle} />))
    ).toJSON()

    // When expect(tree).toHaveStyleRule('color', 'blue') fails
    const resultFail = toHaveStyleRule(tree, 'color', 'blue')
    expect(resultFail.message()).toMatchSnapshot()

    // When expect(tree).not.toHaveStyleRule('color', 'red')
    const resultPass = toHaveStyleRule(tree, 'color', 'red')
    expect(resultPass.message()).toMatchSnapshot()
  })

  test('matches styles on the focus, hover targets', async () => {
    const localDivStyle = css`
      color: white;
      &:hover {
        color: yellow;
      }
      &:focus {
        color: black;
      }
    `
    const tree = (
      await act(() =>
        renderer.create(
          <div css={localDivStyle}>
            <svg css={svgStyle} />
          </div>
        )
      )
    ).toJSON()

    expect(tree).toHaveStyleRule('color', 'yellow', { target: ':hover' })
    expect(tree).toHaveStyleRule('color', 'black', { target: ':focus' })
    expect(tree).toHaveStyleRule('color', 'white')
  })

  test('matches styles on the nested component or html element', async () => {
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

    const tree = (
      await act(() =>
        renderer.create(
          <Div>
            <Svg />
            <span>Test</span>
          </Div>
        )
      )
    ).toJSON()

    expect(tree).toHaveStyleRule('color', 'yellow', { target: 'span' })
    expect(tree).toHaveStyleRule('color', 'red')

    expect(tree).toHaveStyleRule('fill', 'green', { target: `${Svg}` })
  })

  test('matches target styles by regex', async () => {
    const localDivStyle = css`
      a {
        color: yellow;
      }
      a:hover {
        color: black;
      }
    `
    const tree = (
      await act(() =>
        renderer.create(
          <div css={localDivStyle}>
            <svg css={svgStyle} />
          </div>
        )
      )
    ).toJSON()

    expect(tree).toHaveStyleRule('color', 'yellow', { target: /a$/ })
  })

  test('matches proper style for css', async () => {
    const tree = (
      await act(() =>
        renderer.create(
          <div
            css={css`
              color: green;
              color: hotpink;
            `}
          />
        )
      )
    ).toJSON()
    expect(tree).not.toHaveStyleRule('color', 'green')
    expect(tree).toHaveStyleRule('color', 'hotpink')
  })

  test('matches style of the media', async () => {
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

    const tree = (
      await act(() =>
        renderer.create(
          <Div>
            <Svg />
          </Div>
        )
      )
    ).toJSON()

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

  test('matches styles with target and media options', async () => {
    const localDivStyle = css`
      color: white;
      @media (min-width: 420px) {
        color: green;
        &:hover {
          color: yellow;
        }
      }
    `
    const tree = (
      await act(() =>
        renderer.create(
          <div css={localDivStyle}>
            <span>Test</span>
          </div>
        )
      )
    ).toJSON()

    expect(tree).toHaveStyleRule('color', 'yellow', {
      target: ':hover',
      media: '(min-width: 420px)'
    })
    expect(tree).toHaveStyleRule('color', 'green', {
      media: '(min-width: 420px)'
    })
    expect(tree).toHaveStyleRule('color', 'white')
  })

  test('fails if option media invalid', async () => {
    const Div = styled('div')`
      font-size: 30px;
      @media (min-width: 420px) {
        font-size: 50px;
      }
    `

    const tree = (await act(() => renderer.create(<Div />))).toJSON()

    const result = toHaveStyleRule(tree, 'font-size', '50px', {
      media: '(min-width-'
    })
    expect(result.pass).toBe(false)
    expect(result.message()).toBe('Property not found: font-size')
  })

  test('matches styles for a component used as selector', async () => {
    const Bar = styled.div``

    const Foo = styled.div`
      color: red;

      ${Bar} {
        color: hotpink;
      }
    `
    const tree = (
      await act(() =>
        renderer.create(
          <Foo>
            <Bar />
          </Foo>
        )
      )
    ).toJSON()

    expect(tree.children[0]).toHaveStyleRule('color', 'hotpink')
  })

  test('takes specificity into account when matching styles (basic)', async () => {
    const Bar = styled.div`
      color: yellow;
    `

    const Foo = styled.div`
      color: red;

      ${Bar} {
        color: hotpink;
      }
    `

    const tree = (
      await act(() =>
        renderer.create(
          <Foo>
            <Bar />
          </Foo>
        )
      )
    ).toJSON()

    expect(tree.children[0]).toHaveStyleRule('color', 'hotpink')
  })

  test('should throw a friendly error when it receives an array', async () => {
    const tree = (
      await act(() =>
        renderer.create(
          <>
            <div
              css={css`
                color: hotpink;
              `}
            />
            {'Some text'}
          </>
        )
      )
    ).toJSON()

    expect(() =>
      expect(tree).toHaveStyleRule('color', 'hotpink')
    ).toThrowErrorMatchingInlineSnapshot(
      `"\`toHaveStyleRule\` expects to receive a single element but it received an array."`
    )
  })
})
