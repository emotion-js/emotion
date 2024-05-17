/**
 * @fileoverview Choose between string or object syntax
 * @author alex-pex
 * @jest-environment node
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import { AST_NODE_TYPES, TSESLint } from '@typescript-eslint/utils'
import rule from '../../src/rules/syntax-preference'
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

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

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
          messageId: 'preferStringStyle',
          type: AST_NODE_TYPES.ObjectExpression
        }
      ]
    },
    {
      code: "const H1 = styled('h1')({ color: 'red' })",
      options: ['string'],
      errors: [
        {
          messageId: 'preferStringStyle',
          type: AST_NODE_TYPES.ObjectExpression
        }
      ]
    },
    {
      code: `const Foo = () => <div css={{ color: 'hotpink' }} />`,
      options: ['string'],
      errors: [
        {
          messageId: 'preferStringStyle',
          type: AST_NODE_TYPES.ObjectExpression
        }
      ]
    },
    {
      code: `const Foo = () => <div css={'color: hotpink;'} />`,
      options: ['string'],
      errors: [
        {
          messageId: 'preferWrappingWithCSS',
          type: AST_NODE_TYPES.Literal
        }
      ]
    },
    {
      code: `const Foo = () => <div css="'color: hotpink;'" />`,
      options: ['string'],
      errors: [
        {
          messageId: 'preferWrappingWithCSS',
          type: AST_NODE_TYPES.Literal
        }
      ]
    },
    {
      code: `const Foo = () => <div css={['background-color: green;', { color: 'hotpink' }]} />`,
      options: ['string'],
      errors: [
        {
          messageId: 'preferWrappingWithCSS',
          type: AST_NODE_TYPES.Literal
        },
        {
          messageId: 'preferStringStyle',
          type: AST_NODE_TYPES.ObjectExpression
        }
      ]
    },
    {
      code: `css(cls, { color: 'hotpink' })`,
      options: ['string'],
      errors: [
        {
          messageId: 'preferStringStyle',
          type: AST_NODE_TYPES.ObjectExpression
        }
      ]
    },
    {
      code: `const Foo = () => <div css />`,
      options: ['string'],
      errors: [
        {
          messageId: 'emptyCssProp',
          type: AST_NODE_TYPES.JSXAttribute
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
          messageId: 'preferObjectStyle',
          type: AST_NODE_TYPES.TaggedTemplateExpression
        }
      ]
    },
    {
      code: "const H1 = styled('h1')` color: red; `",
      options: ['object'],
      errors: [
        {
          messageId: 'preferObjectStyle',
          type: AST_NODE_TYPES.TaggedTemplateExpression
        }
      ]
    },
    {
      code: `const Foo = () => <div css={css\`color: hotpink;\`} />`,
      options: ['object'],
      errors: [
        {
          messageId: 'preferObjectStyle',
          type: AST_NODE_TYPES.TaggedTemplateExpression
        }
      ]
    },
    {
      code: `const Foo = () => <div css={'color: hotpink;'} />`,
      options: ['object'],
      errors: [
        {
          messageId: 'preferObjectStyle',
          type: AST_NODE_TYPES.Literal
        }
      ]
    },
    {
      code: `const Foo = () => <div css="color: hotpink;" />`,
      options: ['object'],
      errors: [
        {
          messageId: 'preferObjectStyle',
          type: AST_NODE_TYPES.Literal
        }
      ]
    },
    {
      code: `const Foo = () => <div css={['background-color: green;', css\`color: hotpink;\`]} />`,
      options: ['object'],
      errors: [
        {
          messageId: 'preferObjectStyle',
          type: AST_NODE_TYPES.Literal
        },
        {
          messageId: 'preferObjectStyle',
          type: AST_NODE_TYPES.TaggedTemplateExpression
        }
      ]
    },
    {
      code: `const Foo = () => <div css={css(['background-color: green;', css\`color: hotpink;\`])} />`,
      options: ['object'],
      errors: [
        {
          messageId: 'preferObjectStyle',
          type: AST_NODE_TYPES.Literal
        },
        {
          messageId: 'preferObjectStyle',
          type: AST_NODE_TYPES.TaggedTemplateExpression
        }
      ]
    },
    {
      code: `const Foo = () => <div css />`,
      options: ['object'],
      errors: [
        {
          messageId: 'emptyCssProp',
          type: AST_NODE_TYPES.JSXAttribute
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
