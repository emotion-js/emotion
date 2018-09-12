module.exports = {
  meta: {
    fixable: 'code'
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          (node.source.value === 'react-emotion' ||
            node.source.value === 'preact-emotion') &&
          node.specifiers.some(x => x.type !== 'ImportDefaultSpecifier')
        ) {
          let quote = node.source.raw.charAt(0)
          context.report({
            node: node.source,
            message: `emotion's exports should be imported directly from emotion rather than from ${
              node.source.value
            }`,
            fix(fixer) {
              // default specifiers are always first
              if (node.specifiers[0].type === 'ImportDefaultSpecifier') {
                return
              }
              return fixer.replaceText(node.source, quote + 'emotion' + quote)
            }
          })
        }
      }
    }
  }
}
