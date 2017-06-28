/* eslint-disable jsx-quotes,no-useless-escape,no-template-curly-in-string */
/* eslint-env jest */
const babel = require('babel-core')
const plugin = require('../src/babel')
const fs = require('fs')

jest.mock('fs')

fs.existsSync.mockReturnValue(true)

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
  describe('babel css', () => {
    test('css basic', () => {
      const basic = `
        css\`
        margin: 12px 48px;
        color: #ffffff;
        display: flex;
        flex: 1 0 auto;
        color: blue;
        width: \$\{widthVar\};
      \``
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('css kitchen sink', () => {
      const basic = `
        const cls = css\`font-size: 58pt;margin: $\{margin};\`
        const frag = fragment\`padding: 8px;\`
        const fragB = fragment\`height: $\{heightVar};@apply \$\{frag};\`
        const cls2 = css\`
        @apply $\{frag};
        @apply $\{fragB};
        margin: 12px 48px;
        color: #ffffff;
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })
  })
  describe('babel styled component extract', () => {
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
      const basic =
        "const H1 = styled.h1`font-size: ${fontSize + 'px'}; height: 20px; transform: translateX(${(props) => props.translateX})`"
      const { code } = babel.transform(basic, {
        plugins: [plugin],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(3)
      expect(fs.writeFileSync.mock.calls[2][1]).toMatchSnapshot()
    })
    test('with fragment', () => {
      const basic = `const frag1 = fragment\` width: 20px; \`
      const H1 = styled.h1\`
        font-size: \${fontSize + 'px'};
        height: 20px;
        transform: translateX(\${(props) => props.translateX});
        @apply \${frag1}
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
  })
  describe('babel css extract', () => {
    test('css basic', () => {
      const basic = `
        css\`
        margin: 12px 48px;
        color: #ffffff;
        display: flex;
        flex: 1 0 auto;
        color: blue;
        width: \$\{widthVar\};
      \``
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(4)
      expect(fs.writeFileSync.mock.calls[3][1]).toMatchSnapshot()
    })

    test('css kitchen sink', () => {
      const basic = `
        const cls = css\`font-size: 58pt;margin: $\{margin};\`
        const frag = fragment\`padding: 8px;\`
        const fragB = fragment\`height: $\{heightVar};@apply \$\{frag};\`
        const cls2 = css\`
        @apply $\{frag};
        @apply $\{fragB};
        margin: 12px 48px;
        color: #ffffff;
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(5)
      expect(fs.writeFileSync.mock.calls[4][1]).toMatchSnapshot()
    })
  })
  describe('babel injectGlobal extract', () => {
    test('injectGlobal basic', () => {
      const basic = `
        injectGlobal\`
          body {
            margin: 0;
            padding: 0;
            & > div {
              display: none;
            }
          }
          html {
            background: green;
          }
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(6)
      expect(fs.writeFileSync.mock.calls[5][1]).toMatchSnapshot()
    })
    test('injectGlobal with interpolation', () => {
      const basic = `
        injectGlobal\`
          body {
            margin: 0;
            padding: 0;
            display: \${display};
            & > div {
              display: none;
            }
          }
          html {
            background: green;
          }
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(6)
    })
  })
  describe('babel font-face extract', () => {
    test('font-face basic', () => {
      const basic = `
        fontFace\`
          font-family: MyHelvetica;
          src: local("Helvetica Neue Bold"),
               local("HelveticaNeue-Bold"),
               url(MgOpenModernaBold.ttf);
          font-weight: bold;
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false

      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(7)
      expect(fs.writeFileSync.mock.calls[6][1]).toMatchSnapshot()
    })
    test('font-face with interpolation', () => {
      const basic = `
        fontFace\`
          font-family: \${fontFamilyName};
          src: local("Helvetica Neue Bold"),
               local("HelveticaNeue-Bold"),
               url(MgOpenModernaBold.ttf);
          font-weight: bold;
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        babelrc: false,
        filename: __filename
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(7)
    })
  })
  describe('babel keyframes extract', () => {
    test('keyframes basic', () => {
      const basic = `
        const rotate360 = keyframes\`
          from {
            transform: rotate(0deg);
          }
        
          to {
            transform: rotate(360deg);
          }
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        babelrc: false,
        filename: __filename
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(8)
      expect(fs.writeFileSync.mock.calls[7][1]).toMatchSnapshot()
    })
    test('keyframes with interpolation', () => {
      const basic = `
        const rotate360 = keyframes\`
          from {
            transform: rotate(0deg);
          }
        
          to {
            transform: rotate(\${endingRotation});
          }
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        babelrc: false,
        filename: __filename
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(8)
    })
  })
  describe('babel fragment', () => {
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

    test('fragment with multiple selectors that should throw', () => {
      expect(() => {
        const basic = `
          const frag = fragment\`
            color: green;
            display: none;
            &:hover {
              color: yellow;
            }
            & .wow {
              color: purple;
            }
          \`;
        `
        babel.transform(basic, {
          plugins: [plugin]
        })
      }).toThrowErrorMatchingSnapshot()
    })
  })

  describe('babel keyframes', () => {
    test('keyframes basic', () => {
      const basic = `
        const rotate360 = keyframes\`
          from {
            transform: rotate(0deg);
          }
        
          to {
            transform: rotate(360deg);
          }
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })
    test('keyframes with interpolation', () => {
      const basic = `
        const rotate360 = keyframes\`
          from {
            transform: rotate(0deg);
          }
        
          to {
            transform: rotate(\${endingRotation});
          }
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })
  })
  describe('babel injectGlobal', () => {
    test('injectGlobal basic', () => {
      const basic = `
        injectGlobal\`
          body {
            margin: 0;
            padding: 0;
            & > div {
              display: none;
            }
          }
          html {
            background: green;
          }
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })
    test('injectGlobal with interpolation', () => {
      const basic = `
        injectGlobal\`
          body {
            margin: 0;
            padding: 0;
            display: \${display};
            & > div {
              display: none;
            }
          }
          html {
            background: green;
          }
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })
  })
  describe('babel font-face', () => {
    test('font-face basic', () => {
      const basic = `
        fontFace\`
          font-family: MyHelvetica;
          src: local("Helvetica Neue Bold"),
               local("HelveticaNeue-Bold"),
               url(MgOpenModernaBold.ttf);
          font-weight: bold;
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })
    test('font-face with interpolation', () => {
      const basic = `
        fontFace\`
          font-family: \${fontFamilyName};
          src: local("Helvetica Neue Bold"),
               local("HelveticaNeue-Bold"),
               url(MgOpenModernaBold.ttf);
          font-weight: bold;
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })
  })
})
