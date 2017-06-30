/* eslint-env jest */
import * as babel from 'babel-core'
import plugin from '../../src/babel'
import * as fs from 'fs'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)

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
        width: \${widthVar};
      \``
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('css kitchen sink', () => {
      const basic = `
        const cls = css\`font-size: 58pt;margin: \${margin};\`
        const frag = fragment\`padding: 8px;\`
        const fragB = fragment\`height: \${heightVar};@apply \${frag};\`
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
    test('interpolation in selector', () => {
      const basic = `
        const cls2 = css\`
        margin: 12px 48px;
        color: #ffffff;
        .\${className} {
          display: none;
        }
        \`
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
        width: \${widthVar};
      \``
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
      expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
    })

    test('css kitchen sink', () => {
      const basic = `
        const frag = fragment\`padding: 8px;\`
        const fragB = fragment\`height: \${heightVar};@apply \${frag};\`
        const cls2 = css\`
        @apply \${frag};
        @apply \${fragB};
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
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
    })

    test('interpolation in selector', () => {
      const basic = `
        const cls2 = css\`
        margin: 12px 48px;
        color: #ffffff;
        .\${className} {
          display: none;
        }
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
    })
  })
})
