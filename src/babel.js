import { inline, fragment } from './inline'

function parseDynamicValues (rules, t) {
  return rules.map(rule => {
    const re = /xxx(\S)xxx/gm
    let varMatch
    let matches = []
    while ((varMatch = re.exec(rule)) !== null) {
      matches.push({
        value: varMatch[0],
        p1: varMatch[1],
        index: varMatch.index
      })
    }

    let cursor = 0
    const [quasis, expressions] = matches.reduce(
      (accum, {value, p1, index}, i) => {
        const [quasis, expressions] = accum
        const preMatch = rule.substring(cursor, index)
        cursor = cursor + preMatch.length + value.length
        if (preMatch) {
          quasis.push(t.templateElement({raw: preMatch, cooked: preMatch}))
        }

        expressions.push(t.identifier(`x${p1}`))

        if (i === matches.length - 1 && cursor <= rule.length) {
          const postMatch = rule.substring(cursor)

          quasis.push(
            t.templateElement(
              {
                raw: postMatch,
                cooked: postMatch
              },
              true
            )
          )
        }
        return accum
      },
      [[], []]
    )

    if (!matches.length) {
      return t.templateLiteral(
        [t.templateElement({raw: rule, cooked: rule}, true)],
        []
      )
    }

    return t.templateLiteral(quasis, expressions)
  })
}

