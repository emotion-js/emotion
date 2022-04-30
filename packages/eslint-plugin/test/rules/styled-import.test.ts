/**
 * @jest-environment node
 */

import { TSESLint } from '@typescript-eslint/experimental-utils'
import rule from '../../src/rules/styled-import'
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

ruleTester.run('emotion styled', rule as unknown as RuleModuleForTesting, {
  valid: [
    {
      code: `
import styled from '@emotion/styled'
      `
    }
  ],

  invalid: [
    {
      code: `
import styled from 'react-emotion'
      `.trim(),
      errors: [
        {
          messageId: 'incorrectImport'
        }
      ],
      output: `
import styled from '@emotion/styled'
      `.trim()
    }
  ]
})
