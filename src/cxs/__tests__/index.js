/* eslint-disable jsx-quotes,no-useless-escape */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import plugin from '../babel'
import {matcher, serializer} from 'jest-glamor-react'
import cxs from 'cxs'

expect.addSnapshotSerializer(serializer)
expect.extend(matcher)

const babel = require('babel-core')

describe('emotion/cxs', () => {
  describe('babel', () => {
    test('basic', () => {
      const basic = `(<div className="a" css={{ color: 'brown' }}></div>)`
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('no css attr', () => {
      const basic = '(<div></div>)'
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('css empty', () => {
      const basic = '(<div css={{}}></div>)'
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('wrong value type', () => {
      const basic = '(<div css={5}></div>)'
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('no className', () => {
      const basic = `(<div css={{ color: 'brown' }}></div>)`
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('emptyClassName', () => {
      const basic = `(<div className="" css={{ color: 'brown' }}></div>)`
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('className as expression', () => {
      const basic = `(<div className={props.className} css={{ color: 'brown' }}></div>)`
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('className as expression string', () => {
      const basic =
        "(<div className={`test__class\`} css={{ color: 'brown'}} this={`hello\`}></div>)"
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })
  })

  describe('real', () => {
    test('basic', (done) => {
      const tree = renderer
        .create(
          <p css={{color: 'red'}}>
            hello world
          </p>
        )
        .toJSON()

      expect(tree).toMatchSnapshotWithGlamor()
      setTimeout(done)
    })

    test('kitchen sink', (done) => {
      const tree = renderer
        .create(
          <div className="css__legacy-stuff" css={{color: 'blue'}}>
            <h1 css={{'@media(min-width: 420px)': {fontSize: 48}}}>
              BOOM
            </h1>
            <p className="test_class1" css={{color: 'gray'}}>Hello</p>
            <p
              className="test_class1 test___class45"
              css={{border: '1px solid blue'}}
            >
              World
            </p>
            <p css={{display: 'flex'}}>
              hello world
            </p>

          </div>
        )
        .toJSON()

      expect(tree).toMatchSnapshotWithGlamor()
      setTimeout(done)
    })
  })
})
