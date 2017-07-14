import {
  replaceGlobalCallExpression,
  replaceCssWithCallExpression
} from './babel'
import { getRuntimeImportPath } from './babel-utils'
import { injectGlobal, fontFace } from './inline'
import * as t from 'babel-types'

module.exports = function macro ({ references, state: babelState }) {
  const state = { ...babelState, inline: true }
  if (references.injectGlobal) {
    references.injectGlobal.forEach((injectGlobalReference) => {
      const path = injectGlobalReference.parentPath
      if (t.isIdentifier(path.node.tag) && t.isTemplateLiteral(path.node.quasi)) {
        const requireRuntimeNode = t.memberExpression(
          t.callExpression(t.identifier('require'), [
            t.stringLiteral(getRuntimeImportPath(injectGlobalReference, t))
          ]),
          t.identifier('injectGlobal')
        )
        replaceGlobalCallExpression(requireRuntimeNode, injectGlobal, path, state, t)
      }
    })
  }
  if (references.fontFace) {
    references.fontFace.forEach((fontFaceReference) => {
      const path = fontFaceReference.parentPath
      if (t.isIdentifier(path.node.tag) && t.isTemplateLiteral(path.node.quasi)) {
        const requireRuntimeNode = t.memberExpression(
          t.callExpression(t.identifier('require'), [
            t.stringLiteral(getRuntimeImportPath(fontFaceReference, t))
          ]),
          t.identifier('fontFace')
        )
        replaceGlobalCallExpression(requireRuntimeNode, fontFace, path, state, t)
      }
    })
  }
  if (references.css) {
    references.css.forEach((cssReference) => {
      const path = cssReference.parentPath
      if (t.isIdentifier(path.node.tag) && t.isTemplateLiteral(path.node.quasi)) {
        const requireRuntimeNode = t.memberExpression(
          t.callExpression(t.identifier('require'), [
            t.stringLiteral(getRuntimeImportPath(cssReference, t))
          ]),
          t.identifier('css')
        )
        replaceCssWithCallExpression(path, requireRuntimeNode, state, t)
      }
    })
  }
}
