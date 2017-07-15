import {
  buildStyledCallExpression,
  buildStyledObjectCallExpression
} from './babel'
import { buildMacroRuntimeNode } from './babel-utils'

module.exports = function macro ({ references, state: babelState, babel: { types: t } }) {
  const state = { ...babelState, inline: true }
  if (references.default) {
    references.default.forEach(styledReference => {
      const path = styledReference.parentPath.parentPath
      const runtimeNode = buildMacroRuntimeNode(styledReference, 'default', t)
      if (t.isTemplateLiteral(path.node.quasi)) {
        if (t.isMemberExpression(path.node.tag)) {
          path.replaceWith(
            buildStyledCallExpression(
              runtimeNode,
              t.stringLiteral(path.node.tag.property.name),
              path,
              state,
              t
            )
          )
        } else if (t.isCallExpression(path.node.tag)) {
          path.replaceWith(
            buildStyledCallExpression(
              runtimeNode,
              path.node.tag.arguments[0],
              path,
              state,
              t
            )
          )
        }
      } else if (
        t.isCallExpression(path) &&
        (t.isCallExpression(path.node.callee) ||
        t.isIdentifier(path.node.callee.object))
      ) {
        path.replaceWith(buildStyledObjectCallExpression(path, runtimeNode, t))
      }
    })
  }
}
