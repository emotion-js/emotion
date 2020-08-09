/**
 * @fileoverview Choose between string or object syntax
 * @author alex-pex
 */

function isStringStyle(node) {
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
  if (node.tag.type === 'CallExpression' && node.tag.callee.name === 'styled') {
    // string syntax used
    return true
  }

  return false
}

function isObjectStyle(node) {
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

  return false
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const MSG_PREFER_STRING_STYLE = 'Styles should be written using strings.'
const MSG_PREFER_OBJECT_STYLE = 'Styles should be written using objects.'
const MSG_PREFER_WRAPPING_WITH_CSS =
  'Prefer wrapping your string styles with `css` call.'

const checkCssPropExpressionPreferringObject = (context, node) => {
  switch (node.type) {
    case 'ArrayExpression':
      node.elements.forEach(element =>
        checkCssPropExpressionPreferringObject(context, element)
      )
      return
    case 'CallExpression':
      context.report({
        node,
        message: MSG_PREFER_OBJECT_STYLE
      })
      return
    case 'TaggedTemplateExpression':
      context.report({
        node,
        message: MSG_PREFER_OBJECT_STYLE
      })
      return
    case 'Literal':
      // validating other literal types seems out of scope of this plugin
      if (typeof node.value !== 'string') {
        return
      }
      context.report({
        node,
        message: MSG_PREFER_OBJECT_STYLE
      })
  }
}

const createPreferredObjectVisitor = context => ({
  TaggedTemplateExpression(node) {
    if (isStringStyle(node)) {
      context.report({
        node,
        message: MSG_PREFER_OBJECT_STYLE
      })
    }
  },
  JSXAttribute(node) {
    if (node.name.name !== 'css') {
      return
    }

    switch (node.value.type) {
      case 'Literal':
        // validating other literal types seems out of scope of this plugin
        if (typeof node.value.value !== 'string') {
          return
        }
        context.report({
          node: node.value,
          message: MSG_PREFER_OBJECT_STYLE
        })
        return
      case 'JSXExpressionContainer':
        checkCssPropExpressionPreferringObject(context, node.value.expression)
    }
  }
})

const checkCssPropExpressionPreferringString = (context, node) => {
  switch (node.type) {
    case 'ArrayExpression':
      node.elements.forEach(element =>
        checkCssPropExpressionPreferringString(context, element)
      )
      return
    case 'ObjectExpression':
      context.report({
        node,
        message: MSG_PREFER_STRING_STYLE
      })
      return
    case 'Literal':
      // validating other literal types seems out of scope of this plugin
      if (typeof node.value !== 'string') {
        return
      }
      context.report({
        node,
        message: MSG_PREFER_WRAPPING_WITH_CSS
      })
  }
}

const createPreferredStringVisitor = context => ({
  CallExpression(node) {
    if (isObjectStyle(node)) {
      context.report({
        node,
        message: MSG_PREFER_STRING_STYLE
      })
    }
  },

  JSXAttribute(node) {
    if (node.name.name !== 'css') {
      return
    }

    switch (node.value.type) {
      case 'Literal':
        // validating other literal types seems out of scope of this plugin
        if (typeof node.value.value !== 'string') {
          return
        }
        context.report({
          node: node.value,
          message: MSG_PREFER_WRAPPING_WITH_CSS
        })
        return
      case 'JSXExpressionContainer':
        checkCssPropExpressionPreferringString(context, node.value.expression)
    }
  }
})

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
    const preferredSyntax = context.options[0]

    switch (preferredSyntax) {
      case 'object':
        return createPreferredObjectVisitor(context)
      case 'string':
        return createPreferredStringVisitor(context)
      default:
        return {}
    }
  }
}
