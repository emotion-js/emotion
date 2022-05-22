import { AST_NODE_TYPES, TSESLint, TSESTree } from '@typescript-eslint/utils'
import { createRule } from '../utils'

/**
 * @fileoverview Choose between string or object syntax
 * @author alex-pex
 */

function isStringStyle(node: TSESTree.TaggedTemplateExpression) {
  if (node.tag.type === AST_NODE_TYPES.Identifier && node.tag.name === 'css') {
    return true
  }
  // shorthand notation
  // eg: styled.h1` color: red; `
  if (
    node.tag.type === AST_NODE_TYPES.MemberExpression &&
    node.tag.object.type === AST_NODE_TYPES.Identifier &&
    node.tag.object.name === 'styled'
  ) {
    // string syntax used
    return true
  }

  // full notation
  // eg: styled('h1')` color: red; `
  if (
    node.tag.type === AST_NODE_TYPES.CallExpression &&
    node.tag.callee.type === AST_NODE_TYPES.Identifier &&
    node.tag.callee.name === 'styled'
  ) {
    // string syntax used
    return true
  }

  return false
}

function isObjectStyle(node: TSESTree.CallExpression) {
  if (
    node.callee.type === AST_NODE_TYPES.Identifier &&
    node.callee.name === 'css'
  ) {
    return true
  }

  // shorthand notation
  // eg: styled.h1({ color: 'red' })
  if (
    node.callee.type === AST_NODE_TYPES.MemberExpression &&
    node.callee.object.type === AST_NODE_TYPES.Identifier &&
    node.callee.object.name === 'styled'
  ) {
    // object syntax used
    return true
  }

  // full notation
  // eg: styled('h1')({ color: 'red' })
  if (
    node.callee.type === AST_NODE_TYPES.CallExpression &&
    node.callee.callee.type === AST_NODE_TYPES.Identifier &&
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

const checkExpressionPreferringObject = (
  context: RuleContext,
  node: TSESTree.Node
) => {
  switch (node.type) {
    case AST_NODE_TYPES.ArrayExpression:
      node.elements.forEach(element =>
        checkExpressionPreferringObject(context, element)
      )
      return
    case AST_NODE_TYPES.TemplateLiteral:
      context.report({
        node,
        messageId: 'preferObjectStyle'
      })
      return
    case AST_NODE_TYPES.Literal:
      // validating other literal types seems out of scope of this plugin
      if (typeof node.value !== 'string') {
        return
      }
      context.report({
        node,
        messageId: 'preferObjectStyle'
      })
  }
}

const createPreferredObjectVisitor = (
  context: RuleContext
): TSESLint.RuleListener => ({
  TaggedTemplateExpression(node) {
    if (isStringStyle(node)) {
      context.report({
        node,
        messageId: 'preferObjectStyle'
      })
    }
  },
  CallExpression(node) {
    if (isObjectStyle(node)) {
      node.arguments.forEach(argument =>
        checkExpressionPreferringObject(context, argument)
      )
    }
  },
  JSXAttribute(node) {
    if (node.name.name !== 'css') {
      return
    }

    if (!node.value) {
      context.report({
        node: node,
        messageId: 'emptyCssProp'
      })
      return
    }

    switch (node.value.type) {
      case AST_NODE_TYPES.Literal:
        // validating other literal types seems out of scope of this plugin
        if (typeof node.value.value !== 'string') {
          return
        }
        context.report({
          node: node.value,
          messageId: 'preferObjectStyle'
        })
        return
      case AST_NODE_TYPES.JSXExpressionContainer:
        checkExpressionPreferringObject(context, node.value.expression)
    }
  }
})

const checkExpressionPreferringString = (
  context: RuleContext,
  node: TSESTree.Node
) => {
  switch (node.type) {
    case 'ArrayExpression':
      node.elements.forEach(element =>
        checkExpressionPreferringString(context, element)
      )
      return
    case 'ObjectExpression':
      context.report({
        node,
        messageId: 'preferStringStyle'
      })
      return
    case 'Literal':
      // validating other literal types seems out of scope of this plugin
      if (typeof node.value !== 'string') {
        return
      }
      context.report({
        node,
        messageId: 'preferWrappingWithCSS'
      })
  }
}

const createPreferredStringVisitor = (
  context: RuleContext
): TSESLint.RuleListener => ({
  CallExpression(node) {
    if (isObjectStyle(node)) {
      node.arguments.forEach(argument =>
        checkExpressionPreferringString(context, argument)
      )
    }
  },

  JSXAttribute(node) {
    if (node.name.name !== 'css') {
      return
    }

    if (!node.value) {
      context.report({
        node: node,
        messageId: 'emptyCssProp'
      })
      return
    }

    switch (node.value.type) {
      case AST_NODE_TYPES.Literal:
        // validating other literal types seems out of scope of this plugin
        if (typeof node.value.value !== 'string') {
          return
        }
        context.report({
          node: node.value,
          messageId: 'preferWrappingWithCSS'
        })
        return
      case AST_NODE_TYPES.JSXExpressionContainer:
        checkExpressionPreferringString(context, node.value.expression)
    }
  }
})

type RuleOptions = [('string' | 'object')?]

type MessageId =
  | 'preferStringStyle'
  | 'preferObjectStyle'
  | 'preferWrappingWithCSS'
  | 'emptyCssProp'

type RuleContext = TSESLint.RuleContext<MessageId, RuleOptions>

export default createRule<RuleOptions, MessageId>({
  name: __filename,
  meta: {
    docs: {
      description: 'Choose between styles written as strings or objects',
      recommended: false
    },
    messages: {
      preferStringStyle: 'Styles should be written using strings.',
      preferObjectStyle: 'Styles should be written using objects.',
      preferWrappingWithCSS: `Prefer wrapping your string styles with \`css\` call.`,
      emptyCssProp: `Empty \`css\` prop is not valid.`
    },
    schema: [
      {
        enum: ['string', 'object']
      }
    ],
    type: 'problem'
  },
  defaultOptions: [],
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
})
