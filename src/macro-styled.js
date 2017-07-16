import {
  buildStyledCallExpression,
  buildStyledObjectCallExpression
} from './babel'
import { buildMacroRuntimeNode, addRuntimeImports } from './babel-utils'
import forEach from '@arr/foreach'
import { keys } from './utils'

module.exports = function macro ({ references, state, babel: { types: t } }) {
  if (!state.inline) state.inline = true
  if (references.default) {
    references.default.forEach(styledReference => {
      const path = styledReference.parentPath.parentPath
      const runtimeNode = buildMacroRuntimeNode(
        styledReference,
        state,
        'default',
        t
      )
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
  forEach(keys(references), (referenceKey) => {
    if (referenceKey !== 'default') {
      references[referenceKey].forEach(reference => {
        reference.replaceWith(
            buildMacroRuntimeNode(reference, state, referenceKey, t)
          )
      })
    }
  })
  addRuntimeImports(state, t)
}
