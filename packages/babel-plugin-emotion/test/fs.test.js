// @flow
import { transform } from 'babel-core'
import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import touch from 'touch'
import plugin from 'babel-plugin-emotion'

jest
  .mock('fs')
  .mock('mkdirp')
  .mock('touch')

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
const cssFilepath = path.resolve(
  process.cwd(),
  path.basename(filenameArr.join('.'))
)

describe('babel plugin fs', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    fs.statSync.mockReturnValue({ isFile: () => false })
  })

  test('creates and writes to the css file when it does not exist', () => {
    fs.existsSync.mockReturnValueOnce(false)
    const { code } = transform(basic, {
      plugins: [[plugin, { extractStatic: true }]],
      filename: __filename,
      babelrc: false
    })

    expect(fs.existsSync).toBeCalledWith(cssFilepath)
    expect(mkdirp.sync).not.toBeCalledWith()
    expect(touch.sync).toBeCalledWith(cssFilepath)
    expect(fs.writeFileSync).toHaveBeenCalled()
    expect(fs.writeFileSync.mock.calls[0][0]).toBe(cssFilepath)
    expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
    output = fs.writeFileSync.mock.calls[0][1]
    expect(code).toMatchSnapshot()
  })

  test('creates and writes to the custom output dir when it does not exist', () => {
    const ABSOLUTE_PATH = './tmpdir'
    fs.existsSync.mockReturnValueOnce(false)
    const { code } = transform(basic, {
      plugins: [[plugin, { extractStatic: true, outputDir: ABSOLUTE_PATH }]],
      filename: __filename,
      babelrc: false
    })

    const newFilePath = path.resolve(ABSOLUTE_PATH, path.basename(cssFilepath))
    expect(fs.existsSync).toBeCalledWith(newFilePath)
    expect(mkdirp.sync).toBeCalledWith(path.dirname(newFilePath))
    expect(touch.sync).toBeCalledWith(newFilePath)
    expect(fs.writeFileSync).toHaveBeenCalled()
    expect(fs.writeFileSync.mock.calls[0][0]).toBe(newFilePath)
    expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
    expect(code).toMatchSnapshot()
  })

  test('creates and writes to the custom output dir with correct filenames', () => {
    const ABSOLUTE_PATH = './tmpdir'
    fs.existsSync.mockReturnValueOnce(false)
    const { code } = transform(basic, {
      plugins: [[plugin, { extractStatic: true, outputDir: ABSOLUTE_PATH }]],
      filename: __filename,
      sourceFileName: '../' + path.basename(__filename),
      babelrc: false
    })

    const newFilePath = path.resolve(ABSOLUTE_PATH, '_', path.basename(cssFilepath))
    expect(fs.existsSync).toBeCalledWith(newFilePath)
    expect(mkdirp.sync).toBeCalledWith(path.dirname(newFilePath))
    expect(touch.sync).toBeCalledWith(newFilePath)
    expect(fs.writeFileSync).toHaveBeenCalled()
    expect(fs.writeFileSync.mock.calls[0][0]).toBe(newFilePath)
    expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
    expect(code).toMatchSnapshot()
  })

  test('writes to the css file when it does exist ', () => {
    fs.existsSync.mockReturnValueOnce(true)
    fs.readFileSync.mockReturnValueOnce('')
    const { code } = transform(basic, {
      plugins: [[plugin, { extractStatic: true }]],
      filename: __filename,
      babelrc: false
    })
    expect(fs.existsSync).toBeCalledWith(cssFilepath)
    expect(touch.sync).not.toHaveBeenCalled()
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
    expect(fs.writeFileSync.mock.calls[0][0]).toBe(cssFilepath)
    expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
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
    expect(fs.existsSync).toBeCalledWith(cssFilepath)
    expect(touch.sync).not.toHaveBeenCalled()
    expect(fs.writeFileSync).not.toHaveBeenCalled()
    expect(code).toMatchSnapshot()
  })
})
