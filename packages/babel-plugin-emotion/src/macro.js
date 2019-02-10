// @flow
import {
  transformExpressionWithStyles,
  addImport,
  createTransformerMacro
} from './utils'

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
  createTransformerMacro(transformers, instancePath)
