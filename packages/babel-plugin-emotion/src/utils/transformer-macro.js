// @flow
import { createMacro } from 'babel-plugin-macros'
import { addImport } from './add-import'

type Transformer = Function

export function createTransformerMacro(
  transformers: { [key: string]: Transformer },
  importPath: string,
  options?: any
) {
  return createMacro(({ references, state, babel, isEmotionCall }) => {
    if (!isEmotionCall) {
      state.emotionSourceMap = true
    }
    Object.keys(references).forEach(referenceKey => {
      if (transformers[referenceKey]) {
        references[referenceKey].reverse().forEach(reference => {
          transformers[referenceKey]({
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
