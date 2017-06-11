/* eslint-disable jsx-quotes,no-useless-escape,no-template-curly-in-string */
/* eslint-env jest */
import plugin from '../babel'

const babel = require('babel-core')

describe('emotion/babel', () => {
  describe('babel styled component', () => {
    test('basic', () => {
      const basic = 'emotion.h1`font-size: ${fontSize}px;`'
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('function call', () => {
      const basic = 'emotion(MyComponent)`font-size: ${fontSize}px;`'
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('attr', () => {
      const basic = `styled('input')\`
       margin: attr(margin);
       color: #ffffff;
       height: \$\{props => props.height * props.scale\};
       width: attr(width);
       color: blue;
       display: \$\{flex\};
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('attr with value type', () => {
      const basic = `styled('input')\`
        margin: attr(margin px);
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('attr with default value', () => {
      const basic = `styled('input')\`
        margin: attr(margin, 16);
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('attr with value type and default value', () => {
      const basic = `styled('input')\`
        margin: attr(margin px, 16);
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('match works on multiple', () => {
      const basic = `styled('input')\`
        margin: attr(margin px, 16);
        color: blue;
        padding: attr(padding em, 16);
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('attr kitchen sink', () => {
      const basic = `styled('input')\`
        margin: attr(margin px, 16);
        padding: attr(padding em, 16);
        font-size: attr(fontSize ch, 8);
        width: attr(width %, 95);
        height: attr(height vw, 90);
        display: attr(display, flex);
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('basic inline', () => {
      const basic = 'emotion.h1`font-size: ${fontSize}px;`'
      const { code } = babel.transform(basic, {
        plugins: [
          plugin,
          [
            'glam/babel',
            {
              sync: true,
              inline: true
            }
          ]
        ]
      })
      expect(code).toMatchSnapshot()
    })

    test('inline with attr', () => {
      const basic = `styled('input')\`
        margin: attr(margin px, 16);
        padding: attr(padding em, 16);
        font-size: attr(fontSize ch, 8);
        width: attr(width %, 95);
        height: attr(height vw, 90);
        display: attr(display, flex);
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin, ['glam/babel', { sync: true, inline: true }]]
      })
      expect(code).toMatchSnapshot()
    })
  })

  describe('babel css prop', () => {
    test('basic', () => {
      const basic = '(<div className="a" css={`color: brown;`}></div>)'
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('basic inline', () => {
      const basic = '(<div className="a" css={`color: brown;`}></div>)'
      const {code} = babel.transform(basic, {
        plugins: [plugin, ['glam/babel', { inline: true }]]
      })
      expect(code).toMatchSnapshot()
    })

    test('dynamic inline', () => {
      const basic = '(<div className="a" css={`color: ${color};`}></div>)'
      const {code} = babel.transform(basic, {
        plugins: [plugin, ['glam/babel', {inline: true}]]
      })
      expect(code).toMatchSnapshot()
    })

    test('no css attr', () => {
      const basic = '(<div></div>)'
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('css empty', () => {
      const basic = '(<div css=""></div>)'
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('wrong value type', () => {
      const basic = '(<div css={5}></div>)'
      expect(() =>
        babel.transform(basic, { plugins: [plugin, 'glam/babel'] })
      ).toThrow()
    })

    test('StringLiteral css prop value', () => {
      const basic = `<div css="color: brown;"></div>`
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('noClassName', () => {
      const basic = '(<div css={`color: brown;`}></div>)'
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('emptyClassName', () => {
      const basic = '(<div className="" css={`color: brown;`}></div>)'
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('className as expression', () => {
      const basic = '(<div className={variable} css={`color: brown;`}></div>)'
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })

    test('className as expression string', () => {
      const basic =
        '(<div className={`test__class`} css={`color: brown;`} this={`hello`}></div>)'
      const { code } = babel.transform(basic, {
        plugins: [plugin, 'glam/babel']
      })
      expect(code).toMatchSnapshot()
    })
  })
})
