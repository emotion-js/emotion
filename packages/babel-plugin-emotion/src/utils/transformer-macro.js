// @flow
import { createMacro } from 'babel-plugin-macros'
import { addImport } from './add-import'

type Transformer = Function

export function createTransformerMacro(
  transformers: { [key: string]: Transformer | [Transformer, Object] },
  importPath: string
) {
  let macro = createMacro(({ references, state, babel, isEmotionCall }) => {
    if (!isEmotionCall) {
      state.emotionSourceMap = true
    }
    Object.keys(references).forEach(importSpecifierName => {
      if (transformers[importSpecifierName]) {
        references[importSpecifierName].reverse().forEach(reference => {
          let options
          let transformer
          if (Array.isArray(transformers[importSpecifierName])) {
            transformer = transformers[importSpecifierName][0]
            options = transformers[importSpecifierName][1]
          } else {
            transformer = transformers[importSpecifierName]
            options = {}
          }
          transformer({
            state,
            babel,
            importPath,
            options,
            reference,
            importSpecifierName
          })
        })
      } else {
        references[importSpecifierName].reverse().forEach(reference => {
          reference.replaceWith(
            addImport(state, importPath, importSpecifierName, reference.name)
          )
        })
      }
    })
  })
  macro.transformers = transformers
  return macro
}
