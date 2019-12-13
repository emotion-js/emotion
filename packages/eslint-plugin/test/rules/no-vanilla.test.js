/**
 * @jest-environment node
 */

import { RuleTester } from 'eslint'
import { rules as emotionRules } from '@emotion/eslint-plugin'

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
  valid: [{ code: `import { css } from '@emotion/react'` }],
  invalid: [
    {
      code: `import { css } from '@emotion/css'`,
      errors: [
        {
          message: `Vanilla emotion should not be used`
        }
      ]
    }
  ]
})
