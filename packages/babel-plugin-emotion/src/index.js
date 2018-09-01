// @flow
import { createEmotionMacro } from './macro'
import { createStyledMacro } from './styled-macro'
import cssMacro, { transformCssCallExpression } from './css-macro'
import { addDefault } from '@babel/helper-module-imports'
import { getSourceMap } from '@emotion/babel-utils'
import { buildStyledOptions } from './babel-utils'

let webStyledMacro = createStyledMacro('@emotion/styled-base', true)
let nativeStyledMacro = createStyledMacro('@emotion/native', false)
let primitivesStyledMacro = createStyledMacro('@emotion/primitives', false)

export const macros = {
  emotion: createEmotionMacro('emotion'),
  css: cssMacro,
  styled: webStyledMacro
}

export type BabelPath = any

export type EmotionBabelPluginPass = any

let emotionCoreMacroThatsNotARealMacro = ({ references, state, babel }) => {
  Object.keys(references).forEach(refKey => {
    if (refKey === 'css') {
      references[refKey].forEach(path => {
        transformCssCallExpression({ babel, state, path: path.parentPath })
      })
    }
  })
}
emotionCoreMacroThatsNotARealMacro.keepImport = true

let pluginMacros = {
  '@emotion/css': cssMacro,
  '@emotion/styled': webStyledMacro,
  '@emotion/core': emotionCoreMacroThatsNotARealMacro,
  'react-emotion': webStyledMacro,
  '@emotion/primitives': primitivesStyledMacro,
  '@emotion/native': nativeStyledMacro,
  emotion: createEmotionMacro('emotion')
}

export default function(babel: *) {
  let t = babel.types
  return {
    name: 'emotion',
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      ImportDeclaration(path: *, state: *) {
        // most of this is from https://github.com/kentcdodds/babel-plugin-macros/blob/master/src/index.js
        if (pluginMacros[path.node.source.value] === undefined) {
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

        pluginMacros[path.node.source.value]({
          references: referencePathsByImportName,
          state,
          babel,
          isBabelMacrosCall: true
        })
        if (!pluginMacros[path.node.source.value].keepImport) {
          path.remove()
        }
      },
      Program(path: *, state: *) {
        if (state.opts.jsx === undefined) {
          for (const node of path.node.body) {
            if (
              t.isImportDeclaration(node) &&
              node.source.value === '@emotion/core'
            ) {
              state.transformCssProp = true
              break
            }
          }
        } else {
          state.transformCssProp = state.opts.jsx
        }

        if (state.opts.sourceMap) {
          state.emotionSourceMap = true
        }
      },
      JSXAttribute(path: *, state: *) {
        if (path.node.name.name !== 'css' || !state.transformCssProp) {
          return
        }

        if (
          t.isJSXExpressionContainer(path.node.value) &&
          (t.isObjectExpression(path.node.value.expression) ||
            t.isArrayExpression(path.node.value.expression))
        ) {
          let expressionPath = path.get('value.expression')
          if (expressionPath.isPure()) {
            if (!state.cssIdentifier) {
              state.cssIdentifier = addDefault(path, '@emotion/css', {
                nameHint: 'css'
              })
            }
            expressionPath.replaceWith(
              t.callExpression(
                t.cloneDeep(state.cssIdentifier),
                [
                  path.node.value.expression,
                  state.emotionSourceMap &&
                    path.node.loc !== undefined &&
                    t.stringLiteral(getSourceMap(path.node.loc.start, state))
                ].filter(Boolean)
              )
            )
            transformCssCallExpression({
              babel,
              state,
              path: expressionPath
            })
          }
        }
      },
      CallExpression: {
        exit(path: BabelPath, state: EmotionBabelPluginPass) {
          try {
            if (
              path.node.callee &&
              path.node.callee.property &&
              path.node.callee.property.name === 'withComponent'
            ) {
              switch (path.node.arguments.length) {
                case 1:
                case 2: {
                  path.node.arguments[1] = buildStyledOptions(t, path, state)
                }
              }
            }
          } catch (e) {
            throw path.buildCodeFrameError(e)
          }
        }
      }
    }
  }
}
