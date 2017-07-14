import {
  replaceGlobalCallExpression
} from './babel'
import { getRuntimeImportPath } from './babel-utils'
import { injectGlobal, fontFace, inline, keyframes } from './inline'
import * as t from 'babel-types'

module.exports = function macro ({ references, state: babelState }) {
  const state = { ...babelState, inline: true }
  if (references.injectGlobal) {
    references.injectGlobal.forEach((injectGlobalReference) => {
      const path = injectGlobalReference.parentPath
      const requireRuntimeNode = t.memberExpression(
        t.callExpression(t.identifier('require'), [
          t.stringLiteral(getRuntimeImportPath(injectGlobalReference, t))
        ]),
        t.identifier('injectGlobal')
      )
      if (t.isIdentifier(path.node.tag) && t.isTemplateLiteral(path.node.quasi)) {
        replaceGlobalCallExpression(requireRuntimeNode, injectGlobal, path, state, t)
      }
    })
  }
  if (references.fontFace) {
    references.fontFace.forEach((fontFaceReference) => {
      const path = fontFaceReference.parentPath
      const requireRuntimeNode = t.memberExpression(
        t.callExpression(t.identifier('require'), [
          t.stringLiteral(getRuntimeImportPath(fontFaceReference, t))
        ]),
        t.identifier('fontFace')
      )
      if (t.isIdentifier(path.node.tag) && t.isTemplateLiteral(path.node.quasi)) {
        replaceGlobalCallExpression(requireRuntimeNode, fontFace, path, state, t)
      }
    })
  }
}
