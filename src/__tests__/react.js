/* eslint-disable jsx-quotes,no-useless-escape,no-template-curly-in-string */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import css, {fragment} from 'glam'
import {emotion} from '../react'
import plugin from '../babel'

const babel = require('babel-core')

describe('glam react', () => {
  describe('babel glam component', () => {
    test('basic', () => {
      const basic = 'emotion.h1\`font-size: \$\{fontSize\}px;\`'
      const {code} = babel.transform(basic, {plugins: [plugin, 'glam/babel']})
      expect(code).toMatchSnapshot()
    })

    test('function call', () => {
      const basic = 'emotion(MyComponent)\`font-size: \$\{fontSize\}px;\`'
      const {code} = babel.transform(basic, {plugins: [plugin, 'glam/babel']})
      expect(code).toMatchSnapshot()
    })
  })

  test('basic render', () => {
    const fontSize = 20
    const H1 = emotion.h1`
      font-size: ${fontSize}px;
    `

    const tree = renderer
      .create(
        <H1>
          hello world
        </H1>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('call expression', () => {
    const fontSize = 20
    const H1 = emotion('h1')`
      font-size: ${fontSize}px;
    `

    const tree = renderer
      .create(
        <H1 className={'legacy__class'}>
          hello world
        </H1>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('composition', () => {
    const fontSize = 20
    const H1 = emotion('h1')`
      font-size: ${fontSize}px;
    `

    const H2 = emotion(H1)`font-size: ${fontSize * 2 / 3}`

    const tree = renderer
      .create(
        <H2 className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('function in expression', () => {
    const fontSize = 20
    const H1 = emotion('h1')`
      font-size: ${fontSize}px;
    `

    const H2 = emotion(H1)`font-size: ${({scale}) => fontSize * scale}`

    const tree = renderer
      .create(
        <H2 scale={2} className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('higher order component', () => {
    const fontSize = 20
    const Content = emotion('div')`
      font-size: ${fontSize}px;
    `

    const flexColumn = Component => {
      const NewComponent = emotion(Component)`
        flex-direction: column;
      `
      NewComponent.displayName = `flexColumn${Component.displayName}`

      return NewComponent
    }

    const ColumnContent = flexColumn(Content)

    expect(ColumnContent.displayName).toBe('flexColumnundefined')

    const tree = renderer
      .create(
        <ColumnContent>
          <div
            css={`height: 100px; width: 100px; background-color: #20c997; margin: 8ch;`}
          />
          <div
            css={`height: 100px; width: 100px; background-color: #20c997; margin: 8ch;`}
          />
          <div
            css={`height: 100px; width: 100px; background-color: #20c997; margin: 8ch;`}
          />
          <div
            css={`height: 100px; width: 100px; background-color: #20c997; margin: 8ch;`}
          />
        </ColumnContent>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
