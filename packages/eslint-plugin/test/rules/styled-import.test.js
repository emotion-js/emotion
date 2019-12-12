/**
 * @jest-environment node
 */

import { RuleTester } from 'eslint'
import { rules as emotionRules } from '@emotion/eslint-plugin'

const rule = emotionRules['styled-import']

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
          message: `styled should be imported from @emotion/styled`
        }
      ],
      output: `
import styled from '@emotion/styled'
      `.trim()
    }
  ]
})
