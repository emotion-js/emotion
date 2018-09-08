/**
 * @jest-environment node
 */

const { RuleTester } = require('eslint')
const rule = require('../../src/rules/include-emotion-jsx')

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 8
  }
})

const ruleTester = new RuleTester()

ruleTester.run('include emotion jsx', rule, {
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
      code: "const H1 = styled.h1({ color: 'red' })",
      options: ['string'],
      errors: [
        {
          message: 'Styles should be written using strings.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: "const H1 = styled('h1')({ color: 'red' })",
      options: ['string'],
      errors: [
        {
          message: 'Styles should be written using strings.',
          type: 'CallExpression'
        }
      ]
    }
  ]
})

ruleTester.run('syntax-preference (object)', rule, {
  valid: [
    // give me some code that won't trigger a warning
    {
      code: "const H1 = styled.h1({ color: 'red' })",
      options: ['object']
    },
    {
      code: "const H1 = styled('h1')({ color: 'red' })",
      options: ['object']
    },
    {
      code: 'const query = gql` { user(id: 5) { firstName, lastName } }`',
      options: ['object']
    }
  ],

  invalid: [
    {
      code: 'const H1 = styled.h1` color: red; `',
      options: ['object'],
      errors: [
        {
          message: 'Styles should be written using objects.',
          type: 'TaggedTemplateExpression'
        }
      ]
    },
    {
      code: "const H1 = styled('h1')` color: red; `",
      options: ['object'],
      errors: [
        {
          message: 'Styles should be written using objects.',
          type: 'TaggedTemplateExpression'
        }
      ]
    }
  ]
})

ruleTester.run('syntax-preference (undefined)', rule, {
  valid: [
    // give me some code that won't trigger a warning
    {
      code: 'const H1 = styled.h1` color: red; `'
    },
    {
      code: "const H1 = styled('h1')` color: red; `"
    },
    {
      code: "const H1 = styled.h1({ color: 'red' })"
    },
    {
      code: "const H1 = styled('h1')({ color: 'red' })"
    },
    {
      code: 'const query = gql` { user(id: 5) { firstName, lastName } }`'
    }
  ],

  invalid: []
})
