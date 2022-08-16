import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils'
import { createRule } from '../utils'

const messages = {
  incorrectImport: `emotion's exports should be imported directly from emotion rather than from react-emotion`
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
        if (
          node.source.value === 'react-emotion' &&
          node.specifiers.some(
            x => x.type !== AST_NODE_TYPES.ImportDefaultSpecifier
          )
        ) {
          context.report({
            node: node.source,
            messageId: 'incorrectImport',
            fix(fixer) {
              if (
                node.specifiers[0].type ===
                AST_NODE_TYPES.ImportNamespaceSpecifier
              ) {
                return null
              }
              // default specifiers are always first
              if (
                node.specifiers[0].type ===
                AST_NODE_TYPES.ImportDefaultSpecifier
              ) {
                return fixer.replaceText(
                  node,
                  `import ${
                    node.specifiers[0].local.name
                  } from '@emotion/styled';\nimport { ${node.specifiers
                    .filter(
                      (x): x is TSESTree.ImportSpecifier =>
                        x.type === AST_NODE_TYPES.ImportSpecifier
                    )
                    .map(x =>
                      x.local.name === x.imported.name
                        ? x.local.name
                        : `${x.imported.name} as ${x.local.name}`
                    )
                    .join(', ')} } from 'emotion';`
                )
              }
              return fixer.replaceText(node.source, "'emotion'")
            }
          })
        }
      }
    }
  }
})
