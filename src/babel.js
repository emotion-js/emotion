import { inline } from './inline'
import findAndReplaceAttrs from './attrs'

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
      (accum, { value, p1, index }, i) => {
        const [quasis, expressions] = accum
        const preMatch = rule.substring(cursor, index)
        cursor = cursor + preMatch.length + value.length
        if (preMatch) {
          quasis.push(t.templateElement({ raw: preMatch, cooked: preMatch }))
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
        [t.templateElement({ raw: rule, cooked: rule }, true)],
        []
      )
    }

    return t.templateLiteral(quasis, expressions)
  })
}

export default function (babel) {
  const { types: t } = babel

  return {
    name: 'emotion', // not required
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      TaggedTemplateExpression (path) {
        // in:
        // styled.h1`color:${color};`
        //
        // out:
        // styled('h1', "css-r1aqtk", [colorVar, heightVar], function inlineCss(x0, x1) {
        //   return [`.css-r1aqtk {
        //     margin: 12px;
        //     color: ${x0};
        //     height: ${x1}; }`];
        // });

        const parent = path.findParent(p => p.isVariableDeclarator())
        const identifierName = parent && t.isIdentifier(parent.node.id)
          ? parent.node.id.name
          : ''

        function buildCallExpression (identifier, tag, path) {
          const built = findAndReplaceAttrs(path, t)

          let { hash, stubs, rules, name } = inline(
            built,
            identifierName,
            'css'
          )

          // hash will be '0' when no styles are passed so we can just return the original tag
          if (hash === '0') {
            return tag
          }

          let arrayValues = parseDynamicValues(rules, t)

          const inlineContentExpr = t.functionExpression(
            t.identifier(''),
            stubs.map((x, i) => t.identifier(`x${i}`)),
            t.blockStatement([
              t.returnStatement(t.arrayExpression(arrayValues))
            ])
          )
          const args = [
            tag,
            t.stringLiteral(`${name}-${hash}`),
            t.arrayExpression(built.expressions),
            inlineContentExpr
          ]

          return t.callExpression(identifier, args)
        }

        if (
          // styled.h1`color:${color};`
          t.isMemberExpression(path.node.tag) &&
          path.node.tag.object.name === 'styled' &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          path.replaceWith(
            buildCallExpression(
              path.node.tag.object,
              t.stringLiteral(path.node.tag.property.name),
              path
            )
          )
        } else if (
          // styled('h1')`color:${color};`
          t.isCallExpression(path.node.tag) &&
          path.node.tag.callee.name === 'styled' &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          path.replaceWith(
            buildCallExpression(
              path.node.tag.callee,
              path.node.tag.arguments[0],
              path
            )
          )
        } else if (
          t.isIdentifier(path.node.tag) &&
          path.node.tag.name === 'fragment'
        ) {
          const { hash, stubs, name, rules } = inline(
            path.node.quasi,
            undefined,
            'frag',
            'frag'
          )
          path.replaceWith(
            t.callExpression(t.identifier('fragment'), [
              t.stringLiteral(`${name}-${hash}`),
              t.arrayExpression(stubs),
              t.functionExpression(
                t.identifier(''),
                stubs.map((x, i) => t.identifier(`x${i}`)),
                t.blockStatement([
                  t.returnStatement(
                    t.arrayExpression(parseDynamicValues(rules, t))
                  )
                ])
              )
            ])
          )
        }
      }
    }
  }
}
