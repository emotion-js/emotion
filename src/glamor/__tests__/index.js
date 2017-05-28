/* eslint-disable jsx-quotes,no-useless-escape */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import plugin from '../babel'
import css, {fragment} from 'glam'

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

    test('css empty', () => {
      const basic = '(<div css=""></div>)'
      const {code} = babel.transform(basic, {plugins: [plugin]})
      expect(code).toMatchSnapshot()
    })

    test('wrong value type', () => {
      const basic = '(<div css={5}></div>)'
      expect(() => babel.transform(basic, {plugins: [plugin]})).toThrow()
    })

    test('StringLiteral css prop value', () => {
      const basic = `<div css="color: brown;"></div>`
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

    // test('string expression', () => {
    //   const tree = renderer
    //     .create(
    //       <p css={'color: red;'}>
    //         hello world
    //       </p>
    //     )
    //     .toJSON()
    //
    //   expect(tree).toMatchSnapshot()
    // })

    test('kitchen sink', () => {
      const props = {online: false, error: false, radius: 5}
      const huge = 100
      const tiny = 6

      const bold = fragment`
        display: flex;
        font-weight: bold;`

      const big = fragment`
        @apply ${bold};
        font-size: ${huge}`

      const small = fragment`
        font-size: ${tiny}`

      const flexCenter = fragment`
        display: flex;
        justify-content: center;
        align-items: center`

      const tree = renderer
        .create(
          <div
            className="css__legacy-stuff"
            css={`
              @apply ${bold}
              @apply ${flexCenter};
             `}
          >
            <h1
              css={`
                @apply ${props.error ? big : small};
                color: red
              `}
            >
              BOOM
            </h1>
            <p className="test_class1" css={`color: blue;`}>Hello</p>
            <p
              className="test_class1 test___class45"
              css={`display: inline-flex`}
            >
              World
            </p>
            <p
              css={`
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
