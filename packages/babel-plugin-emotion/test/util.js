/* eslint-env jest */
import plugin from 'babel-plugin-emotion'
import { transform as babel6Transform } from 'babel-core'
import { transform as babel7Transform } from '@babel/core'
import stage2 from 'babel-plugin-syntax-object-rest-spread'
import makeCases from 'jest-in-case'
import { basename } from 'path'
import * as fs from 'fs'

jest.mock('fs')

fs.existsSync.mockReturnValue(true)
fs.statSync.mockReturnValue({ isFile: () => false })

const createInlineTester = transform => opts => {
  if (!opts.opts) opts.opts = {}
  expect(
    transform(opts.code, {
      plugins: [
        stage2,
        [
          plugin,
          {
            filename: opts.filename || __filename,
            babelrc: false,
            ...opts.opts
          }
        ]
      ]
    }).code
  ).toMatchSnapshot()
}

export const createInlineTests = (title, cases) => {
  describe(title, () => {
    makeCases('babel 6', createInlineTester(babel6Transform), cases)
    makeCases('babel 7', createInlineTester(babel7Transform), cases)
  })
}

const createExtractTester = transform => opts => {
  fs.writeFileSync.mockClear()
  let extract = true
  if (opts.extract === false) extract = false
  if (!opts.opts) opts.opts = {}
  const { code } = transform(opts.code, {
    plugins: [
      stage2,
      [
        plugin,
        {
          filename: opts.filename || __filename,
          babelrc: false,
          extractStatic: true,
          ...opts.opts
        }
      ]
    ]
  })
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

export const createExtractTests = (title, cases) => {
  describe(title, () => {
    makeCases('babel 6', createExtractTester(babel6Transform), cases)
    makeCases('babel 7', createExtractTester(babel7Transform), cases)
  })
}

const createMacroTester = transform => opts => {
  if (!opts.opts) opts.opts = {}
  expect(
    transform(opts.code, {
      plugins: [
        [
          require('babel-macros'),
          {
            babelrc: false,
            ...opts.opts
          }
        ]
      ],
      filename: opts.filename || __filename
    }).code
  ).toMatchSnapshot()
}

export const createMacroTests = (title, cases) => {
  describe(title, () => {
    makeCases('babel 6', createMacroTester(babel6Transform), cases)
    makeCases('babel 7', createMacroTester(babel7Transform), cases)
  })
}
