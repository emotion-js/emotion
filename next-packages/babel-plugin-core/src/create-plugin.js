// @flow
// most of this is from https://github.com/kentcdodds/babel-plugin-macros/blob/master/src/index.js

type Macros = {
  [path: string]: ({ references: *, state: *, babel: * }) => mixed
}

export const createPlugin = (
  macros: Macros,
  customVisitor: (babel: *) => Object
) => (babel: *) => {
  return {
    name: '@emotion/babel-plugin-core',
    visitor: {
      ImportDeclaration(path: *, state: *) {
        if (macros[path.node.source.value] === undefined) {
          return
        }
        const imports = path.node.specifiers.map(s => ({
          localName: s.local.name,
          importedName:
            s.type === 'ImportDefaultSpecifier' ? 'default' : s.imported.name
        }))
        let shouldExit = false
        let hasReferences = false
        const referencePathsByImportName = imports.reduce(
          (byName, { importedName, localName }) => {
            let binding = path.scope.getBinding(localName)
            if (!binding) {
              shouldExit = true
              return byName
            }
            byName[importedName] = binding.referencePaths
            hasReferences =
              hasReferences || Boolean(byName[importedName].length)
            return byName
          },
          {}
        )
        if (!hasReferences || shouldExit) {
          return
        }
        /**
         * Other plugins that run before babel-plugin-macros might use path.replace, where a path is
         * put into its own replacement. Apparently babel does not update the scope after such
         * an operation. As a remedy, the whole scope is traversed again with an empty "Identifier"
         * visitor - this makes the problem go away.
         *
         * See: https://github.com/kentcdodds/import-all.macro/issues/7
         */
        state.file.scope.path.traverse({
          Identifier() {}
        })

        macros[path.node.source.value]({
          references: referencePathsByImportName,
          state,
          babel,
          isBabelMacrosCall: true
        })
        if (!macros[path.node.source.value].keepImport) {
          path.remove()
        }
      },
      ...customVisitor(babel)
    }
  }
}