module.exports = function (babel) {
  const { types: t } = babel

  function createClassNameAttr (expression) {
    return t.jSXAttribute(
      t.jSXIdentifier('className'),
      t.JSXExpressionContainer(expression)
    )
  }

  function createCssTemplateExpression (templateLiteral) {
    return t.taggedTemplateExpression(t.identifier('css'), templateLiteral)
  }

  function findAndReplaceAttrs (path) {
    let quasis = path.node.quasi.quasis
    let stubs = path.node.quasi.expressions
    let didFindAtLeastOneMatch = false

    let [nextQuasis, nextStubs] = quasis.reduce(
      (accum, quasi, i) => {
        const str = quasi.value.cooked
        const regex = /attr\(([\S]+)(?:\s*(em|ex|px|rem|vw|vh|vmin|vmax|mm|cm|in|pt|pc|%)?)(?:,\s*([\S^)]+))?\)/gm
        let attrMatch
        let matches = []
        while ((attrMatch = regex.exec(str)) !== null) {
          didFindAtLeastOneMatch = true
          matches.push({
            value: attrMatch[0],
            propName: attrMatch[1],
            valueType: attrMatch[2],
            defaultValue: attrMatch[3],
            index: attrMatch.index
          })
        }
        let cursor = 0
        for (let j = 0; j < matches.length; ++j) {
          const match = matches[j]
          const value = match.value
          const propName = match.propName
          const valueType = match.valueType
          const defaultValue = match.defaultValue
          const index = match.index

          const preAttr = `${str.slice(cursor, index)}`
          cursor = index + value.length
          const postAttr = `${str.slice(cursor)}`

          if (preAttr) {
            accum[0].push(
              t.templateElement({ raw: preAttr, cooked: preAttr }, false)
            )
          }

          if (postAttr && j === matches.length - 1) {
            accum[0].push(
              t.templateElement(
                { raw: postAttr, cooked: postAttr },
                i === quasis.length - 1
              )
            )
          }

          let createMemberExpression = () =>
            t.memberExpression(t.identifier('props'), t.identifier(propName))

          let returnValue = createMemberExpression()

          if (valueType) {
            returnValue = t.binaryExpression(
              '+',
              createMemberExpression(),
              t.stringLiteral(valueType)
            )
          }

          if (defaultValue) {
            returnValue = t.conditionalExpression(
              createMemberExpression(),
              createMemberExpression(),
              t.parenthesizedExpression(
                t.binaryExpression(
                  '+',
                  t.stringLiteral(defaultValue),
                  t.stringLiteral(valueType || '')
                )
              )
            )
          }

          const body = t.blockStatement([t.returnStatement(returnValue)])

          const expr = t.functionExpression(
            t.identifier(
              `get${propName.charAt(0).toUpperCase() + propName.slice(1)}`
            ),
            [t.identifier('props')],
            body
          )
          accum[1].push(expr)
        }

        if (matches.length === 0) {
          accum[0].push(quasi)
          if (stubs[i]) {
            accum[1].push(stubs[i])
          }
        } else if (stubs[i]) {
          accum[1].push(stubs[i])
        }

        return accum
      },
      [[], []]
    )

    if (didFindAtLeastOneMatch) {
      return t.templateLiteral(nextQuasis, nextStubs)
    }

    return path.node.quasi
  }
  return {
    name: 'emotion-for-glam', // not required
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXOpeningElement (path, state) {
        let cssPath
        let classNamesPath

        path.get('attributes').forEach(openElPath => {
          if (t.isJSXSpreadAttribute(openElPath.node)) {
            return
          }

          const attrPath = openElPath.get('name')
          const name = attrPath.node.name

          if (name === 'css') {
            cssPath = attrPath
          }

          if (name === 'className') {
            classNamesPath = attrPath
          }
        })

        if (!cssPath) return

        let cssPropValue = cssPath.container && cssPath.container.value
        let classNamesValue =
          classNamesPath &&
          classNamesPath.container &&
          classNamesPath.container.value

        if (t.isJSXExpressionContainer(cssPropValue)) {
          cssPropValue = cssPropValue.expression
        }

        let cssTemplateExpression
        if (t.isTemplateLiteral(cssPropValue)) {
          cssTemplateExpression = createCssTemplateExpression(cssPropValue)
        } else if (t.isStringLiteral(cssPropValue)) {
          cssTemplateExpression = createCssTemplateExpression(
            t.templateLiteral(
              [
                t.templateElement({
                  raw: cssPropValue.value,
                  cooked: cssPropValue.value
                })
              ],
              []
            )
          )
        } else {
          throw path.buildCodeFrameError(
            `${cssPropValue.value} is not a string or template literal`
          )
        }

        if (!classNamesValue) {
          cssPath.parentPath.replaceWith(
            createClassNameAttr(cssTemplateExpression)
          )
          return
        }

        cssPath.parentPath.remove()
        if (t.isJSXExpressionContainer(classNamesValue)) {
          classNamesPath.parentPath.replaceWith(
            createClassNameAttr(
              t.binaryExpression(
                '+',
                t.binaryExpression(
                  '+',
                  classNamesValue.expression,
                  t.stringLiteral(' ')
                ),
                cssTemplateExpression
              )
            )
          )
        } else {
          classNamesPath.parentPath.replaceWith(
            createClassNameAttr(
              t.binaryExpression(
                '+',
                t.binaryExpression(
                  '+',
                  t.stringLiteral(classNamesValue.value || ''),
                  t.stringLiteral(' ')
                ),
                cssTemplateExpression
              )
            )
          )
        }
      },
      TaggedTemplateExpression (path) {
        if (
          // styled.h1`color:${color};` -> styled('h1', css`color:${color};`)
          t.isMemberExpression(path.node.tag) &&
          path.node.tag.object.name === 'styled' &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          const built = findAndReplaceAttrs(path)

          let {hash, stubs, rules, name} = inline(path.hub.file.code, built)

          let arrayValues = parseDynamicValues(rules, t)

          const inlineExpr = t.functionExpression(
            t.identifier('inlineCss'),
            stubs.map((x, i) => t.identifier(`x${i}`)),
            t.blockStatement([
              t.returnStatement(t.arrayExpression(arrayValues))
            ])
          )

          path.replaceWith(
            t.callExpression(path.node.tag.object, [
              t.stringLiteral(path.node.tag.property.name),
              t.taggedTemplateExpression(t.identifier('css'), built)
            ])
          )
        } else if (
          // styled('h1')`color:${color};` -> styled('h1', css`color:${color};`)
          t.isCallExpression(path.node.tag) &&
          path.node.tag.callee.name === 'styled' &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          const built = findAndReplaceAttrs(path)
          path.replaceWith(
            t.callExpression(path.node.tag.callee, [
              path.node.tag.arguments[0],
              t.taggedTemplateExpression(t.identifier('css'), built)
            ])
          )
        }
      }
    }
  }
}
