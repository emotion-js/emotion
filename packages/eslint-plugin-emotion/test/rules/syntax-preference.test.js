/**
 * @fileoverview Choose between string or object syntax
 * @author alex-pex
 * @jest-environment node
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require('eslint')
const rule = require('eslint-plugin-emotion').rules['syntax-preference']

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6
  }
})

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()

ruleTester.run('syntax-preference (string)', rule, {
  valid: [
    // give me some code that won't trigger a warning
    {
      code: 'const H1 = styled.h1` color: red; `',
      options: ['string']
    },
    {
      code: "const H1 = styled('h1')` color: red; `",
      options: ['string']
    },
    {
      code: 'const query = gql` { user(id: 5) { firstName, lastName } }`',
      options: ['string']
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
