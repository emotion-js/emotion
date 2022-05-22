/**
 * @jest-environment node
 */

import { TSESLint } from '@typescript-eslint/utils'
import rule from '../../src/rules/styled-import'
import { espreeParser } from '../test-utils'

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

ruleTester.run('emotion styled', rule, {
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
