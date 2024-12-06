/**
 * @jest-environment node
 */

import { RuleTester } from '@typescript-eslint/rule-tester'
import rule from '../../src/rules/styled-import'
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
