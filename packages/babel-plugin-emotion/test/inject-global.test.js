import * as babel from 'babel-core'
import plugin from 'babel-plugin-emotion'
import * as fs from 'fs'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)
fs.statSync.mockReturnValue({ isFile: () => false })

describe('babel injectGlobal', () => {
  describe('inline', () => {
    test('injectGlobal basic', () => {
      const basic = `
        injectGlobal\`
          body {
            margin: 0;
            padding: 0;
            & > div {
              display: flex;
            }
          }
          html {
            background: green;
          }
      \`;`
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
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
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })
    test('static change import', () => {
      const basic = `
        inject\`
          body {
            margin: 0;
            padding: 0;
            & > div {
              display: flex;
            }
          }
          html {
            background: green;
          }
      \`;
      injectGlobal\`
        body {
          margin: 0;
          padding: 0;
          & > div {
            display: flex;
          }
        }
        html {
          background: green;
        }
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin, { importedNames: { injectGlobal: 'inject' } }]]
      })
      expect(code).toMatchSnapshot()
    })
    test('dynamic change import', () => {
      const basic = `
        import { injectGlobal as inject } from 'emotion'
        inject\`
          body {
            margin: 0;
            padding: 0;
            & > div {
              display: flex;
            }
          }
          html {
            background: green;
          }
      \`;
      injectGlobal\`
        body {
          margin: 0;
          padding: 0;
          & > div {
            display: flex;
          }
        }
        html {
          background: green;
        }
      \`;`
      const { code } = babel.transform(basic, { plugins: [[plugin]] })
      expect(code).toMatchSnapshot()
    })
  })
  describe('extract', () => {
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
        plugins: [[plugin, { extractStatic: true }]],
        filename: __filename,
        babelrc: false
      })

      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
      expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
    })
    test('injectGlobal assign to variable', () => {
      const basic = `
        const thisWillBeUndefined = injectGlobal\`
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
        plugins: [[plugin, { extractStatic: true }]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
      expect(fs.writeFileSync.mock.calls[1][1]).toMatchSnapshot()
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
        plugins: [[plugin, { extractStatic: true }]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
    })
  })
})
