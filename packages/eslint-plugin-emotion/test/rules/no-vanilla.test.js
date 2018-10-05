/**
 * @jest-environment node
 */

const { RuleTester } = require('eslint')
const rule = require('eslint-plugin-emotion/src/rules/styled')

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
})

const ruleTester = new RuleTester()

ruleTester.run('no-vanilla', rule, {
  invalid: [
    {
      code: `
import { css } from 'emotion'
      `.trim(),
      errors: [
        {
          message: `Vanilla emotion should not be used`
        }
      ]
    }
  ]
})
