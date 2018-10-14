/**
 * @jest-environment node
 */

const { RuleTester } = require('eslint')
const rule = require('eslint-plugin-emotion').rules['no-vanilla']

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
  valid: [{ code: `import { css } from '@emotion/core'` }],
  invalid: [
    {
      code: `import { css } from 'emotion'`,
      errors: [
        {
          message: `Vanilla emotion should not be used`
        }
      ]
    }
  ]
})
