import syntaxJsx from '@babel/plugin-syntax-jsx'

export default function jsxPragmatic(babel) {
  const t = babel.types
  function getPragmaImport(state) {
    return t.importDeclaration(
      [
        t.importSpecifier(
          t.identifier(state.opts.import),
          t.identifier(state.opts.export || 'default')
        )
      ],
      t.stringLiteral(state.opts.module)
    )
  }

  return {
    inherits: syntaxJsx,
    pre: function() {
      if (!(this.opts.module && this.opts.import)) {
        throw new Error(
          '@emotion/babel-plugin-jsx-pragmatic: You must specify `module` and `import`'
        )
      }
    },
    visitor: {
      Program: {
        exit: function(path, state) {
          if (!state.get('jsxDetected')) return

          // Apparently it's now safe to do this even if Program begins with
          // directives.
          path.unshiftContainer('body', getPragmaImport(state))
        }
      },

      // jsx components with a prop called 'css'
      JSXIdentifier: function(path, state) {
        if (
          path.node.name === 'css' &&
          path.parentPath &&
          t.isJSXAttribute(path.parentPath.node)
        ) {
          state.set('jsxDetected', true)
        }
      }
    }
  }
}
