// @flow

import { serializeStyles } from '@emotion/serialize'
import { getExpressionsFromTemplateLiteral } from './minify'
import { getLabelFromPath } from './label'
import { getSourceMap } from './source-maps'
import { simplifyObject } from './object-to-string'
import { appendStringToExpressions, joinStringLiterals } from './strings'

function createSourceMapConditional(t, production, development) {
  return t.conditionalExpression(
    t.binaryExpression(
      '===',
      t.memberExpression(
        t.memberExpression(t.identifier('process'), t.identifier('env')),
        t.identifier('NODE_ENV')
      ),
      t.stringLiteral('production')
    ),
    production,
    development
  )
}

export let transformExpressionWithStyles = ({
  babel,
  state,
  path,
  shouldLabel,
  sourceMap = ''
}: {
  babel: *,
  state: *,
  path: *,
  shouldLabel: boolean,
  sourceMap?: string
}): { node?: *, isPure: boolean } => {
  let t = babel.types
  if (t.isTaggedTemplateExpression(path)) {
    const expressions = getExpressionsFromTemplateLiteral(path.node.quasi, t)
    if (state.emotionSourceMap && path.node.quasi.loc !== undefined) {
      sourceMap = getSourceMap(path.node.quasi.loc.start, state)
    }
    path.replaceWith(t.callExpression(path.node.tag, expressions))
  }

  if (t.isCallExpression(path)) {
    const canAppendStrings = path.node.arguments.every(
      arg => arg.type !== 'SpreadElement'
    )

    if (canAppendStrings) {
      const label = getLabelFromPath(path, state, t)
      if (label && shouldLabel) {
        appendStringToExpressions(path.node.arguments, `label:${label};`, t)
      }
    }

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

    if (
      canAppendStrings &&
      state.emotionSourceMap &&
      !sourceMap &&
      path.node.loc !== undefined
    ) {
      sourceMap = getSourceMap(path.node.loc.start, state)
    }

    if (
      path.node.arguments.length === 1 &&
      t.isStringLiteral(path.node.arguments[0])
    ) {
      let cssString = path.node.arguments[0].value
      let res = serializeStyles([cssString])
      let prodNode = t.objectExpression([
        t.objectProperty(t.identifier('name'), t.stringLiteral(res.name)),
        t.objectProperty(t.identifier('styles'), t.stringLiteral(res.styles))
      ])
      let node = prodNode
      if (sourceMap) {
        let devNode = t.objectExpression([
          t.objectProperty(t.identifier('name'), t.stringLiteral(res.name)),
          t.objectProperty(t.identifier('styles'), t.stringLiteral(res.styles)),
          t.objectProperty(t.identifier('map'), t.stringLiteral(sourceMap))
        ])
        node = createSourceMapConditional(t, prodNode, devNode)
      }

      return { node, isPure: true }
    }
    if (sourceMap) {
      let lastIndex = path.node.arguments.length - 1
      let last = path.node.arguments[lastIndex]
      let sourceMapConditional = createSourceMapConditional(
        t,
        t.stringLiteral(''),
        t.stringLiteral(sourceMap)
      )
      if (t.isStringLiteral(last)) {
        path.node.arguments[lastIndex] = t.binaryExpression(
          '+',
          last,
          sourceMapConditional
        )
      } else {
        path.node.arguments.push(sourceMapConditional)
      }
    }

    return { node: undefined, isPure }
  }
  return { node: undefined, isPure: false }
}
