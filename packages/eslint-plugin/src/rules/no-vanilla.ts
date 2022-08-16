import { createRule } from '../utils'

const messages = {
  vanillaEmotion: 'Vanilla emotion should not be used'
}

export default createRule<never[], keyof typeof messages>({
  name: __filename,
  meta: {
    docs: {
      description: 'Ensure vanilla emotion is not used',
      recommended: false
    },
    messages,
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
