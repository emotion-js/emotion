/* eslint-disable jsx-quotes,no-useless-escape,no-template-curly-in-string */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import css, { fragment } from 'glam'
import glam from '../react'
import plugin from '../babel'

const babel = require('babel-core')

describe('glam react', () => {
  describe('babel glam component', () => {
    test('basic', () => {
      const basic = 'glam.h1\`font-size: \$\{fontSize\}px;\`'
      const {code} = babel.transform(basic, {plugins: [plugin, 'glam/babel']})
      expect(code).toMatchSnapshot()
    })
  })

  test('basic render', () => {
    const fontSize = 20
    const H1 = glam.h1`
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

  test('passes props', () => {
    const fontSize = 20
    const H1 = glam.h1`
      font-size: ${fontSize}px;
    `

    const tree = renderer
      .create(
        <H1 name={'Arrow'}>
          hello world
        </H1>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
