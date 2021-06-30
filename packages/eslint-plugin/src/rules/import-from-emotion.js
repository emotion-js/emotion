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
              // default specifiers are always first
              if (node.specifiers[0].type === 'ImportDefaultSpecifier') {
                return fixer.replaceText(
                  node,
                  `import ${
                    node.specifiers[0].local.name
                  } from '@emotion/styled';\nimport { ${node.specifiers
                    .filter(x => x.type === 'ImportSpecifier')
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
}
