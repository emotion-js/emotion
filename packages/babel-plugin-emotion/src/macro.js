// @flow
import {
  transformExpressionWithStyles,
  addImport,
  createTransformerMacro
} from './utils'

let createEmotionTransformer = (isPure: boolean) => ({
  state,
  babel,
  importPath,
  reference,
  importSpecifierName
}: Object) => {
  const path = reference.parentPath

  reference.replaceWith(addImport(state, importPath, importSpecifierName))
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
  css: createEmotionTransformer(true),
  injectGlobal: createEmotionTransformer(false),
  keyframes: createEmotionTransformer(true)
}

export let createEmotionMacro = (instancePath: string) =>
  createTransformerMacro(transformers, instancePath)
