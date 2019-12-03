/**
 * @fileoverview Choose between string or object syntax
 * @author alex-pex
 */

function isStringStyle(node) {
  if (node.type === 'TaggedTemplateExpression') {
    // shorthand notation
    // eg: styled.h1` color: red; `
    if (
      node.tag.type === 'MemberExpression' &&
      node.tag.object.name === 'styled'
    ) {
      // string syntax used
      return true
    }

    // full notation
    // eg: styled('h1')` color: red; `
    if (
      node.tag.type === 'CallExpression' &&
      node.tag.callee.name === 'styled'
    ) {
      // string syntax used
      return true
    }
  }

  return false
}

function isObjectStyle(node) {
  if (node.type === 'CallExpression') {
    // shorthand notation
    // eg: styled.h1({ color: 'red' })
    if (
      node.callee.type === 'MemberExpression' &&
      node.callee.object.name === 'styled'
    ) {
      // object syntax used
      return true
    }

    // full notation
    // eg: styled('h1')({ color: 'red' })
    if (
      node.callee.type === 'CallExpression' &&
      node.callee.callee.name === 'styled'
    ) {
      // object syntax used
      return true
    }
  }

  return false
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const MSG_PREFER_STRING_STYLE = 'Styles should be written using strings.'
const MSG_PREFER_OBJECT_STYLE = 'Styles should be written using objects.'

export default {
  meta: {
    docs: {
      description: 'Choose between string or object styles',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      {
        enum: ['string', 'object']
      }
    ]
  },

  create(context) {
    return {
      TaggedTemplateExpression(node) {
        const preferedSyntax = context.options[0]

        if (isStringStyle(node) && preferedSyntax === 'object') {
          context.report({
            node,
            message: MSG_PREFER_OBJECT_STYLE
          })
        }
      },

      CallExpression(node) {
        const preferedSyntax = context.options[0]

        if (isObjectStyle(node) && preferedSyntax === 'string') {
          context.report({
            node,
            message: MSG_PREFER_STRING_STYLE
          })
        }
      }
    }
  }
}
