/* eslint-disable jsx-quotes,no-useless-escape,no-template-curly-in-string */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { basename } from 'path'
import serializer from 'jest-glamor-react'
import { injectGlobal, css, sheet } from '../../src'
import styled from '../../src/react'

expect.addSnapshotSerializer(serializer(sheet))

describe('styled', () => {
  test('no dynamic', () => {
    const H1 = styled.h1`font-size: 12px;`

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('basic render nested', () => {
    const H1 = styled.h1`
      font-size: 20px;
      & span {
        color: blue;
        
        &:hover {
          color: green;
          
          &:after {
            content: "after";
          }
        }
      }
    `
    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('name', () => {
    const fontSize = '20px'
    const H1 = styled.h1`
      name: FancyH1;
      font-size: 38px;
    `

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('injectGlobal', () => {
    injectGlobal`
      html {
        background: pink;
      }
    `
  })
  test('css', () => {
    expect(css`
      font-family: sans-serif;
      color: yellow;
      background-color: purple;
    `)
  })
  test('writes the correct css', () => {
    const filenameArr = basename(__filename).split('.')
    filenameArr.pop()
    filenameArr.push('emotion', 'css')
    const cssFilename = filenameArr.join('.')
    expect(global.mockedCssImports[cssFilename]).toMatchSnapshot()
  })
})
