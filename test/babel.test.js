/* eslint-disable jsx-quotes,no-useless-escape,no-template-curly-in-string */
/* eslint-env jest */
const babel = require('babel-core')
const plugin = require('../src/babel')

describe('emotion/babel', () => {
  describe('babel styled component', () => {
    test('no use', () => {
      const basic = 'styled.h1``'
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('no dynamic', () => {
      const basic = 'styled.h1`color:blue;`'
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('basic', () => {
      const basic = "const H1 = styled.h1`font-size: ${fontSize + 'px'};`"
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('function call', () => {
      const basic = "styled(MyComponent)`font-size: ${fontSize + 'px'};`"
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('basic fragment', () => {
      const basic = `
        const frag = fragment\`color: green\`;
        styled.h1\`font-size: 20px; @apply \${frag};\``
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('fragment kitchen sink', () => {
      const basic = `
        const frag = fragment\`color: green; background-color: \${backgroundColor}\`;
        const frag1 = fragment\` width: 20px; name: some-frag-name; \`
        const frag2 = fragment\` height: 20px; @apply \${frag1}; \`
        styled.h1\`font-size: \${fontSize + 'px'}; name: some-name; @apply \${frag}; @apply \${frag2}\``
      const { code } = babel.transform(basic, {
        plugins: [plugin]
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
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('attr with value type', () => {
      const basic = `styled('input')\`
        margin: attr(margin px);
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('attr with default value', () => {
      const basic = `styled('input')\`
        margin: attr(margin, 16);
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('attr with value type and default value', () => {
      const basic = `styled('input')\`
        margin: attr(margin px, 16);
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin]
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
        plugins: [plugin]
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
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })
  })
})
