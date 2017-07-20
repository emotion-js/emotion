import { replaceCssWithCallExpression } from './babel'
import { buildMacroRuntimeNode, addRuntimeImports } from './babel-utils'
import { fontFace } from './inline'
import { forEach } from './utils'
import { keys } from './utils'

module.exports = function macro ({ references, state, babel: { types: t } }) {
  if (!state.inline) state.inline = true
  forEach(keys(references), referenceKey => {
    if (referenceKey === 'injectGlobal') {
      references.injectGlobal.forEach(injectGlobalReference => {
        const path = injectGlobalReference.parentPath
        if (
          t.isIdentifier(path.node.tag) &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          replaceCssWithCallExpression(
            path,
            buildMacroRuntimeNode(
              injectGlobalReference,
              state,
              'injectGlobal',
              t
            ),
            state,
            t
          )
        }
      })
    } else if (referenceKey === 'fontFace') {
      references.fontFace.forEach(fontFaceReference => {
        const path = fontFaceReference.parentPath
        if (
          t.isIdentifier(path.node.tag) &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          replaceCssWithCallExpression(
            path,
            buildMacroRuntimeNode(fontFaceReference, state, 'fontFace', t),
            state,
            t
          )
        }
      })
    } else if (referenceKey === 'css') {
      references.css.forEach(cssReference => {
        const path = cssReference.parentPath
        const runtimeNode = buildMacroRuntimeNode(cssReference, state, 'css', t)
        if (
          t.isIdentifier(path.node.tag) &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          replaceCssWithCallExpression(path, runtimeNode, state, t)
        } else {
          cssReference.replaceWith(runtimeNode)
        }
      })
    } else if (referenceKey === 'keyframes') {
      references.keyframes.forEach(keyframesReference => {
        const path = keyframesReference.parentPath
        if (
          t.isIdentifier(path.node.tag) &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          replaceCssWithCallExpression(
            path,
            buildMacroRuntimeNode(keyframesReference, state, 'keyframes', t),
            state,
            t
          )
        }
      })
    } else {
      references[referenceKey].forEach(reference => {
        reference.replaceWith(
          buildMacroRuntimeNode(reference, state, referenceKey, t)
        )
      })
    }
  })
  addRuntimeImports(state, t)
}
