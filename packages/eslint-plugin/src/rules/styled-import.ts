import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule } from '../utils'

const messages = {
  incorrectImport: 'styled should be imported from @emotion/styled'
}

export default createRule<never[], keyof typeof messages>({
  name: __filename,
  meta: {
    docs: {
      description: 'Ensure styled is imported from @emotion/styled',
      recommended: false
    },
    fixable: 'code',
    messages,
    schema: [],
    type: 'problem'
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === 'react-emotion') {
          let newImportPath = '@emotion/styled'
          context.report({
            node: node.source,
            messageId: 'incorrectImport',
            fix:
              node.specifiers.length === 1 &&
              node.specifiers[0].type === AST_NODE_TYPES.ImportDefaultSpecifier
                ? fixer => {
                    return fixer.replaceText(node.source, `'${newImportPath}'`)
                  }
                : undefined
          })
        }
      }
    }
  }
})
