// @flow
import {
  getLabelFromPath,
  getExpressionsFromTemplateLiteral,
  getSourceMap,
  appendStringToExpressions,
  simplifyObject,
  joinStringLiterals
} from '@emotion/babel-utils'
import css from '@emotion/css'

export let transformExpressionWithStyles = ({
  babel,
  state,
  path,
  shouldLabel
}: {
  babel: *,
  state: *,
  path: *,
  shouldLabel: boolean
}): { node?: *, isPure: boolean } => {
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
    const label = getLabelFromPath(path, state, t)
    if (label && shouldLabel) {
      appendStringToExpressions(path.node.arguments, `label:${label};`, t)
    }
    let node

    let isPure = true

    path.get('arguments').forEach(node => {
      if (!node.isPure()) {
        isPure = false
      }
      if (t.isObjectExpression(node)) {
        node.replaceWith(simplifyObject(node.node, t))
      }
    })

    path.node.arguments = joinStringLiterals(path.node.arguments, t)

    if (state.emotionSourceMap) {
      if (!sourceMap && path.node.loc !== undefined) {
        sourceMap = getSourceMap(path.node.loc.start, state)
      }
      appendStringToExpressions(path.node.arguments, sourceMap, t)
    }

    if (
      path.node.arguments.length === 1 &&
      t.isStringLiteral(path.node.arguments[0])
    ) {
      let cssString = path.node.arguments[0].value
      let res = css(cssString)
      node = t.objectExpression(
        [
          t.objectProperty(t.identifier('name'), t.stringLiteral(res.name)),
          t.objectProperty(t.identifier('styles'), t.stringLiteral(res.styles)),
          res.map &&
            t.objectProperty(t.identifier('map'), t.stringLiteral(res.map))
        ].filter(Boolean)
      )
    }
    return { node, isPure }
  }
  return { node: undefined, isPure: false }
}
