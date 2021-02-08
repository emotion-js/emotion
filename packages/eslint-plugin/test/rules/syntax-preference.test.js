/**
 * @fileoverview Choose between string or object syntax
 * @author alex-pex
 * @jest-environment node
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import { RuleTester } from 'eslint'
import { rules as emotionRules } from '@emotion/eslint-plugin'

const rule = emotionRules['syntax-preference']

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
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
    },
    {
      code: `const Foo = () => <div css={css\`color: hotpink;\`} />`,
      options: ['string']
    },
    {
      code: `const Foo = () => <div css={[styles, otherStyles]} />`,
      options: ['string']
    },
    {
      code: `css\`color: hotpink;\``,
      options: ['string']
    },
    {
      code: `css(cls, css\`color: hotpink;\`)`,
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
          type: 'ObjectExpression'
        }
      ]
    },
    {
      code: "const H1 = styled('h1')({ color: 'red' })",
      options: ['string'],
      errors: [
        {
          message: 'Styles should be written using strings.',
          type: 'ObjectExpression'
        }
      ]
    },
    {
      code: `const Foo = () => <div css={{ color: 'hotpink' }} />`,
      options: ['string'],
      errors: [
        {
          message: 'Styles should be written using strings.',
          type: 'ObjectExpression'
        }
      ]
    },
    {
      code: `const Foo = () => <div css={'color: hotpink;'} />`,
      options: ['string'],
      errors: [
        {
          message: 'Prefer wrapping your string styles with `css` call.',
          type: 'Literal'
        }
      ]
    },
    {
      code: `const Foo = () => <div css="'color: hotpink;'" />`,
      options: ['string'],
      errors: [
        {
          message: 'Prefer wrapping your string styles with `css` call.',
          type: 'Literal'
        }
      ]
    },
    {
      code: `const Foo = () => <div css={['background-color: green;', { color: 'hotpink' }]} />`,
      options: ['string'],
      errors: [
        {
          message: 'Prefer wrapping your string styles with `css` call.',
          type: 'Literal'
        },
        {
          message: 'Styles should be written using strings.',
          type: 'ObjectExpression'
        }
      ]
    },
    {
      code: `css(cls, { color: 'hotpink' })`,
      options: ['string'],
      errors: [
        {
          message: 'Styles should be written using strings.',
          type: 'ObjectExpression'
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
    },
    {
      code: `const Foo = () => <div css={{ color: 'hotpink' }} />`,
      options: ['object']
    },
    {
      code: `const Foo = () => <div css={css({ color: 'hotpink' })} />`,
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
    },
    {
      code: `const Foo = () => <div css={css\`color: hotpink;\`} />`,
      options: ['object'],
      errors: [
        {
          message: 'Styles should be written using objects.',
          type: 'TaggedTemplateExpression'
        }
      ]
    },
    {
      code: `const Foo = () => <div css={'color: hotpink;'} />`,
      options: ['object'],
      errors: [
        {
          message: 'Styles should be written using objects.',
          type: 'Literal'
        }
      ]
    },
    {
      code: `const Foo = () => <div css="color: hotpink;" />`,
      options: ['object'],
      errors: [
        {
          message: 'Styles should be written using objects.',
          type: 'Literal'
        }
      ]
    },
    {
      code: `const Foo = () => <div css={['background-color: green;', css\`color: hotpink;\`]} />`,
      options: ['object'],
      errors: [
        {
          message: 'Styles should be written using objects.',
          type: 'Literal'
        },
        {
          message: 'Styles should be written using objects.',
          type: 'TaggedTemplateExpression'
        }
      ]
    },
    {
      code: `const Foo = () => <div css={css(['background-color: green;', css\`color: hotpink;\`])} />`,
      options: ['object'],
      errors: [
        {
          message: 'Styles should be written using objects.',
          type: 'Literal'
        },
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
