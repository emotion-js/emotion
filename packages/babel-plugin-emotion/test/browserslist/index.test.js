import * as babel from 'babel-core'
import plugin from 'babel-plugin-emotion'

describe('babel css', () => {
  describe('inline', () => {
    test('css basic', () => {
      const basic = `
        css\`
        display: flex;
      \``
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
    test('css object', () => {
      const basic = `
        css({
          display: 'flex'
        })`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
  })
})
