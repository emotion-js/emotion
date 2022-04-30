import { AST_NODE_TYPES } from '@typescript-eslint/experimental-utils'
import { createRule, EmotionESLintRule } from '../utils'

export default createRule({
  name: __filename,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Ensure styled is imported from @emotion/styled',
      recommended: false
    },
    fixable: 'code',
    messages: {
      incorrectImport: 'styled should be imported from @emotion/styled'
    },
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
}) as EmotionESLintRule
