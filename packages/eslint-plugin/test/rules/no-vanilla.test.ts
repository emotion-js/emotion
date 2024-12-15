/**
 * @jest-environment node
 */

import { RuleTester } from '@typescript-eslint/rule-tester'
import rule from '../../src/rules/no-vanilla'
import { espreeParser } from '../test-utils'

const ruleTester = new RuleTester({
  languageOptions: {
    parser: espreeParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  }
})

ruleTester.run('no-vanilla', rule, {
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
