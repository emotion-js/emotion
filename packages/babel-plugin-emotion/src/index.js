// @flow
import syntaxJsx from '@babel/plugin-syntax-jsx'
import {
  createEmotionMacro,
  transformers as vanillaTransformers
} from './emotion-macro'
import { createStyledMacro, styledTransformer } from './styled-macro'
import coreMacro, {
  transformCssCallExpression,
  coreCssTransformer
} from './core-macro'
import {
  getSourceMap,
  getStyledOptions,
  addImport,
  createTransformerMacro
} from './utils'

let webStyledMacro = createStyledMacro({
  importSource: '@emotion/styled/base',
  originalImportSource: '@emotion/styled',
  isWeb: true
})
let nativeStyledMacro = createStyledMacro({
  importSource: '@emotion/native',
  originalImportSource: '@emotion/native',
  isWeb: false
})
let primitivesStyledMacro = createStyledMacro({
  importSource: '@emotion/primitives',
  originalImportSource: '@emotion/primitives',
  isWeb: false
})
let vanillaEmotionMacro = createEmotionMacro('macro')

let transformersSource = {
  emotion: vanillaTransformers,
  '@emotion/core': {
    // this is an empty function because this transformer is never called
    // we don't run any transforms on `jsx` directly
    // instead we use it as a hint to enable css prop optimization
    jsx: () => {},
    css: coreCssTransformer
    // TODO: maybe write transformers for keyframes and Global
  },
  '@emotion/styled': {
    default: [
      styledTransformer,
      { styledBaseImport: ['@emotion/styled/base', 'default'], isWeb: true }
    ]
  },
  '@emotion/primitives': {
    default: [styledTransformer, { isWeb: false }]
  },
  '@emotion/native': {
    default: [styledTransformer, { isWeb: false }]
  }
}

export const macros = {
  core: coreMacro,
  nativeStyled: nativeStyledMacro,
  primitivesStyled: primitivesStyledMacro,
  webStyled: webStyledMacro,
  vanillaEmotion: vanillaEmotionMacro
}

export type BabelPath = any

export type EmotionBabelPluginPass = any

export default function(babel: *) {
  let t = babel.types
  return {
    name: 'emotion',
    inherits: syntaxJsx,
    visitor: {
      ImportDeclaration(path: *, state: *) {
        const macro = state.pluginMacros[path.node.source.value]
        // most of this is from https://github.com/kentcdodds/babel-plugin-macros/blob/master/src/index.js
        if (macro === undefined) {
          return
        }
        if (t.isImportNamespaceSpecifier(path.node.specifiers[0])) {
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

        macro({
          path,
          references: referencePathsByImportName,
          state,
          babel,
          isEmotionCall: true,
          isBabelMacrosCall: true
        })
      },
      Program(path: *, state: *) {
        let macros = {}
        let jsxCoreImports: Array<{
          importSource: string,
          export: string,
          cssExport: string | null
        }> = [
          { importSource: '@emotion/core', export: 'jsx', cssExport: 'css' }
        ]
        state.jsxCoreImport = jsxCoreImports[0]
        Object.keys(state.opts.importMap || {}).forEach(importSource => {
          let value = state.opts.importMap[importSource]
          let transformers = {}
          Object.keys(value).forEach(localExportName => {
            let { canonicalImport, ...options } = value[localExportName]
            let [packageName, exportName] = canonicalImport
            if (packageName === '@emotion/core' && exportName === 'jsx') {
              jsxCoreImports.push({
                importSource,
                export: localExportName,
                cssExport: null
              })
              return
            }
            let packageTransformers = transformersSource[packageName]

            if (packageTransformers === undefined) {
              throw new Error(
                `There is no transformer for the export '${exportName}' in '${packageName}'`
              )
            }

            let [exportTransformer, defaultOptions] =
              // $FlowFixMe
              Array.isArray(packageTransformers[exportName])
                ? packageTransformers[exportName]
                : [packageTransformers[exportName]]

            transformers[localExportName] = [
              exportTransformer,
              { ...defaultOptions, styledBaseImport: undefined, ...options }
            ]
          })
          macros[importSource] = createTransformerMacro(transformers, {
            importSource
          })
        })
        jsxCoreImports.forEach(jsxCoreImport => {
          if (jsxCoreImport.importSource === '@emotion/core') return
          let { transformers } = macros[jsxCoreImport.importSource]
          for (let key in transformers) {
            if (transformers[key][0] === coreCssTransformer) {
              jsxCoreImport.cssExport = key
              return
            }
          }
          throw new Error(
            `You have specified that '${
              jsxCoreImport.importSource
            }' re-exports 'jsx' from '@emotion/core' but it doesn't also re-export 'css' from '@emotion/core', 'css' is necessary for certain optimisations, please re-export it from '${
              jsxCoreImport.importSource
            }'`
          )
        })
        state.pluginMacros = {
          '@emotion/styled': webStyledMacro,
          '@emotion/core': coreMacro,
          '@emotion/primitives': primitivesStyledMacro,
          '@emotion/native': nativeStyledMacro,
          emotion: vanillaEmotionMacro,
          ...macros
        }
        if (state.opts.cssPropOptimization === undefined) {
          for (const node of path.node.body) {
            if (t.isImportDeclaration(node)) {
              let jsxCoreImport = jsxCoreImports.find(
                thing =>
                  node.source.value === thing.importSource &&
                  node.specifiers.some(
                    x =>
                      t.isImportSpecifier(x) && x.imported.name === thing.export
                  )
              )
              if (jsxCoreImport) {
                state.transformCssProp = true
                state.jsxCoreImport = jsxCoreImport
                break
              }
            }
          }
        } else {
          state.transformCssProp = state.opts.cssPropOptimization
        }

        if (state.opts.sourceMap === false) {
          state.emotionSourceMap = false
        } else {
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
          let sourceMap =
            state.emotionSourceMap && path.node.loc !== undefined
              ? getSourceMap(path.node.loc.start, state)
              : ''

          expressionPath.replaceWith(
            t.callExpression(
              // the name of this identifier doesn't really matter at all
              // it'll never appear in generated code
              t.identifier('___shouldNeverAppearCSS'),
              [path.node.value.expression]
            )
          )

          transformCssCallExpression({
            babel,
            state,
            path: expressionPath,
            sourceMap
          })
          if (t.isCallExpression(expressionPath)) {
            expressionPath
              .get('callee')
              .replaceWith(
                addImport(
                  state,
                  state.jsxCoreImport.importSource,
                  state.jsxCoreImport.cssExport,
                  'css'
                )
              )
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
                  path.node.arguments[1] = getStyledOptions(t, path, state)
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
