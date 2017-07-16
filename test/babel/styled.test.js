/* eslint-disable no-template-curly-in-string */
/* eslint-env jest */
import * as babel from 'babel-core'
import plugin from '../../src/babel'
import * as fs from 'fs'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)

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
        plugins: [plugin]
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

    test('name is correct with no identifier', () => {
      const basic = `
        css\`
        margin: 12px 48px;
        color: #ffffff;
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('attr', () => {
      const basic = `styled('input')\`
       margin: attr(margin);
       color: #ffffff;
       height: \${props => props.height * props.scale};
       width: attr(width);
       color: blue;
       display: \${flex};
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin]
      })
      expect(code).toMatchSnapshot()
    })

    test('lots of attrs with interpolated values', () => {
      const basic = `styled('input')\`
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       margin: attr(\${marginProp});
       display: attr(\${displayProp});
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
        position: attr(alignItems \${alignItemsUnit}, fallback);
        position: attr(thing px, \${defaultValue});
        position: attr(\${thing} px);
      \``
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
    test('object composes with classes', () => {
      const basic = `
      const H1 = styled('h1')('some-class',props => ({
        display: props.display
      }))`
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
    test('styled. objects prefixed', () => {
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
  })
  describe('extract', () => {
    test('no use', () => {
      const basic = 'styled.h1``'
      const { code } = babel.transform(basic, {
        plugins: [plugin],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(0)
    })

    test('no dynamic', () => {
      const basic = 'styled.h1`color:blue;`'
      const { code } = babel.transform(basic, {
        plugins: [plugin],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
      expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
    })

    test('basic', () => {
      const basic =
        "const H1 = styled.h1`font-size: ${fontSize + 'px'}; height: 20px`"
      const { code } = babel.transform(basic, {
        plugins: [plugin],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
      expect(fs.writeFileSync.mock.calls[1][1]).toMatchSnapshot()
    })

    test('based on props', () => {
      const basic = `const H1 = styled.h1\`
        font-size: \${fontSize + 'px'};
        height: 20px;
        transform: translateX(\${(props) => props.translateX});
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(3)
      expect(fs.writeFileSync.mock.calls[2][1]).toMatchSnapshot()
    })
    test('composes', () => {
      const basic = `const cls1 = css\` width: 20px; \`
      const H1 = styled.h1\`
        composes: \${cls1};
        font-size: \${fontSize + 'px'};
        height: 20px;
        transform: translateX(\${(props) => props.translateX});
      \``
      const { code } = babel.transform(basic, {
        plugins: [plugin],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(4)
      expect(fs.writeFileSync.mock.calls[3][1]).toMatchSnapshot()
    })
  })
})
