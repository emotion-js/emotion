import * as babel from 'babel-core'
import plugin from '../../src/babel'
import * as fs from 'fs'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)
fs.statSync.mockReturnValue({ isFile: () => false })

describe('fontFace babel', () => {
  describe('inline', () => {
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
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
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
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })
  })
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
