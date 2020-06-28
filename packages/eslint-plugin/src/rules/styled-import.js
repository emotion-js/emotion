export default {
  meta: {
    fixable: 'code'
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === 'react-emotion') {
          let newImportPath = '@emotion/styled'
          context.report({
            node: node.source,
            message: `styled should be imported from @emotion/styled`,
            fix:
              node.specifiers.length === 1 &&
              node.specifiers[0].type === 'ImportDefaultSpecifier'
                ? fixer => {
                    return fixer.replaceText(node.source, `'${newImportPath}'`)
                  }
                : undefined
          })
        }
      }
    }
  }
}
