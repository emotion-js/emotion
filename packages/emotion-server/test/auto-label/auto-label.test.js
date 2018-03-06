// @flow
/**
 * @jest-environment node
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import styled from 'react-emotion'
import { css, injectGlobal, keyframes, flush, hydrate } from 'emotion'
import { extractCritical } from 'emotion-server'
import { prettyifyCritical, getInjectedRules } from '../util'

const emotion = require('emotion')

const getComponents = () => {
  const color = 'red'

  injectGlobal`
    @font-face {
      font-family: 'Patrick Hand SC';
      font-style: normal;
      font-weight: 400;
      src: local('Patrick Hand SC'), local('PatrickHandSC-Regular'),
        url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2)
          format('woff2');
      unicode-range: U+0100-024f, U+1-1eff, U+20a0-20ab, U+20ad-20cf,
        U+2c60-2c7f, U+A720-A7FF;
    }
  `

  const bounce = keyframes`
    from, 20%, 53%, 80%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transform: translate3d(0,0,0);
    }

    40%, 43% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -30px, 0);
    }

    70% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0,-4px,0);
    }
  `

  const hoverStyles = css`
    color: hotpink;
    &:hover {
      color: white;
      background-color: lightgray;
      border-color: aqua;
      box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
    }
  `

  const Main = styled.main`
    ${hoverStyles};
    display: flex;
  `

  const Image = styled.img`
    animation: ${bounce};
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background-color: ${color};
  `

  // this will not be included since it's not used
  css`
    display: none;
  `

  // this will be included in both because it doesn't have the css- prefix

  injectGlobal`
    .no-prefix {
      display: flex;
      justify-content: center;
    }
  `

  const Page1 = () => (
    <Main>
      <Image size={30} />
      <Image size={100} />
      <Image />
    </Main>
  )

  const Page2 = () => (
    <Main>
      <div>Hello</div>
    </Main>
  )
  return { Page1, Page2 }
}

describe('extractCritical', () => {
  test('returns static css', () => {
    const { Page1, Page2 } = getComponents()
    expect(
      prettyifyCritical(extractCritical(renderToString(<Page1 />)))
    ).toMatchSnapshot()
    expect(
      prettyifyCritical(extractCritical(renderToString(<Page2 />)))
    ).toMatchSnapshot()
  })
})
describe('hydration', () => {
  test('only rules that are not in the critical css are inserted', () => {
    const { Page1 } = getComponents()
    const { html, ids, css } = extractCritical(renderToString(<Page1 />))
    expect(prettyifyCritical({ html, css, ids })).toMatchSnapshot()
    flush()

    hydrate(ids)

    const { Page1: NewPage1 } = getComponents()
    renderToString(<NewPage1 />)
    expect(getInjectedRules(emotion)).toMatchSnapshot()
  })
})
