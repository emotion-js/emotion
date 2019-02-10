// @flow
import { transformExpressionWithStyles, addImport } from './utils'
import { createMacro } from 'babel-plugin-macros'

let createEmotionTransformer = (imported: string, isPure: boolean) => ({
  state,
  babel,
  importPath,
  reference
}: Object) => {
  const path = reference.parentPath

  reference.replaceWith(addImport(state, importPath, imported))
  if (isPure) {
    path.addComment('leading', '#__PURE__')
  }
  let { node } = transformExpressionWithStyles({
    babel,
    state,
    path,
    shouldLabel: true
  })
  if (node) {
    path.node.arguments[0] = node
  }
}

export let transformers = {
  css: createEmotionTransformer('css', true),
  injectGlobal: createEmotionTransformer('injectGlobal', false),
  keyframes: createEmotionTransformer('keyframes', true)
}

export let createEmotionMacro = (instancePath: string) =>
  createMacro(function macro({ references, state, babel, isEmotionCall }) {
    if (!isEmotionCall) {
      state.emotionSourceMap = true
    }

    Object.keys(references).forEach(referenceKey => {
      if (transformers[referenceKey]) {
        references[referenceKey].reverse().forEach(reference => {
          transformers[referenceKey]({
            state,
            babel,
            reference,
            importPath: instancePath
          })
        })
      } else {
        references[referenceKey].reverse().forEach(reference => {
          reference.replaceWith(addImport(state, instancePath, referenceKey))
        })
      }
    })
  })
