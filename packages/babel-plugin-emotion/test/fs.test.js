import { transform } from 'babel-core'
import fs from 'fs'
// import { basename } from 'path'
import mkdirp from 'mkdirp'
import touch from 'touch'
import plugin from 'babel-plugin-emotion'

jest
  .mock('fs')
  .mock('mkdirp')
  .mock('touch')

fs.statSync.mockReturnValue({ isFile: () => false })

const basic = `
css\`
  margin: 12px 48px;
  color: #ffffff;
  display: flex;
  flex: 1 0 auto;
  color: blue;
  name: class;
\``

let output

const filenameArr = __filename.split('.')
filenameArr.pop()
filenameArr.push('emotion', 'css')
const cssFilename = filenameArr.join('.')

describe('babel plugin fs', () => {
  test('creates and writes to the css file when it does not exist', () => {
    fs.existsSync.mockReturnValueOnce(false)
    const { code } = transform(basic, {
      plugins: [[plugin, { extractStatic: true }]],
      filename: __filename,
      babelrc: false
    })
    expect(fs.existsSync).toBeCalledWith(cssFilename)
    expect(mkdirp.sync).not.toBeCalled()
    expect(touch.sync).toBeCalledWith(cssFilename)
    expect(fs.writeFileSync).toHaveBeenCalled()
    expect(fs.writeFileSync.mock.calls[0][0]).toBe(cssFilename)
    expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
    output = fs.writeFileSync.mock.calls[0][1]
    expect(code).toMatchSnapshot()
  })

  // test('creates and writes to the custom output dir when it does not exist', () => {
  //   const ABSOLUTE_PATH = '/some/absolute/path/'
  //   fs.existsSync.mockReturnValueOnce(false)
  //   const { code } = transform(basic, {
  //     plugins: [[plugin, { extractStatic: true, outputDir: ABSOLUTE_PATH }]],
  //     filename: __filename,
  //     babelrc: false
  //   })

  //   const newFilePath = `${ABSOLUTE_PATH}${basename(cssFilename)}`
  //   expect(fs.existsSync).toBeCalledWith(newFilePath)
  //   expect(mkdirp.sync).toBeCalledWith(ABSOLUTE_PATH)
  //   expect(touch.sync).toBeCalledWith(newFilePath)
  //   expect(fs.writeFileSync).toHaveBeenCalled()
  //   expect(fs.writeFileSync.mock.calls[0][0]).toBe(newFilePath)
  //   expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
  //   expect(code).toMatchSnapshot()
  // })

  test('writes to the css file when it does exist ', () => {
    fs.existsSync.mockReturnValueOnce(true)
    fs.readFileSync.mockReturnValueOnce('')
    const { code } = transform(basic, {
      plugins: [[plugin, { extractStatic: true }]],
      filename: __filename,
      babelrc: false
    })
    expect(fs.existsSync).toBeCalledWith(cssFilename)
    expect(touch.sync).toHaveBeenCalledTimes(1)
    expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
    expect(fs.writeFileSync.mock.calls[1][0]).toBe(cssFilename)
    expect(fs.writeFileSync.mock.calls[1][1]).toMatchSnapshot()
    expect(code).toMatchSnapshot()
  })
  test('does not write to the css file when it is the same as is already written', () => {
    fs.existsSync.mockReturnValueOnce(true)
    fs.readFileSync.mockReturnValueOnce(output)
    const { code } = transform(basic, {
      plugins: [[plugin, { extractStatic: true }]],
      filename: __filename,
      babelrc: false
    })
    expect(fs.existsSync).toBeCalledWith(cssFilename)
    expect(touch.sync).toHaveBeenCalledTimes(1)
    expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
    expect(code).toMatchSnapshot()
  })
})
