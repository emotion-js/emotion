import {
  replaceGlobalWithCallExpression,
  replaceCssWithCallExpression,
  replaceKeyframesWithCallExpression
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
        replaceGlobalWithCallExpression(requireRuntimeNode, injectGlobal, path, state, t)
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
        replaceGlobalWithCallExpression(requireRuntimeNode, fontFace, path, state, t)
      }
    })
  }
  if (references.css) {
    references.css.forEach((cssReference) => {
      const path = cssReference.parentPath
      const requireRuntimeNode = t.memberExpression(
        t.callExpression(t.identifier('require'), [
          t.stringLiteral(getRuntimeImportPath(cssReference, t))
        ]),
        t.identifier('css')
      )
      if (t.isIdentifier(path.node.tag) && t.isTemplateLiteral(path.node.quasi)) {
        replaceCssWithCallExpression(path, requireRuntimeNode, state, t)
      } else {
        path.parentPath.replaceWith(requireRuntimeNode)
      }
    })
  }
  if (references.keyframes) {
    references.keyframes.forEach((keyframesReference) => {
      const path = keyframesReference.parentPath
      if (t.isIdentifier(path.node.tag) && t.isTemplateLiteral(path.node.quasi)) {
        const requireRuntimeNode = t.memberExpression(
          t.callExpression(t.identifier('require'), [
            t.stringLiteral(getRuntimeImportPath(keyframesReference, t))
          ]),
          t.identifier('keyframes')
        )
        replaceKeyframesWithCallExpression(path, requireRuntimeNode, state, t)
      }
    })
  }
}
