// @flow
import { createMacro } from 'babel-plugin-macros'
import { addDefault } from '@babel/helper-module-imports'
import {
  getLabelFromPath,
  getExpressionsFromTemplateLiteral,
  getSourceMap,
  appendStringToExpressions,
  getTargetClassName
} from '@emotion/babel-utils'

export default createMacro(({ references, state, babel }) => {
  const t = babel.types
  if (references.default.length) {
    let styledIdentifier
    references.default.forEach(reference => {
      if (!styledIdentifier) {
        styledIdentifier = addDefault(reference, '@emotion/styled-base', {
          nameHint: 'styled'
        })
      }
      if (t.isMemberExpression(reference.parent)) {
        reference.parentPath.replaceWith(
          t.callExpression(t.cloneDeep(styledIdentifier), [
            t.stringLiteral(reference.parent.property.name)
          ])
        )
      } else {
        reference.replaceWith(t.cloneDeep(styledIdentifier))
      }
      let sourceMap = ''
      if (reference.parentPath && reference.parentPath.parentPath) {
        const styledCallPath = reference.parentPath.parentPath
        if (t.isTaggedTemplateExpression(styledCallPath)) {
          const expressions = getExpressionsFromTemplateLiteral(
            styledCallPath.node.quasi,
            t
          )
          if (
            state.emotionSourceMap &&
            styledCallPath.node.quasi.loc !== undefined
          ) {
            sourceMap = getSourceMap(styledCallPath.node.quasi.loc.start, state)
          }
          styledCallPath.replaceWith(
            t.callExpression(styledCallPath.node.tag, expressions)
          )
        }
      }
      if (t.isCallExpression(reference.parentPath)) {
        reference.parentPath.node.arguments[1] = t.objectExpression([
          t.objectProperty(
            t.identifier('target'),
            t.stringLiteral(getTargetClassName(state, t))
          ),
          t.objectProperty(
            t.identifier('label'),
            t.stringLiteral(getLabelFromPath(reference.parentPath, t))
          )
        ])
      }
      if (t.isCallExpression(reference.parentPath.parentPath)) {
        if (state.emotionSourceMap) {
          if (
            !sourceMap &&
            reference.parentPath.parentPath.node.loc !== undefined
          ) {
            sourceMap = getSourceMap(
              reference.parentPath.parentPath.node.loc.start,
              state
            )
          }

          appendStringToExpressions(
            reference.parentPath.parentPath.node.arguments,
            sourceMap,
            t
          )
        }
      }
    })
  }
})
