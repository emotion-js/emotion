/* eslint-disable no-template-curly-in-string */
/* eslint-env jest */
import * as babel from 'babel-core'
import plugin from '../../src/babel'
import * as fs from 'fs'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)

describe('babel styled component', () => {
  // describe('inline', () => {
  //   test('no use', () => {
  //     const basic = 'styled.h1``'
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('no dynamic', () => {
  //     const basic = 'styled.h1`color:blue;`'
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
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
        plugins: [plugin]
      })
      console.log(code)
      expect(code).toMatchSnapshot()
    })
  //
  //
  //
  //   test('styled component as selector', () => {
  //     const basic = `
  //     const SomeComponent = styled.div\` \`
  //     styled.h1\`
  //       color:blue;
  //       .\${SomeComponent} {
  //         color: green;
  //       }
  //     \``
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('basic', () => {
  //     const basic = "const H1 = styled.h1`font-size: ${fontSize + 'px'};`"
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('nested', () => {
  //     const basic =
  //       'const H1 = styled.h1`' +
  //       "font-size: ${fontSize + 'px'};" +
  //       '& div { color: blue;' +
  //       '& span { color: red } }' +
  //       '`'
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('interpolation in different places', () => {
  //     const basic = `
  //     const H1 = styled.h1\`
  //       font-size: \${fontSize + 'px'};
  //       height: 20px;
  //       transform: translateX(\${(props) => props.translateX});
  //       height1: \${something}wow;
  //       width: w\${something}ow;
  //       transform: translateX(\${(props) => props.translateX}) translateY(\${(props) => props.translateX});
  //       transform1: translateX(\${(props) => props.translateX}) translateY(\${(props) => props.translateX});
  //       transform2: translateX(\${(props) => props.translateX}) translateY(\${(props) => props.translateX};
  //       \``
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('media query', () => {
  //     const basic =
  //       'const H1 = styled.h1`@media print {' +
  //       '  font-size: 10pt' +
  //       '}' +
  //       '@media screen {' +
  //       '  .child-selector { font-size: 13px }' +
  //       '}' +
  //       '@media screen, print {' +
  //       '  &:hover + & { line-height: 1.2 }' +
  //       '}' +
  //       '@media only screen ' +
  //       '  and (min-device-width: 320px) ' +
  //       '  and (max-device-width: 480px)' +
  //       '  and (-webkit-min-device-pixel-ratio: 2) {' +
  //       '    .child-selector { line-height: 1.4 }' +
  //       '}`'
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('function call', () => {
  //     const basic = "styled(MyComponent)`font-size: ${fontSize + 'px'};`"
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('name is correct with no identifier', () => {
  //     const basic = `
  //       css\`
  //       margin: 12px 48px;
  //       color: #ffffff;
  //       \`
  //     `
  //     const { code } = babel.transform(basic, {
  //       plugins: [[plugin]]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('objects fn call', () => {
  //     const basic = `
  //     const H1 = styled('h1')({
  //       display: 'flex'
  //     })`
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('objects based on props', () => {
  //     const basic = `
  //     const H1 = styled('h1')({ padding: 10 },props => ({
  //       display: props.display
  //     }))`
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('object composes with classes', () => {
  //     const basic = `
  //     const H1 = styled('h1')('some-class',props => ({
  //       display: props.display
  //     }))`
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('objects prefixed', () => {
  //     const basic = `
  //     const H1 = styled('h1')({
  //       borderRadius: '50%',
  //       transition: 'transform 400ms ease-in-out',
  //       boxSizing: 'border-box',
  //       display: 'flex',
  //       ':hover': {
  //         transform: 'scale(1.2)'
  //       }
  //   }, props => {
  //       padding: props.padding
  //   })`
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('styled. objects', () => {
  //     const basic = `
  //     const H1 = styled.h1({ padding: 10 },props => ({
  //       display: props.display
  //     }))`
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('styled objects prefixed', () => {
  //     const basic = `
  //     const H1 = styled.h1({
  //       borderRadius: '50%',
  //       transition: 'transform 400ms ease-in-out',
  //       boxSizing: 'border-box',
  //       display: 'flex',
  //       ':hover': {
  //         transform: 'scale(1.2)'
  //       }
  //     },props => ({
  //       display: props.display
  //     }))`
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  //
  //   test('composes based on props', () => {
  //     const basic = `const cls1 = css\` width: 20px; \`
  //     const H1 = styled.h1\`
  //       composes: $\{props => {
  //       return props.a ? cssA : cssB
  //     }};
  //       font-size: \${fontSize + 'px'};
  //       height: 20px;
  //       transform: translateX(\${(props) => props.translateX});
  //     \``
  //     const { code } = babel.transform(basic, {
  //       plugins: [plugin]
  //     })
  //     expect(code).toMatchSnapshot()
  //   })
  // })

  // describe('extract', () => {
  //   test('no use', () => {
  //     const basic = 'styled.h1``'
  //     const { code } = babel.transform(basic, {
  //       plugins: [[plugin, { extractStatic: true }]],
  //       filename: __filename,
  //       babelrc: false
  //     })
  //     expect(code).toMatchSnapshot()
  //     expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
  //     expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
  //   })
  //
  //   test('basic', () => {
  //     const basic =
  //       "const H1 = styled.h1`display: flex; justify-content: center; width: var(--css-hash-0); &:hover { background-color: green; } @media (max-width: 500px) { height: var(--css-hash-1); position: fixed; } @media print { display: none; } &::before { color: blue; width: 20px; height: 20px; content: 'pseudo' }`"
  //     const { code } = babel.transform(basic, {
  //       plugins: [[plugin, { extractStatic: true }]],
  //       filename: __filename,
  //       babelrc: false
  //     })
  //
  //     expect(code).toMatchSnapshot()
  //     expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
  //     expect(fs.writeFileSync.mock.calls[1][1]).toMatchSnapshot()
  //   })
  // })
})
