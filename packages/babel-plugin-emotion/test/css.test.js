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
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
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

    test('css with float property', () => {
      const basic = `
        css\`
          float: left;
      \``
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
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
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('nested expanded properties', () => {
      const basic = `
        css\`
        margin: 12px 48px;
        & .div {
          display: 'flex';
        }
      \``
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
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
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('composes', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          composes: \${'one-class'} \${'another-class'}\${cls1};
          justify-content: center;
          align-items: \${'center'}
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('lots of composes', () => {
      const basic = `
        const cls2 = css\`
          composes: \${'one-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'};
          justify-content: center;
          align-items: \${'center'}
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
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
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
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
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })
    test('only composes', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          composes: \${'one-class'} \${'another-class'}\${cls1};
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
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
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('throws correct error when composes is not the first rule', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          justify-content: center;
          composes: \${'one-class'} \${'another-class'}\${cls1};
          align-items: \${'center'}
        \`
      `
      expect(() =>
        babel.transform(basic, {
          plugins: [[plugin]]
        })
      ).toThrowErrorMatchingSnapshot()
    })
    test('throws correct error when the value of composes is not an interpolation', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          composes: some-class;
          justify-content: center;
          align-items: \${'center'}
        \`
      `
      expect(() =>
        babel.transform(basic, {
          plugins: [[plugin]]
        })
      ).toThrowErrorMatchingSnapshot()
    })
    test('throws correct error when composes is on a nested selector', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          justify-content: center;
          align-items: center;
          .some-class {
            composes: \${cls1};
          }
        \`
      `
      expect(() =>
        babel.transform(basic, {
          plugins: [[plugin]]
        })
      ).toThrowErrorMatchingSnapshot()
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
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
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
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
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

    test('composes', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          composes: \${'one-class'}\${'another-class'}\${cls1};
          justify-content: center;
          align-items: \${'center'}
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin, { extractStatic: true }]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
      expect(fs.writeFileSync.mock.calls[1][1]).toMatchSnapshot()
    })
    test('composes no dynamic', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          composes: \${'one-class'} \${'another-class'}\${cls1};
          justify-content: center;
          align-items: center
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin, { extractStatic: true }]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(3)
      expect(fs.writeFileSync.mock.calls[2][1]).toMatchSnapshot()
    })

    test('basic object support', () => {
      const basic = `css({display: 'flex'})`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('renamed-import: basic object support', () => {
      const basic = `cows({display: 'flex'})`
      const { code } = babel.transform(basic, {
        plugins: [[plugin, { importedNames: { css: 'cows' } }]]
      })
      expect(code).toMatchSnapshot()
    })

    test('prefixed objects', () => {
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
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('dynamic property objects', () => {
      const basic = `
        css({
          fontSize: 10,
          [\`w$\{'idth'}\`]: 20
        })
       `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('prefixed array of objects', () => {
      const basic = `
          css([{
            borderRadius: '50%',
            boxSizing: ['border-box'],
            [display]: 'flex',
            ':hover': {
              transform: 'scale(1.2)'
            }
        }, {
          transition: 'transform 400ms ease-in-out',
        }])
    `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('composes with objects', () => {
      const basic = `
        const cls1 = css({display: 'flex'})
        const cls2 = css\`
          composes: $\{cls1};
          height: 20;
          justifyContent: center;
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin, { extractStatic: true }]],
        filename: __filename,
        babelrc: false
      })

      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(3)
      expect(fs.writeFileSync.mock.calls[2][1]).toMatchSnapshot()
    })
  })
})
