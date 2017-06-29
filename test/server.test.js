/**
 * @jest-environment node
*/
/* eslint-env jest */
import React from 'react'
import { renderToString } from 'react-dom/server'
import styled from '../src/styled'
import { css, sheet } from '../src/index'
import { renderStatic, renderStaticOptimized } from '../src/server'

const color = 'red'

const Main = styled.main`display: flex;`

const Image = styled.img`
  border-radius: 50%;
  height: attr(size px, 50px)
  width: attr(size px, 50px)
  background-color: ${color}
`

// this will be included in renderStatic but not in renderStaticOptimized since it's not used
css`
  display: none;
  name: unused-class;
`

// this will be included in both because it doesn't have the css- prefix

sheet.insert('.no-prefix { display: flex; justify-content: center; }')

const Page = () =>
  <Main>
    <Image size={30} />
    <Image size={100} />
    <Image />
  </Main>

describe('server', () => {
  describe('renderStatic', () => {
    test('returns static css', () => {
      expect(renderStatic(() => renderToString(<Page />))).toMatchSnapshot()
    })
    test('throws if the fn does not return anything', () => {
      expect(() => renderStatic(() => {})).toThrowErrorMatchingSnapshot()
    })
  })
  describe('renderStaticOptimized', () => {
    test('returns static css', () => {
      expect(
        renderStaticOptimized(() => renderToString(<Page />))
      ).toMatchSnapshot()
    })
    test('throws if the fn does not return anything', () => {
      expect(() =>
        renderStaticOptimized(() => {})
      ).toThrowErrorMatchingSnapshot()
    })
  })
})
