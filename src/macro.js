import {
  replaceGlobalWithCallExpression,
  replaceCssWithCallExpression,
  replaceKeyframesWithCallExpression
} from './babel'
import { buildMacroRuntimeNode, addRuntimeImports } from './babel-utils'
import { injectGlobal, fontFace } from './inline'

module.exports = function macro ({ references, state, babel: { types: t } }) {
  if (!state.inline) state.inline = true
  if (references.injectGlobal) {
    references.injectGlobal.forEach(injectGlobalReference => {
      const path = injectGlobalReference.parentPath
      if (
        t.isIdentifier(path.node.tag) &&
        t.isTemplateLiteral(path.node.quasi)
      ) {
        replaceGlobalWithCallExpression(
          buildMacroRuntimeNode(
            injectGlobalReference,
            state,
            'injectGlobal',
            t
          ),
          injectGlobal,
          path,
          state,
          t
        )
      }
    })
  }
  if (references.fontFace) {
    references.fontFace.forEach(fontFaceReference => {
      const path = fontFaceReference.parentPath
      if (
        t.isIdentifier(path.node.tag) &&
        t.isTemplateLiteral(path.node.quasi)
      ) {
        replaceGlobalWithCallExpression(
          buildMacroRuntimeNode(fontFaceReference, state, 'fontFace', t),
          fontFace,
          path,
          state,
          t
        )
      }
    })
  }
  if (references.css) {
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
  }
  if (references.keyframes) {
    references.keyframes.forEach(keyframesReference => {
      const path = keyframesReference.parentPath
      if (
        t.isIdentifier(path.node.tag) &&
        t.isTemplateLiteral(path.node.quasi)
      ) {
        replaceKeyframesWithCallExpression(
          path,
          buildMacroRuntimeNode(keyframesReference, state, 'keyframes', t),
          state,
          t
        )
      }
    })
  }
  ;['inserted', 'sheet', 'flush', 'hydrate'].forEach(identifier => {
    if (references[identifier]) {
      references[identifier].forEach(reference => {
        reference.replaceWith(
          buildMacroRuntimeNode(reference, state, identifier, t)
        )
      })
    }
  })
  addRuntimeImports(state, t)
}
