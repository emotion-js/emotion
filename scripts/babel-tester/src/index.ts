/* eslint-env jest */
import jestInCase from 'jest-in-case'
import * as babel from '@babel/core'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import checkDuplicatedNodes from 'babel-check-duplicated-nodes'

type FixtureTestCase = {
  filename: string
  babelFileName: string
  only: boolean
  skip: boolean
}

type TestCase = {
  code?: string
  filename?: string
  babelFileName?: string
  plugins?: any[]
}

type TesterOptions = {
  plugins?: any[]
  presets?: any[]
  transform?: (code: string) => string
  filename?: string
}

const readFile = promisify(fs.readFile)

const separator = '\n\n      ↓ ↓ ↓ ↓ ↓ ↓\n\n'

const tester = (allOpts: TesterOptions) => async (opts: TestCase) => {
  let rawCode = opts.code
  if (!opts.code && opts.filename) {
    rawCode = await readFile(opts.filename, 'utf-8')
  }
  if (allOpts.transform) {
    rawCode = allOpts.transform(rawCode!)
  }
  const { code, ast } = babel.transformSync(rawCode!, {
    plugins: [
      'macros',
      '@babel/plugin-syntax-jsx',
      '@babel/plugin-syntax-class-properties',
      '@babel/plugin-syntax-object-rest-spread',
      ...(allOpts.plugins || []),
      ...(opts.plugins || [])
    ],
    presets: allOpts.presets,
    babelrc: false,
    configFile: false,
    ast: true,
    filename: 'babelFileName' in opts ? opts.babelFileName : 'emotion.js'
  })!
  expect(() => checkDuplicatedNodes(babel, ast!)).not.toThrow()

  expect(`${rawCode}${separator}${code}`).toMatchSnapshot()
}

function readFixturesDir(dirname: string): string[] {
  const fixturesFolder = path.join(dirname, '__fixtures__')
  return fs
    .readdirSync(fixturesFolder)
    .map(base => path.join(fixturesFolder, base))
}

export default (
  name: string,
  cases:
    | string
    | Record<string, { code: string; plugins?: any[]; babelFileName?: string }>,
  opts: TesterOptions = {}
) => {
  if (typeof cases === 'string') {
    const fixtureCases = readFixturesDir(cases).reduce<
      Record<string, FixtureTestCase>
    >((accum, filename) => {
      let skip = false
      let only = false
      let testTitle = filename
      if (filename.indexOf('.skip.js') !== -1) {
        testTitle = filename.replace('.skip', '')
        skip = true
      } else if (filename.indexOf('.only.js') !== -1) {
        testTitle = filename.replace('.only', '')
        only = true
      }
      accum[path.parse(testTitle).name] = {
        filename,
        babelFileName: opts.filename || filename,
        only,
        skip
      }
      return accum
    }, {})
    return jestInCase(name, tester(opts), fixtureCases)
  }

  return jestInCase(name, tester(opts), cases)
}
