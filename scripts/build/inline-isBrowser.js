let createMacros = babel => {
  let t = babel.types
  let replaceWithBoolean = bool => ({ references }) => {
    references.forEach(references => {
      references.replaceWith(t.booleanLiteral(bool))
    })
  }
  return {
    '@emotion/utils': {
      isBrowser: replaceWithBoolean(true),
      shouldSerializeToReactTree: replaceWithBoolean(false)
    }
  }
}

module.exports = babel => {
  let macros = createMacros(babel)
  return {
    name: 'inline-isBrowser',
    visitor: {
      ImportDeclaration(path, state) {
        if (macros[path.node.source.value] === undefined) {
          return
        }

        path.node.specifiers = path.node.specifiers.filter(specifier => {
          let localName = specifier.local.name
          let importedName =
            specifier.type === 'ImportDefaultSpecifier'
              ? 'default'
              : specifier.imported.name
          if (!macros[path.node.source.value][importedName]) {
            return true
          }
          let binding = path.scope.getBinding(localName)
          if (!binding) {
            return true
          }

          if (binding.referencePaths.length) {
            macros[path.node.source.value][importedName]({
              references: binding.referencePaths,
              state,
              babel
            })
          }
          return false
        })

        if (!path.node.specifiers.length) {
          path.remove()
        }
      }
    }
  }
}
