/* eslint-env jest */
import * as babel from 'babel-core'
import plugin from '../../src/babel'
import * as fs from 'fs'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)

describe('babel keyframes', () => {
  describe('inline', () => {
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
  describe('extract', () => {
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
        plugins: [[plugin, { extractStatic: true }]],
        babelrc: false,
        filename: __filename
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
      expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
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
        plugins: [[plugin, { extractStatic: true }]],
        babelrc: false,
        filename: __filename
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
    })
  })
})
