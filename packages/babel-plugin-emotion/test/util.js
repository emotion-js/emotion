// @flow
/* eslint-env jest */
import plugin from 'babel-plugin-emotion'
import * as babel6 from 'babel-core'
import * as babel7 from '@babel/core'
import stage2 from 'babel-plugin-syntax-object-rest-spread'
import makeCases from 'jest-in-case'
import checkDuplicatedNodes from 'babel-check-duplicated-nodes'
import { basename } from 'path'
import * as fs from 'fs'

// $FlowFixMe
process.cwd = () => __dirname

type TestCases<Opts> = { [name: string]: Opts } | Array<Opts>

type EmotionTestCases = TestCases<{
  name?: string,
  only?: boolean,
  skip?: boolean,
  [key: string | number]: mixed
}>

jest.mock('fs', () => {
  // $FlowFixMe
  let realFs = require.requireActual('fs')
  let readFileSync = jest.fn()
  readFileSync.mockImplementation((...args) => {
    if (args[0].includes('emotion.css')) {
      return ''
    }
    return realFs.readFileSync(...args)
  })
  return {
    ...realFs,
    readFileSync,
    writeFileSync: jest.fn(),
    existsSync: (...args) => {
      if (args[0].includes('emotion.css')) {
        return true
      }
      return realFs.existsSync(...args)
    },
    statSync: (...args) => {
      if (args[0].includes('emotion.css')) {
        return { isFile: () => false }
      }
      return realFs.statSync(...args)
    }
  }
})

const isBabel7 = babel => parseInt(babel.version.split('.')[0], 10) === 7

const createInlineTester = babel => opts => {
  if (!opts.opts) opts.opts = {}
  const { code, ast } = babel.transform(opts.code, {
    plugins: [
      stage2,
      require('babel-plugin-syntax-class-properties'),
      [
        plugin,
        {
          ...opts.opts
        }
      ]
    ],
    filename: opts.filename !== undefined ? opts.filename : 'emotion.js',
    babelrc: false,
    ast: true,
    ...(isBabel7(babel)
      ? {
          configFile: false
        }
      : {})
  })
  if (isBabel7(babel)) {
    expect(() => checkDuplicatedNodes(babel, ast)).not.toThrow()
  }
  expect(code).toMatchSnapshot()
}

export const createInlineTests = (title: string, cases: EmotionTestCases) => {
  describe(title, () => {
    makeCases('babel 6', createInlineTester(babel6), cases)
    makeCases('babel 7', createInlineTester(babel7), cases)
  })
}

const createExtractTester = babel => opts => {
  fs.writeFileSync.mockClear()
  let extract = true
  if (opts.extract === false) extract = false
  if (!opts.opts) opts.opts = {}
  const { code, ast } = babel.transform(opts.code, {
    plugins: [
      stage2,
      [
        plugin,
        {
          extractStatic: true,
          ...opts.opts
        }
      ]
    ],
    filename: opts.filename !== undefined ? opts.filename : 'emotion.js',
    babelrc: false,
    ast: true,
    ...(isBabel7(babel)
      ? {
          configFile: false
        }
      : {})
  })
  if (isBabel7(babel)) {
    expect(() => checkDuplicatedNodes(babel, ast)).not.toThrow()
  }
  if (extract) {
    expect(
      code +
        '\n\n\n' +
        basename(fs.writeFileSync.mock.calls[0][0]) +
        '\n' +
        fs.writeFileSync.mock.calls[0][1]
    ).toMatchSnapshot()
  } else {
    expect(code).toMatchSnapshot()
    expect(fs.writeFileSync).not.toBeCalled()
  }
}

export const createExtractTests = (title: string, cases: EmotionTestCases) => {
  describe(title, () => {
    makeCases('babel 6', createExtractTester(babel6), cases)
    makeCases('babel 7', createExtractTester(babel7), cases)
  })
}

const createMacroTester = babel => opts => {
  if (!opts.opts) opts.opts = {}
  const { code, ast } = babel.transform(opts.code, {
    plugins: [
      [
        require('babel-plugin-macros'),
        {
          ...opts.opts
        }
      ]
    ],
    babelrc: false,
    filename: opts.filename || __filename,
    ast: true,
    ...(isBabel7(babel) ? { configFile: false } : {})
  })
  if (isBabel7(babel)) {
    expect(() => checkDuplicatedNodes(babel, ast)).not.toThrow()
  }
  expect(code).toMatchSnapshot()
}

export const createMacroTests = (title: string, cases: EmotionTestCases) => {
  describe(title, () => {
    makeCases('babel 6', createMacroTester(babel6), cases)
    makeCases('babel 7', createMacroTester(babel7), cases)
  })
}
