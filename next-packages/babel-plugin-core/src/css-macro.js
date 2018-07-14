// @flow
import { createMacro } from 'babel-plugin-macros'
import { addDefault } from '@babel/helper-module-imports'
import {
  getLabelFromPath,
  getExpressionsFromTemplateLiteral,
  getSourceMap,
  appendStringToExpressions,
  simplifyObject,
  joinStringLiterals
} from '@emotion/babel-utils'
import css from '@emotion/css'

export const transformCssCallExpression = ({ babel, state, path }: *) => {
  let t = babel.types
  let sourceMap = ''
  if (t.isTaggedTemplateExpression(path)) {
    const expressions = getExpressionsFromTemplateLiteral(path.node.quasi, t)
    if (state.emotionSourceMap && path.node.quasi.loc !== undefined) {
      sourceMap = getSourceMap(path.node.quasi.loc.start, state)
    }
    path.replaceWith(t.callExpression(path.node.tag, expressions))
  }

  if (t.isCallExpression(path)) {
    const label = getLabelFromPath(path, t)

    let isPure = true

    path.get('arguments').forEach(node => {
      if (!node.isPure()) {
        isPure = false
      }
      if (t.isObjectExpression(node)) {
        node.replaceWith(simplifyObject(node.node, t))
      }
    })
    if (label) {
      appendStringToExpressions(path.node.arguments, `label:${label};`, t)
    }

    if (state.emotionSourceMap) {
      if (!sourceMap && path.node.loc !== undefined) {
        sourceMap = getSourceMap(path.node.loc.start, state)
      }
      appendStringToExpressions(path.node.arguments, sourceMap, t)
    }

    path.node.arguments = joinStringLiterals(path.node.arguments, t)

    if (
      path.node.arguments.length === 1 &&
      t.isStringLiteral(path.node.arguments[0])
    ) {
      let cssString = path.node.arguments[0].value
      let res = css(cssString)

      path.replaceWith(
        t.objectExpression([
          t.objectProperty(t.identifier('name'), t.stringLiteral(res.name)),
          t.objectProperty(t.identifier('styles'), t.stringLiteral(res.styles))
        ])
      )
    }

    if (isPure) {
      path.hoist()
    }
  }
}

export default createMacro(({ references, state, babel }) => {
  const t = babel.types
  if (references.default.length) {
    references.default.reverse().forEach(reference => {
      if (!state.cssIdentifier) {
        state.cssIdentifier = addDefault(reference, '@emotion/css', {
          nameHint: 'css'
        })
      }
      reference.replaceWith(t.cloneDeep(state.cssIdentifier))
      transformCssCallExpression({ babel, state, path: reference.parentPath })
    })
  }
})
