import {
  importDeclaration,
  importDefaultSpecifier,
  literal
} from 'eslint-codemod-utils'

export default {
  meta: {
    fixable: 'code'
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          node.source.value === 'react-emotion' &&
          node.specifiers.some(x => x.type !== 'ImportDefaultSpecifier')
        ) {
          context.report({
            node: node.source,
            message: `emotion's exports should be imported directly from emotion rather than from react-emotion`,
            fix(fixer) {
              if (node.specifiers[0].type === 'ImportNamespaceSpecifier') {
                return
              }
              const source = literal({ value: 'emotion' })
              // default specifiers are always first
              if (node.specifiers[0].type === 'ImportDefaultSpecifier') {
                return [
                  fixer.insertTextBefore(
                    node,
                    importDeclaration({
                      ...node,
                      specifiers: [importDefaultSpecifier(node.specifiers[0])],
                      source: literal({ value: '@emotion/styled' })
                    }).toString() + '\n'
                  ),
                  fixer.replaceText(
                    node,
                    importDeclaration({
                      ...node,
                      specifiers: node.specifiers.filter(
                        node => node.type === 'ImportSpecifier'
                      ),
                      source
                    }).toString()
                  )
                ]
              }
              return fixer.replaceText(
                node,
                importDeclaration({ ...node, source }).toString()
              )
            }
          })
        }
      }
    }
  }
}
