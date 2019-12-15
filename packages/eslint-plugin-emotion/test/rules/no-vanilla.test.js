/**
 * @jest-environment node
 */

import { RuleTester } from 'eslint'
import { rules as emotionRules } from 'eslint-plugin-emotion'

const rule = emotionRules['no-vanilla']

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
