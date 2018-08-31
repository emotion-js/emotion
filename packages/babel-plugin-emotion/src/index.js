// @flow
import { createEmotionMacro } from './macro'
import { createStyledMacro } from './styled-macro'
import cssMacro, { transformCssCallExpression } from './css-macro'
import { createPlugin } from './create-plugin'
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

export default createPlugin(
  {
    '@emotion/css': cssMacro,
    '@emotion/styled': webStyledMacro,
    '@emotion/core': emotionCoreMacroThatsNotARealMacro,
    'react-emotion': webStyledMacro,
    '@emotion/primitives': primitivesStyledMacro,
    '@emotion/native': nativeStyledMacro,
    emotion: createEmotionMacro('emotion')
  },
  babel => {
    let t = babel.types
    return {
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
)
