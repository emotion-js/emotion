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
      import {css} from 'emotion'
      `
    }
  ],

  invalid: [
    {
      code: `import { css } from 'react-emotion'`,
      errors: [
        {
          message:
            "emotion's exports should be imported directly from emotion rather than from react-emotion"
        }
      ],
      output: `import { css } from 'emotion'`
    },
    {
      code: `import styled, { css } from 'react-emotion'`,
      errors: [
        {
          message:
            "emotion's exports should be imported directly from emotion rather than from react-emotion"
        }
      ],
      output: `import styled from 'react-emotion'\nimport { css } from 'emotion'`
    }
  ]
})
