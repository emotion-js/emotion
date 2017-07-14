import { buildStyledCallExpression } from './babel'
import { getRuntimeImportPath } from './babel-utils'
import * as t from 'babel-types'

module.exports = function macro ({ references, state: babelState }) {
  const state = { ...babelState, inline: true }
  if (references.default) {
    references.default.forEach(styledReference => {
      const runtimeImportPath = getRuntimeImportPath(styledReference, t)
      const requireRuntimeNode = t.memberExpression(t.callExpression(t.identifier('require'), [t.stringLiteral(runtimeImportPath)]), t.identifier('default'))
      const path = styledReference.parentPath.parentPath
      if (t.isTemplateLiteral(path.node.quasi)) {
        if (t.isMemberExpression(path.node.tag)) {
          path.replaceWith(
            buildStyledCallExpression(
              requireRuntimeNode,
              t.stringLiteral(path.node.tag.property.name),
              path,
              state,
              t
            )
          )
        } else if (t.isCallExpression(path.node.tag)) {
          path.replaceWith(
            buildStyledCallExpression(
              requireRuntimeNode,
              path.node.tag.arguments[0],
              path,
              state,
              t
            )
          )
        }
      }
    })
  }
}
