// @flow
/* eslint-env jest */
import plugin from 'babel-plugin-emotion'
import * as babel6 from 'babel-core'
import * as babel7 from '@babel/core'
import stage2 from 'babel-plugin-syntax-object-rest-spread'
import _makeCases from 'jest-in-case'
import checkDuplicatedNodes from 'babel-check-duplicated-nodes'

let makeCases: any = _makeCases

// $FlowFixMe
process.cwd = () => __dirname

type EmotionTestCase = {|
  name?: string,
  only?: boolean,
  skip?: boolean,
  code: string,
  opts?: Object,
  filename?: string
|}

type EmotionTestCases = { [name: string]: EmotionTestCase }

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
    filename: 'filename' in opts ? opts.filename : 'emotion.js',
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
