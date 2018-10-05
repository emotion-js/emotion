/**
 * @jest-environment node
 */

const { RuleTester } = require('eslint')
const rule = require('../../src/rules/styled')

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

ruleTester.run('emotion jsx', rule, {
  valid: [
    {
      code: `
import styled from '@emotion/styled'
      `
    },
    {
      code: `
import styled from '@emotion/preact-styled'
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
    },
    {
      code: `
import styled from 'preact-emotion'
      `.trim(),
      errors: [
        {
          message: `styled should be imported from @emotion/preact-styled`
        }
      ],
      output: `
import styled from '@emotion/preact-styled'
                  `.trim()
    },
    {
      code: `
import styled from "react-emotion"
        `.trim(),
      errors: [
        {
          message: `styled should be imported from @emotion/styled`
        }
      ],
      output: `
import styled from "@emotion/styled"
        `.trim()
    }
  ]
})
