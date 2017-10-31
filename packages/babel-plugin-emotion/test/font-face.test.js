import * as babel from 'babel-core'
import plugin from 'babel-plugin-emotion'
import * as fs from 'fs'
import { createInline } from './util'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)
fs.statSync.mockReturnValue({ isFile: () => false })

const inline = {
  basic: {
    code: `
      fontFace\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`
  },

  interpolation: {
    code: `
      fontFace\`
        font-family: \${fontFamilyName};
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`
  },

  'static change import': {
    code: `
      f\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;
      fontFace\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
            local("HelveticaNeue-Bold"),
            url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`,

    opts: { importedNames: { fontFace: 'f' } }
  },

  'dynamic change import': {
    code: `
      import { fontFace as f } from 'emotion';
      f\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
             local("HelveticaNeue-Bold"),
             url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;
      fontFace\`
        font-family: MyHelvetica;
        src: local("Helvetica Neue Bold"),
            local("HelveticaNeue-Bold"),
            url(MgOpenModernaBold.ttf);
        font-weight: bold;
    \`;`
  }
}
createInline('fontFace', inline)

describe('fontFace babel', () => {
  describe('extract', () => {
    test('basic', () => {
      const basic = `
        fontFace\`
          font-family: MyHelvetica;
          src: local("Helvetica Neue Bold"),
               local("HelveticaNeue-Bold"),
               url(MgOpenModernaBold.ttf);
          font-weight: bold;
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
    test('basic assign to variable', () => {
      const basic = `
        const thisWillBeUndefined = fontFace\`
          font-family: MyHelvetica;
          src: local("Helvetica Neue Bold"),
               local("HelveticaNeue-Bold"),
               url(MgOpenModernaBold.ttf);
          font-weight: bold;
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
    test('interpolation', () => {
      const basic = `
        fontFace\`
          font-family: \${fontFamilyName};
          src: local("Helvetica Neue Bold"),
               local("HelveticaNeue-Bold"),
               url(MgOpenModernaBold.ttf);
          font-weight: bold;
      \`;`
      const { code } = babel.transform(basic, {
        plugins: [[plugin, { extractStatic: true }]],
        babelrc: false,
        filename: __filename
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
    })
  })
})
