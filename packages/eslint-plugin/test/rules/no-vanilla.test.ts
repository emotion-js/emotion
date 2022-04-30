/**
 * @jest-environment node
 */

import { TSESLint } from '@typescript-eslint/experimental-utils'
import rule from '../../src/rules/no-vanilla'
import { espreeParser, RuleModuleForTesting } from '../test-utils'

const ruleTester = new TSESLint.RuleTester({
  parser: espreeParser,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
})

ruleTester.run('no-vanilla', rule as unknown as RuleModuleForTesting, {
  valid: [{ code: `import { css } from '@emotion/react'` }],
  invalid: [
    {
      code: `import { css } from '@emotion/css'`,
      errors: [
        {
          messageId: 'vanillaEmotion'
        }
      ]
    }
  ]
})
