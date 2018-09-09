module.exports = {
  meta: {
    fixable: 'code'
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          node.source.value === 'react-emotion' ||
          node.source.value === 'preact-emotion'
        ) {
          let newImportPath =
            node.source.value === 'react-emotion'
              ? '@emotion/styled'
              : '@emotion/preact-styled'
          let quote = node.source.raw.charAt(0)
          context.report({
            node: node.source,
            message: `styled should be imported from ${newImportPath}`,
            fix:
              node.specifiers.length === 1 &&
              node.specifiers[0].type === 'ImportDefaultSpecifier'
                ? fixer => {
                    return fixer.replaceText(
                      node.source,
                      quote + newImportPath + quote
                    )
                  }
                : undefined
          })
        }
      }
    }
  }
}
