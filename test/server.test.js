/**
 * @jest-environment node
*/
/* eslint-env jest */
import React from 'react'
import { renderToString } from 'react-dom/server'
import styled from '../src/react'
import { css, injectGlobal } from '../src/index'
import { extractCritical } from '../src/server'

const color = 'red'

const Main = styled.main`display: flex;`

const Image = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  background-color: ${color};
`

// this will not be included since it's not used

css`
  display: none;
  name: unused-class;
`

// this will be included in both because it doesn't have the css- prefix

injectGlobal`
  .no-prefix {
    display: flex;
    justify-content: center;
  }
  .should-be-included {
    content: 'css-foo matches regex and this rule is swallowed (current bug)'
  }
`

const Page1 = () =>
  <Main>
    <Image size={30} />
    <Image size={100} />
    <Image />
  </Main>

const Page2 = () =>
  <Main>
    <div>Hello</div>
  </Main>

describe('extractCritical', () => {
  test('returns static css', () => {
    expect(extractCritical(renderToString(<Page1 />))).toMatchSnapshot()
    expect(extractCritical(renderToString(<Page2 />))).toMatchSnapshot()
  })

  test('returns only css for ids included in page', () => {
    expect(extractCritical('').css).toMatchSnapshot()
  })

  test('does not strip valid rules', () => {
    expect(extractCritical('').css).toMatch(/should-be-included/)
  })
})
