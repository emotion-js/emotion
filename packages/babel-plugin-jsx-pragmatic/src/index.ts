import type {
  NodePath,
  PluginObj,
  PluginPass as BabelPluginPass,
  types as BabelTypes
} from '@babel/core'
import syntaxJsx from '@babel/plugin-syntax-jsx'

const findLast = <T>(arr: T[], predicate: (item: T) => boolean): T | null => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      return arr[i]
    }
  }

  return null
}

// todo: PR these to @types/babel__core - PluginPass should extend Store
// https://github.com/babel/babel/blob/4e50b2d9d9c376cee7a2cbf56553fe5b982ea53c/packages/babel-core/src/transformation/store.js
interface BabelStore {
  setDynamic(key: string, fn: () => unknown): void
  set(key: string, val: unknown): void
  get(key: string): unknown
}

type PluginPass = BabelPluginPass &
  BabelStore & {
    opts: {
      module: string
      import: string
      export?: string
    }
  }

export default function jsxPragmatic(babel: {
  types: typeof BabelTypes
}): PluginObj<PluginPass> {
  const t = babel.types

  function addPragmaImport(
    path: NodePath<BabelTypes.Program>,
    state: PluginPass
  ) {
    const importDeclar = t.importDeclaration(
      [
        t.importSpecifier(
          t.identifier(state.opts.import),
          t.identifier(state.opts.export || 'default')
        )
      ],
      t.stringLiteral(state.opts.module)
    )

    const targetPath = findLast(path.get('body'), p => p.isImportDeclaration())

    if (targetPath) {
      targetPath.insertAfter([importDeclar])
    } else {
      // Apparently it's now safe to do this even if Program begins with directives.
      path.unshiftContainer('body', importDeclar)
    }
  }

  return {
    inherits: syntaxJsx,
    pre: function () {
      if (!(this.opts.module && this.opts.import)) {
        throw new Error(
          '@emotion/babel-plugin-jsx-pragmatic: You must specify `module` and `import`'
        )
      }
    },
    visitor: {
      Program: {
        exit: function (path, state) {
          if (!state.get('jsxDetected')) return
          addPragmaImport(path, state)
        }
      },

      JSXElement: function (path, state) {
        state.set('jsxDetected', true)
      },
      JSXFragment: function (path, state) {
        state.set('jsxDetected', true)
      }
    }
  }
}
