/* eslint-disable jsx-quotes */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import plugin from '../babel'
import css from 'glam'

const babel = require('babel-core')

describe('emotion/glam', () => {
  describe('babel', () => {
    test('basic', () => {
      const basic = '(<div className="a" css={`color: brown;`}></div>)'
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('no css attr', () => {
      const basic = '(<div></div>)'
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('noClassName', () => {
      const basic = '(<div css={`color: brown;`}></div>)'
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('emptyClassName', () => {
      const basic = '(<div className="" css={`color: brown;`}></div>)'
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('className as expression', () => {
      const basic = '(<div className={variable} css={`color: brown;`}></div>)'
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('className as expression string', () => {
      const basic =
        '(<div className={`test__class\`} css={`color: brown;`} this={`hello\`}></div>)'
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })
  })

  describe('real', () => {
    test('basic', () => {
      const tree = renderer
        .create(
          <p css={`color: red;`}>
            hello world
          </p>
        )
        .toJSON()

      expect(tree).toMatchSnapshot()
    })

    test('nested', () => {
      const props = {online: false, radius: 5}

      const tree = renderer
        .create(
          <div className="a" css={`color: brown;`}>
            <p className="foo" css={`color: blue;`}>Hello</p>
            <p className="foo" css={`color: green;`}>World</p>
            <p
              className={css`
                color: red;
                border-radius: ${props.radius};
                &:hover {
                  font-weight: bold;
                  color: ${props.online ? 'green' : 'gray'};
                }
              `}
            >
              hello world
            </p>
          </div>
        )
        .toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
