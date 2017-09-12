import * as babel from 'babel-core'
import plugin from 'babel-plugin-emotion'
import stage2 from 'babel-plugin-syntax-object-rest-spread'
import * as fs from 'fs'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)
fs.statSync.mockReturnValue({ isFile: () => false })

describe('babel styled component', () => {
  describe('inline', () => {
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
        plugins: [plugin],
        babelrc: false,
        filename: __filename
      })
      expect(code).toMatchSnapshot()
    })

    test('dynamic fns', () => {
      const basic = `const Avatar = styled('img')\`
        width: 96px;
        height: 96px;

        border-radius: $\{props =>
          props.theme.borderRadius};

        border: 1px solid $\{props =>
          props.theme.borderColor};
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin],
        babelrc: false,
        filename: __filename
      })

      expect(code).toMatchSnapshot()
    })

    test('more than 10 dynamic values', () => {
      const basic = `const H1 = styled('h1')\`
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
      const { code } = babel.transform(basic, {
        plugins: [plugin],
        babelrc: false,
        filename: __filename
      })

      expect(code).toMatchSnapshot()
    })

    test('styled component as selector', () => {
      const basic = `
      const SomeComponent = styled.div\` \`
      styled.h1\`
        color:blue;
        \${SomeComponent} {
          color: green;
        }
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin],
        babelrc: false,
        filename: __filename
      })
      expect(code).toMatchSnapshot()
    })

    test('random expressions', () => {
      const basic = `
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
      const { code } = babel.transform(basic, {
        plugins: [plugin],
        babelrc: false,
        filename: __filename
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

    test('nested', () => {
      const basic =
        'const H1 = styled.h1`' +
        "font-size: ${fontSize + 'px'};" +
        '& div { color: blue;' +
        '& span { color: red } }' +
        '`'
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('interpolation in different places', () => {
      const basic = `
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
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('media query', () => {
      const basic =
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

    test('objects fn call', () => {
      const basic = `
      const H1 = styled('h1')({
        display: 'flex'
      })`
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('objects based on props', () => {
      const basic = `
      const H1 = styled('h1')({ padding: 10 },props => ({
        display: props.display
      }))`
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('shorthand property', () => {
      const basic = `const H1 = styled.h1({ fontSize })`

      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('objects prefixed', () => {
      const basic = `
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
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('styled. objects', () => {
      const basic = `
      const H1 = styled.h1({ padding: 10 },props => ({
        display: props.display
      }))`
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('styled. objects with a single spread property', () => {
      const basic = `
      const defaultText = { fontSize: 20 }
      const Figure = styled.figure({
        ...defaultText
      })`
      const { code } = babel.transform(basic, {
        plugins: [plugin, stage2]
      })
      expect(code).toMatchSnapshot()
    })

    test('styled. objects with a multiple spread properties', () => {
      const basic = `
      const defaultText = { fontSize: 20 }
      const Figure = styled.figure({
        ...defaultText,
        ...defaultFigure
      })`
      const { code } = babel.transform(basic, {
        plugins: [plugin, stage2]
      })
      expect(code).toMatchSnapshot()
    })

    test('styled. objects with a multiple spread properties and other keys', () => {
      const basic = `
      const defaultText = { fontSize: 20 }
      const Figure = styled.figure({
        ...defaultText,
        fontSize: '20px',
        ...defaultFigure,
        ...defaultText2
      })`
      const { code } = babel.transform(basic, {
        plugins: [plugin, stage2]
      })
      expect(code).toMatchSnapshot()
    })

    test('styled objects prefixed', () => {
      const basic = `
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
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('composition based on props', () => {
      const basic = `const cls1 = css\` width: 20px; \`
      const H1 = styled.h1\`
        $\{props => {
        return props.a ? cssA : cssB
      }};
        font-size: \${fontSize + 'px'};
        height: 20px;
        transform: translateX(\${(props) => props.translateX});
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })
  })

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
