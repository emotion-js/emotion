/** @jsx jsx */
import 'test-utils/setup-env'
import React from 'react'
import { act } from 'react'
import { render } from '@testing-library/react'
import testRenderer from 'react-test-renderer'
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { matchers } from '@emotion/jest'
import stripAnsi from 'strip-ansi'

const { toHaveStyleRule } = matchers

expect.extend(matchers)

describe('toHaveStyleRule', () => {
  const divStyle = css`
    color: red;
  `

  const svgStyle = css`
    width: 100%;
  `

  test('matches styles on the top-most node passed in', () => {
    const { container } = render(
      <div css={divStyle}>
        <svg css={svgStyle} />
      </div>
    )

    expect(container.firstChild).toHaveStyleRule('color', 'red')
    expect(container.firstChild).not.toHaveStyleRule('width', '100%')

    const svgNode = container.firstChild?.firstChild

    expect(svgNode).toHaveStyleRule('width', '100%')
    expect(svgNode).not.toHaveStyleRule('color', 'red')
  })

  test('supports asymmetric matchers', () => {
    const { container } = render(
      <div css={divStyle}>
        <svg css={svgStyle} />
      </div>
    )

    expect(container.firstChild).toHaveStyleRule('color', expect.anything())
    expect(container.firstChild).not.toHaveStyleRule(
      'padding',
      expect.anything()
    )

    const svgNode = container.firstChild?.firstChild

    expect(svgNode).toHaveStyleRule('width', expect.stringMatching(/.*%$/))
  })

  test('fails if no styles are found', () => {
    const { container } = render(<div />)
    const result = toHaveStyleRule(container.firstChild, 'color', 'red')
    expect(result.pass).toBe(false)
    expect(result.message()).toBe('Property not found: color')
  })

  test('supports regex values', () => {
    const { container } = render(<div css={divStyle} />)
    expect(container.firstChild).toHaveStyleRule('color', /red/)
  })

  it('returns a message explaining the failure', () => {
    const { container } = render(<div css={divStyle} />)

    // When expect(container.firstChild).toHaveStyleRule('color', 'blue') fails
    const resultFail = toHaveStyleRule(container.firstChild, 'color', 'blue')
    expect(stripAnsi(resultFail.message())).toMatchSnapshot()

    // When expect(container.firstChild).not.toHaveStyleRule('color', 'red')
    const resultPass = toHaveStyleRule(container.firstChild, 'color', 'red')
    expect(stripAnsi(resultPass.message())).toMatchSnapshot()
  })

  test('matches styles on the focus, hover targets', () => {
    const localDivStyle = css`
      color: white;
      &:hover {
        color: yellow;
      }
      &:focus {
        color: black;
      }
    `
    const { container } = render(
      <div css={localDivStyle}>
        <svg css={svgStyle} />
      </div>
    )

    expect(container.firstChild).toHaveStyleRule('color', 'yellow', {
      target: ':hover'
    })
    expect(container.firstChild).toHaveStyleRule('color', 'black', {
      target: ':focus'
    })
    expect(container.firstChild).toHaveStyleRule('color', 'white')
  })

  test('matches styles on the nested component or html element', () => {
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

    const { container } = render(
      <Div>
        <Svg />
        <span>Test</span>
      </Div>
    )

    expect(container.firstChild).toHaveStyleRule('color', 'yellow', {
      target: 'span'
    })
    expect(container.firstChild).toHaveStyleRule('color', 'red')

    expect(container.firstChild).toHaveStyleRule('fill', 'green', {
      target: `${Svg}`
    })
  })

  test('matches target styles by regex', () => {
    const localDivStyle = css`
      a {
        color: yellow;
      }
      a:hover {
        color: black;
      }
    `
    const { container } = render(
      <div css={localDivStyle}>
        <svg css={svgStyle} />
      </div>
    )

    expect(container.firstChild).toHaveStyleRule('color', 'yellow', {
      target: /a$/
    })
  })

  test('matches proper style for css', () => {
    const { container } = render(
      <div
        css={css`
          color: green;
          color: hotpink;
        `}
      />
    )
    expect(container.firstChild).not.toHaveStyleRule('color', 'green')
    expect(container.firstChild).toHaveStyleRule('color', 'hotpink')
  })

  test('matches style of the media', () => {
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

    const { container } = render(
      <Div>
        <Svg />
      </Div>
    )

    expect(container.firstChild).toHaveStyleRule('font-size', '30px')
    expect(container.firstChild).toHaveStyleRule('font-size', '50px', {
      media: '(min-width: 420px)'
    })
    expect(container.firstChild).toHaveStyleRule('font-size', '70px', {
      media: '(min-width: 920px) and (max-width: 1200px)'
    })
    expect(container.firstChild).toHaveStyleRule('font-size', '80px', {
      media: 'screen and (max-width: 1200px)'
    })
    expect(container.firstChild).toHaveStyleRule('font-size', '90px', {
      media: 'not all and (monochrome)'
    })
  })

  test('matches styles with target and media options', () => {
    const localDivStyle = css`
      color: white;
      @media (min-width: 420px) {
        color: green;
        &:hover {
          color: yellow;
        }
      }
    `
    const { container } = render(
      <div css={localDivStyle}>
        <span>Test</span>
      </div>
    )

    expect(container.firstChild).toHaveStyleRule('color', 'yellow', {
      target: ':hover',
      media: '(min-width: 420px)'
    })
    expect(container.firstChild).toHaveStyleRule('color', 'green', {
      media: '(min-width: 420px)'
    })
    expect(container.firstChild).toHaveStyleRule('color', 'white')
  })

  test('fails if option media invalid', () => {
    const Div = styled('div')`
      font-size: 30px;
      @media (min-width: 420px) {
        font-size: 50px;
      }
    `

    const { container } = render(<Div />)

    const result = toHaveStyleRule(container.firstChild, 'font-size', '50px', {
      media: '(min-width-'
    })
    expect(result.pass).toBe(false)
    expect(result.message()).toBe('Property not found: font-size')
  })

  test('matches styles for a component used as selector', () => {
    const Bar = styled.div``

    const Foo = styled.div`
      color: red;

      ${Bar} {
        color: hotpink;
      }
    `
    const { container } = render(
      <Foo>
        <Bar />
      </Foo>
    )

    expect(container.firstChild?.firstChild).toHaveStyleRule('color', 'hotpink')
  })

  test('takes specificity into account when matching styles (basic)', () => {
    const Bar = styled.div`
      color: yellow;
    `

    const Foo = styled.div`
      color: red;

      ${Bar} {
        color: hotpink;
      }
    `

    const { container } = render(
      <Foo>
        <Bar />
      </Foo>
    )

    expect(container.firstChild.firstChild).toHaveStyleRule('color', 'hotpink')
  })

  test('should throw a friendly error when it receives an array', async () => {
    const tree = (
      await act(() =>
        testRenderer.create(
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
