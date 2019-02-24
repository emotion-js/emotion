// @flow
import { createMacro } from 'babel-plugin-macros'
import { addImport } from './add-import'

type Transformer = Function

export function createTransformerMacro(
  transformers: { [key: string]: Transformer | [Transformer, Object] },
  importPath: string
) {
  return createMacro(({ references, state, babel, isEmotionCall }) => {
    if (!isEmotionCall) {
      state.emotionSourceMap = true
    }
    Object.keys(references).forEach(referenceKey => {
      if (transformers[referenceKey]) {
        references[referenceKey].reverse().forEach(reference => {
          let options
          let transformer
          if (Array.isArray(transformers[referenceKey])) {
            transformer = transformers[referenceKey][0]
            options = transformers[referenceKey][1]
          } else {
            transformer = transformers[referenceKey]
            options = {}
          }
          transformer({
            state,
            babel,
            importPath,
            options,
            reference
          })
        })
      } else {
        references[referenceKey].reverse().forEach(reference => {
          reference.replaceWith(
            addImport(state, importPath, referenceKey, reference.name)
          )
        })
      }
    })
  })
}
