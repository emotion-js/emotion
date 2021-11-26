import { createRule } from '../utils'

export default createRule({
  name: __filename,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Ensure vanilla emotion is not using',
      recommended: false
    },
    messages: {
      vanillaEmotion: 'Vanilla emotion should not be used'
    },
    schema: [],
    type: 'problem'
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === '@emotion/css') {
          context.report({
            node: node.source,
            messageId: 'vanillaEmotion'
          })
        }
      }
    }
  }
})
