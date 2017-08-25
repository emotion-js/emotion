import React from 'react'
import renderer from 'react-test-renderer'
import { basename } from 'path'
import serializer from 'jest-glamor-react'
import { injectGlobal, css, sheet } from 'emotion'
import styled from 'react-emotion'

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

  test('with expressions', () => {
    const H1 = styled.h1`font-size: ${p => p.fontSize};`

    const tree = renderer.create(<H1 fontSize={24}>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('name', () => {
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

  test('injectGlobal with dynamic values', () => {
    const display = 'flex'
    const cls = injectGlobal`
          body {
            margin: 0;
            padding: 0;
            display: ${display};
            & > div {
              display: none;
            }
          }
          html {
            background: green;
          }
      `

    const tree = renderer.create(<h1 className={cls}>hello world</h1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('css', () => {
    expect(css`
      font-family: sans-serif;
      color: yellow;
      background-color: purple;
    `)
  })

  test('css with dynamic values', () => {
    const color = 'yellow'
    const height = '15rem'
    const cls = css`
      color: ${color};
      height: ${height};
    `

    const tree = renderer.create(<h1 className={cls}>hello world</h1>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('writes the correct css', () => {
    const filenameArr = basename(__filename).split('.')
    filenameArr.pop()
    filenameArr.push('emotion', 'css')
    const cssFilename = filenameArr.join('.')
    expect(global.mockedCssImports[cssFilename]).toMatchSnapshot()
  })
})
