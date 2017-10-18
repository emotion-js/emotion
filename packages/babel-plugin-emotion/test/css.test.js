import * as babel from 'babel-core'
import plugin from 'babel-plugin-emotion'
import * as fs from 'fs'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)
fs.statSync.mockReturnValue({ isFile: () => false })

describe('babel css', () => {
  describe('inline', () => {
    test('css basic', () => {
      const basic = `
        css\`
        margin: 12px 48px;
        color: #ffffff;
        display: flex;
        flex: 1 0 auto;
        color: blue;
        @media(min-width: 420px) {
          line-height: 40px;
        }
        width: \${widthVar};
      \``
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })

    test('css basic', () => {
      const basic = `
        cows\`
        margin: 12px 48px;
        color: #ffffff;
        display: flex;
        flex: 1 0 auto;
        color: blue;
        @media(min-width: 420px) {
          line-height: 40px;
        }
        width: \${widthVar};
      \``
      const { code } = babel.transform(basic, {
        plugins: [[plugin, { importedNames: { css: 'cows' } }]]
      })
      expect(code).toMatchSnapshot()
    })

    test('css basic as cows', () => {
      const basic = `
        import { css as cows } from 'emotion';
        cows\`
        margin: 12px 48px;
        color: #ffffff;
        display: flex;
        flex: 1 0 auto;
        color: blue;
        @media(min-width: 420px) {
          line-height: 40px;
        }
        width: \${widthVar};
      \``
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })

    test('css with float property', () => {
      const basic = `
        css\`
          float: left;
      \``
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })

    test('css random expression', () => {
      const basic = `css\`
        font-size: 20px;
        @media(min-width: 420px) {
          color: blue;
          \${css\`width: 96px; height: 96px;\`};
          line-height: 26px;
        }
        background: green;
        \${{ backgroundColor: "hotpink" }};
      \`
      `
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })

    test('nested expanded properties', () => {
      const basic = `
        css\`
        margin: 12px 48px;
        & .div {
          display: flex;
        }
      \``
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })

    test('interpolation in selector', () => {
      const basic = `
        const cls2 = css\`
        margin: 12px 48px;
        color: #ffffff;
        \${className} {
          display: none;
        }
        \`
      `
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })

    test('::placeholder', () => {
      const basic = `
        const cls1 = css({
          '::placeholder': {
            color: 'green',
            display: 'flex'
          }
        })
        const cls2 = css\`
          ::placeholder {
            color: green;
            display: flex;
          }
        \`
      `
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })
    test(':fullscreen', () => {
      const basic = `
      const cls1 = css({
        ':fullscreen': {
          color: 'green',
          display: 'flex'
        }
      })
      const cls2 = css\`
        :fullscreen {
          color: green;
          display: flex;
        }
      \`
    `
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })

    test('only styles on nested selector', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          &:hover {
            background: pink;
          }
        \`
      `
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })

    test('object with a bunch of stuff', () => {
      const basic = `
      const cls2 = css({
        float: 'left',
        display: 'flex',
        flex: 1,
        alignItems: \`\${'center'}\`
      })
    `
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })
    test('array of objects', () => {
      const basic = `
      const cls2 = css([{
        display: 'flex',
        flex: 1,
        alignItems: \`\${'center'}\`
      }, {
        justifyContent: 'flex-start'
      }])
    `
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })
    test('symbols inside of ""', () => {
      const basic = `
      const cls = css\`content:  "  {  }  "\`
    `
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })

    test('hoisting', () => {
      const basic = `
        function test () {
          const cls1 = css\`
            font-size: 20px;
            @media(min-width: 420px) {
              color: blue;
              \${css\`width: 96px; height: 96px;\`};
              line-height: 26px;
            }
            background: green;
            \${{ backgroundColor: "hotpink" }};
          \`
        
          const cls2 = css\`\${{color: 'blue'}}\` 
        
          const cls3 = css\`
            display: flex;
            &:hover {
              color: hotpink;
            }
          \`
          function inner () {
            const styles = { color: "darkorchid" };
            const color = 'aquamarine';
            
            const cls4 = css\`
              \${cls3};
              \${cls1};
              \${() => ({ color: "darkorchid" })};
              \${() => ({ color })};
              \${css\`height: 420px;width: \${styles}\`};
            \`
          }
        }
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin, { hoist: true }]]
      })
      expect(code).toMatchSnapshot()
    })
  })
  describe('extract', () => {
    test('css basic', () => {
      const basic = `
        css\`
        margin: 12px 48px;
        color: #ffffff;
        display: flex;
        flex: 1 0 auto;
        color: blue;
      \``
      const { code } = babel.transform(basic, {
        plugins: [[plugin, { extractStatic: true }]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
      expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
    })

    test('basic object support', () => {
      const basic = `css({display: 'flex'})`
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })

    test('renamed-import: basic object support', () => {
      const basic = `cows({display: 'flex'})`
      const { code } = babel.transform(basic, {
        plugins: [[plugin, { importedNames: { css: 'cows' } }]]
      })
      expect(code).toMatchSnapshot()
    })

    test('dynamically renamed-import: basic object support', () => {
      const basic = `import { css as cows } from 'emotion'; cows({display: 'flex'})`
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })

    test('objects', () => {
      const basic = `
          css({
            borderRadius: '50%',
            transition: 'transform 400ms ease-in-out',
            boxSizing: 'border-box',
            display: 'flex',
            ':hover': {
                transform: 'scale(1.2)'
            }
        })
   `
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })

    test('dynamic property objects', () => {
      const basic = `
        css({
          fontSize: 10,
          [\`w$\{'idth'}\`]: 20
        })
       `
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })
  })
})
