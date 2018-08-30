// @flow
import { transformExpressionWithStyles } from '@emotion/babel-utils'
import { buildMacroRuntimeNode, addRuntimeImports } from './babel-utils'
import { createMacro } from 'babel-plugin-macros'

export default createMacro(macro)

function macro({ references, state, babel }) {
  let t = babel.types
  Object.keys(references).forEach(referenceKey => {
    let isPure = true
    switch (referenceKey) {
      case 'injectGlobal': {
        isPure = false
      }
      // eslint-disable-next-line no-fallthrough
      case 'css':
      case 'keyframes': {
        references[referenceKey].reverse().forEach(reference => {
          const path = reference.parentPath
          const runtimeNode = buildMacroRuntimeNode(
            reference,
            state,
            referenceKey,
            t
          )
          reference.replaceWith(runtimeNode)
          if (isPure) {
            path.addComment('leading', '#__PURE__')
          }
          transformExpressionWithStyles({
            babel,
            state,
            path,
            shouldLabel: state.opts.autoLabel
          })
        })
        break
      }
      default: {
        references[referenceKey].reverse().forEach(reference => {
          reference.replaceWith(
            buildMacroRuntimeNode(reference, state, referenceKey, t)
          )
        })
      }
    }
  })
  addRuntimeImports(state, t)
}
