/**
 * @jest-environment node
*/
/* eslint-env jest */
import React from 'react'
import { renderToString } from 'react-dom/server'
import styled from '../src/styled'
import { renderStatic } from '../src/server'

const color = 'red'

const Main = styled.main`
  display: flex;
`

const Image = styled.img`
  border-radius: 50%;
  height: attr(size px, 50px)
  width: attr(size px, 50px)
  background-color: ${color}
`

const Page = () => <Main><Image size={30} /><Image size={100} /><Image /></Main>

describe('server', () => {
  describe('renderStatic', () => {
    test('returns static css', () => {
      expect(renderStatic(() => renderToString(<Page />))).toMatchSnapshot()
    })
  })
  describe('renderStaticOptimized', () => {
    test('returns static css', () => {
      expect(renderStatic(() => renderToString(<Page />))).toMatchSnapshot()
    })
  })
})
