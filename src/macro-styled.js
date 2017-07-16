import {
  buildStyledCallExpression,
  buildStyledObjectCallExpression
} from './babel'
import { buildMacroRuntimeNode } from './babel-utils'
import emotionMacro from './macro'
import { omit } from './utils'

module.exports = function macro (options) {
  const { references, state, babel: { types: t } } = options
  if (!state.inline) state.inline = true
  let referencesWithoutDefault = references
  if (references.default) {
    referencesWithoutDefault = omit(references, ['default'])
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
  emotionMacro({ ...options, references: referencesWithoutDefault })
}
