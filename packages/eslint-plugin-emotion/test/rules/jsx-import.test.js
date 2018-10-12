/**
 * @jest-environment node
 */

const { RuleTester } = require('eslint')
const rule = require('../../src/rules/jsx-import')

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
      // @jsx jsx
      import { jsx } from '@emotion/core'

      let ele = <div css={{}} />
      `
    },
    {
      code: `

      let ele = <div notCss={{}} />
      `
    }
  ],

  invalid: [
    {
      code: `
// @jsx jsx
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        }
      ],
      output: `
// @jsx jsx
import { jsx } from '@emotion/core'
let ele = <div css={{}} />
            `.trim()
    },
    {
      code: `
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        }
      ],
      output: `
/** @jsx jsx */
import { jsx } from '@emotion/core'
let ele = <div css={{}} />
                  `.trim()
    },
    {
      code: `
import {jsx} from '@emotion/core'
let ele = <div css={{}} />
      `.trim(),
      errors: [
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        }
      ],
      output: `
/** @jsx jsx */
import {jsx} from '@emotion/core'
let ele = <div css={{}} />
      `.trim()
    },
    {
      code: `
import {jsx} from '@emotion/core'
let ele = <div css={{}} />
let ele2 = <div css={{}} />
      `.trim(),
      errors: [
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        },
        {
          message:
            'The css prop can only be used if jsx from @emotion/core is imported and it is set as the jsx pragma'
        }
      ],
      output: `
/** @jsx jsx */
import {jsx} from '@emotion/core'
let ele = <div css={{}} />
let ele2 = <div css={{}} />

      `.trim()
    }
  ]
})
