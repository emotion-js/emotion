import * as babel from 'babel-core'
import plugin from 'babel-plugin-emotion'
import * as fs from 'fs'
import { createInline } from './util'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)
fs.statSync.mockReturnValue({ isFile: () => false })

const inline = {
  'keyframes basic': {
    code: `
      const rotate360 = keyframes\`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
    \`;`
  },

  'keyframes with interpolation': {
    code: `
      const rotate360 = keyframes\`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(\${endingRotation});
        }
    \`;`
  },

  'static change import': {
    code: `
      const rotate360 = frames\`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
    \`;
      const rotate3601 = keyframes\`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
    \`;`,

    opts: { importedNames: { keyframes: 'frames' } }
  },

  'dynamic change import': {
    code: `
      import { keyframes as frames } from 'emotion'
      const rotate360 = frames\`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
    \`;
      const rotate3601 = keyframes\`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
    \`;`
  }
}

createInline('keyframes', inline)

describe('babel keyframes', () => {
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
