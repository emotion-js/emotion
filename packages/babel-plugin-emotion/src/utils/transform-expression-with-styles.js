// @flow

import { serializeStyles } from '@emotion/serialize'
import { getExpressionsFromTemplateLiteral } from './minify'
import { getLabelFromPath } from './label'
import { getSourceMap } from './source-maps'
import { simplifyObject } from './object-to-string'
import { appendStringToArguments, joinStringLiterals } from './strings'
import { isTaggedTemplateExpressionTranspiledByTypeScript } from './checks'

const CSS_OBJECT_STRINGIFIED_ERROR =
  "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."

// with babel@6 fallback
const cloneNode = (t, node) =>
  typeof t.cloneNode === 'function' ? t.cloneNode(node) : t.cloneDeep(node)

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

    if (canAppendStrings && shouldLabel) {
      const label = getLabelFromPath(path, state, t)
      if (label) {
        appendStringToArguments(path, `;label:${label};`, t)
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
        if (!state.emotionStringifiedCssId) {
          const uid = state.file.scope.generateUidIdentifier(
            '__EMOTION_STRINGIFIED_CSS_ERROR__'
          )
          state.emotionStringifiedCssId = uid
          const cssObjectToString = t.functionDeclaration(
            uid,
            [],
            t.blockStatement([
              t.returnStatement(t.stringLiteral(CSS_OBJECT_STRINGIFIED_ERROR))
            ])
          )
          cssObjectToString._compact = true
          state.file.path.unshiftContainer('body', [cssObjectToString])
        }
        let devNode = t.objectExpression([
          t.objectProperty(t.identifier('name'), t.stringLiteral(res.name)),
          t.objectProperty(t.identifier('styles'), t.stringLiteral(res.styles)),
          t.objectProperty(t.identifier('map'), t.stringLiteral(sourceMap)),
          t.objectProperty(
            t.identifier('toString'),
            cloneNode(t, state.emotionStringifiedCssId)
          )
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
      } else if (isTaggedTemplateExpressionTranspiledByTypeScript(path)) {
        const makeTemplateObjectCallPath = path
          .get('arguments')[0]
          .get('right')
          .get('right')

        makeTemplateObjectCallPath.get('arguments').forEach(argPath => {
          const elements = argPath.get('elements')
          const lastElement = elements[elements.length - 1]
          lastElement.replaceWith(
            t.binaryExpression(
              '+',
              lastElement.node,
              cloneNode(t, sourceMapConditional)
            )
          )
        })
      } else {
        path.node.arguments.push(sourceMapConditional)
      }
    }

    return { node: undefined, isPure }
  }
  return { node: undefined, isPure: false }
}
