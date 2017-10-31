/* eslint-env jest */
import plugin from 'babel-plugin-emotion'
import { transform as babel6Transform } from 'babel-core'
import { transform as babel7Transform } from '@babel/core'
import stage2 from 'babel-plugin-syntax-object-rest-spread'
import makeCases from 'jest-in-case'

const createInlineTester = transform => opts => {
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

export const createInline = (title, cases) => {
  describe(title, () => {
    makeCases('babel 6', createInlineTester(babel6Transform), cases)
    makeCases('babel 7', createInlineTester(babel7Transform), cases)
  })
}

export const createExtract = transform => {}
