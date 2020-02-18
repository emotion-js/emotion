import syntaxJsx from '@babel/plugin-syntax-jsx'

const findLast = (arr, predicate) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      return arr[i]
    }
  }
}

const insertImport = (path, declaration) => {
  const last = findLast(path.get('body'), p => p.isImportDeclaration())
  if (last) {
    last.insertAfter(declaration)
  } else {
    // Apparently it's now safe to do this even if Program begins with directives.
    path.unshiftContainer('body', declaration)
  }
}

const createImport = (babel, options) => {
  const t = babel.types
  return t.importDeclaration(
    [
      t.importSpecifier(
        t.identifier(options.import),
        t.identifier(options.export || 'default')
      )
    ],
    t.stringLiteral(options.module)
  )
}

export default function jsxPragmatic(babel) {
  return {
    inherits: syntaxJsx,
    pre: function() {
      if (!(this.opts.module && this.opts.import)) {
        throw new Error(
          '@emotion/babel-plugin-jsx-pragmatic: You must specify `module` and `import`'
        )
      }
      if (
        this.opts.fragment &&
        !(this.opts.fragment.module && this.opts.fragment.import)
      ) {
        throw new Error(
          '@emotion/babel-plugin-jsx-pragmatic: You must specify `fragment.module` and `fragment.import`'
        )
      }
    },
    visitor: {
      Program: {
        exit: function(path, state) {
          if (state.get('jsxDetected')) {
            insertImport(
              path,
              createImport(babel, {
                import: state.opts.import,
                export: state.opts.export,
                module: state.opts.module
              })
            )
          }

          if (
            state.get('jsxFragmentDetected') &&
            state.opts.fragment &&
            !state.get('fragmentImportDetected')
          ) {
            insertImport(path, createImport(babel, state.opts.fragment))
          }
        }
      },

      JSXElement: function(path, state) {
        state.set('jsxDetected', true)
      },
      JSXFragment: function(path, state) {
        state.set('jsxDetected', true)
        state.set('jsxFragmentDetected', true)
      },
      ImportDeclaration: function(path, state) {
        if (state.opts.fragment) {
          if (
            // This looks for imports that already have imported `fragment.import`
            // like `import React from 'react'` or `import * as React from 'react'`.
            path.node.specifiers.find(
              specifier => specifier.local.name === state.opts.fragment.import
            )
          ) {
            state.set('fragmentImportDetected', true)
          }
        }
      }
    }
  }
}
