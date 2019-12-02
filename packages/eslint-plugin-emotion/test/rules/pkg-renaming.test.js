/**
 * @jest-environment node
 */

const { RuleTester } = require('eslint')
const rule = require('eslint-plugin-emotion').rules['pkg-renaming']

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

ruleTester.run('pkg-renaming', rule, {
  valid: [
    {
      code: `
      import { css } from '@emotion/css'
      `
    }
  ],

  invalid: [
    {
      code: `import { css } from 'emotion'`,
      errors: [
        {
          message:
            '"emotion" has been renamed to "@emotion/css", please import it from "@emotion/css" instead'
        }
      ],
      output: `import { css } from '@emotion/css'`
    },
    {
      code: `import { css } from '@emotion/core'`,
      errors: [
        {
          message:
            '"@emotion/core" has been renamed to "@emotion/react", please import it from "@emotion/react" instead'
        }
      ],
      output: `import { css } from '@emotion/react'`
    }
  ]
})
