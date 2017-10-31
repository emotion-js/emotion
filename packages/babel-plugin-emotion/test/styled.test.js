import * as babel from 'babel-core'
import plugin from 'babel-plugin-emotion'
import * as fs from 'fs'
import { createInline } from './util'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)
fs.statSync.mockReturnValue({ isFile: () => false })

const inline = {
  'no use': {
    code: 'styled.h1``'
  },

  'no dynamic': {
    code: 'styled.h1`color:blue;`'
  },

  'dynamic fns': {
    code: `const Avatar = styled('img')\`
      width: 96px;
      height: 96px;

      border-radius: $\{props =>
        props.theme.borderRadius};

      border: 1px solid $\{props =>
        props.theme.borderColor};
    \``
  },

  'more than 10 dynamic values': {
    code: `const H1 = styled('h1')\`
    text-decoration: $\{'underline'};
    border-right: solid blue $\{54}px;
    background: $\{'white'};
    color: $\{'black'};
    display: $\{'block'};
    border-radius: $\{'3px'};
    padding: $\{'25px'};
    width: $\{'500px'};
    z-index: $\{100};
    font-size: $\{'18px'};
    text-align: $\{'center'};
    border-left: $\{p => p.theme.blue};
  \``
  },

  'random expressions': {
    code: `
      const a = () => css\`font-size: 1rem\`
      styled.h1\`
        margin: 12px 48px;
        \${css\`font-size: 32px\`};
        color: #ffffff;
        & .profile {
          \${props => props.prop && a()}
        }
        \${{ backgroundColor: "hotpink" }};
      \`
    `
  },

  basic: {
    code: "const H1 = styled.h1`font-size: ${fontSize + 'px'};`"
  },

  nested: {
    code:
      'const H1 = styled.h1`' +
      "font-size: ${fontSize + 'px'};" +
      '& div { color: blue;' +
      '& span { color: red } }' +
      '`'
  },

  'interpolation in different places': {
    code: `
    const H1 = styled.h1\`
      font-size: \${fontSize + 'px'};
      height: 20px;
      transform: translateX(\${(props) => props.translateX});
      height1: \${something}wow;
      width: w\${something}ow;
      transform: translateX(\${(props) => props.translateX}) translateY(\${(props) => props.translateX});
      transform1: translateX(\${(props) => props.translateX}) translateY(\${(props) => props.translateX});
      transform2: translateX(\${(props) => props.translateX}) \${(props) => props.translateX};
      \``
  },

  'media query': {
    code:
      'const H1 = styled.h1`@media print {' +
      '  font-size: 10pt' +
      '}' +
      '@media screen {' +
      '  .child-selector { font-size: 13px }' +
      '}' +
      '@media screen, print {' +
      '  &:hover + & { line-height: 1.2 }' +
      '}' +
      '@media only screen ' +
      '  and (min-device-width: 320px) ' +
      '  and (max-device-width: 480px)' +
      '  and (-webkit-min-device-pixel-ratio: 2) {' +
      '    .child-selector { line-height: 1.4 }' +
      '}`'
  },

  'function call': {
    code: "styled(MyComponent)`font-size: ${fontSize + 'px'};`"
  },

  'objects fn call': {
    code: `
    const H1 = styled('h1')({
      display: 'flex'
    })`
  },

  'objects based on props': {
    code: `
    const H1 = styled('h1')({ padding: 10 },props => ({
      display: props.display
    }))`
  },

  'shorthand property': {
    code: `const H1 = styled.h1({ fontSize })`
  },

  'objects prefixed': {
    code: `
    const H1 = styled('h1')({
      borderRadius: '50%',
      transition: 'transform 400ms ease-in-out',
      boxSizing: 'border-box',
      display: 'flex',
      ':hover': {
        transform: 'scale(1.2)'
      }
  }, props => {
      padding: props.padding
  })`
  },

  'styled. objects': {
    code: `
    const H1 = styled.h1({ padding: 10 },props => ({
      display: props.display
    }))`
  },

  'styled. objects with a single spread property': {
    code: `
    const defaultText = { fontSize: 20 }
    const Figure = styled.figure({
      ...defaultText
    })`
  },

  'styled. objects with a multiple spread properties': {
    code: `
    const defaultText = { fontSize: 20 }
    const Figure = styled.figure({
      ...defaultText,
      ...defaultFigure
    })`
  },

  'styled. objects with a multiple spread properties and other keys': {
    code: `
    const defaultText = { fontSize: 20 }
    const Figure = styled.figure({
      ...defaultText,
      fontSize: '20px',
      ...defaultFigure,
      ...defaultText2
    })`
  },

  'styled objects prefixed': {
    code: `
    const H1 = styled.h1({
      borderRadius: '50%',
      transition: 'transform 400ms ease-in-out',
      boxSizing: 'border-box',
      display: 'flex',
      ':hover': {
        transform: 'scale(1.2)'
      }
    },props => ({
      display: props.display
    }))`
  },

  'composition based on props': {
    code: `const cls1 = css\` width: 20px; \`
    const H1 = styled.h1\`
      $\{props => {
      return props.a ? cssA : cssB
    }};
      font-size: \${fontSize + 'px'};
      height: 20px;
      transform: translateX(\${(props) => props.translateX});
    \``
  },

  hoisting: {
    code: `
      const Profile = () => {
        const H1 = styled.h1({
          borderRadius: '50%',
          transition: 'transform 400ms ease-in-out',
          boxSizing: 'border-box',
          display: 'flex',
          ':hover': {
            transform: 'scale(1.2)'
          }
        },props => ({
          display: props.display
        }),
          [{ color: 'blue' }]
        )
      }
    `,

    opts: { hoist: true }
  },

  'variable import: no dynamic': {
    code: "import what from 'emotion'; what.h1`color:blue;`"
  },

  'config rename': {
    code: 'what.h1`color:blue;`',
    opts: { importedNames: { styled: 'what' } }
  }
}

createInline('inline', inline)

describe('babel styled component', () => {
  describe('extract', () => {
    test('no use', () => {
      const basic = 'styled.h1``'
      const { code } = babel.transform(basic, {
        plugins: [[plugin, { extractStatic: true }]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
      expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
    })

    test('basic', () => {
      const basic =
        "const H1 = styled.h1`display: flex; justify-content: center; width: var(--css-hash-0); &:hover { background-color: green; } @media (max-width: 500px) { height: var(--css-hash-1); position: fixed; } @media print { display: none; } &::before { color: blue; width: 20px; height: 20px; content: 'pseudo' }`"
      const { code } = babel.transform(basic, {
        plugins: [[plugin, { extractStatic: true }]],
        filename: __filename,
        babelrc: false
      })

      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
      expect(fs.writeFileSync.mock.calls[1][1]).toMatchSnapshot()
    })
  })
})
