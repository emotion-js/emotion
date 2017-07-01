import fs from 'fs'
import { basename } from 'path'
import { touchSync } from 'touch'
import { inline, keyframes, fontFace, injectGlobal } from './inline'
import findAndReplaceAttrs from './attrs'
import cssProps from './css-prop'
import { placeholderRegex } from './utils'

function joinExpressionsWithSpaces (expressions, t) {
  const quasis = [t.templateElement({ cooked: '', raw: '' }, true)]
  expressions.forEach((x, i) => {
    if (i === expressions.length - 1) {
      return quasis.push(t.templateElement({ cooked: '', raw: '' }, true))
    }
    quasis.push(t.templateElement({ cooked: ' ', raw: ' ' }, true))
  })
  return t.templateLiteral(
    quasis,
    expressions
  )
}

function parseDynamicValues (rules, t, inputExpressions, composes = 0) {
  return rules.map(rule => {
    let varMatch
    let matches = []
    while ((varMatch = placeholderRegex().exec(rule)) !== null) {
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
        expressions.push(inputExpressions[p1 - composes])

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
      Program: {
        enter (path, state) {
          state.inline =
            path.hub.file.opts.filename === 'unknown' || state.opts.inline
          state.staticRules = []
          state.insertStaticRules = function (staticRules) {
            state.staticRules.push(...staticRules)
          }
        },
        exit (path, state) {
          if (state.staticRules.length !== 0) {
            const toWrite = state.staticRules.join('\n').trim()
            const filenameArr = path.hub.file.opts.filename.split('.')
            filenameArr.pop()
            filenameArr.push('emotion', 'css')
            const cssFilename = filenameArr.join('.')
            const exists = fs.existsSync(cssFilename)
            path.node.body.unshift(
              t.importDeclaration(
                [],
                t.stringLiteral('./' + basename(cssFilename))
              )
            )
            if (
              exists ? fs.readFileSync(cssFilename, 'utf8') !== toWrite : true
            ) {
              if (!exists) {
                touchSync(cssFilename)
              }
              fs.writeFileSync(cssFilename, toWrite)
            }
          }
        }
      },
      JSXOpeningElement (path, state) {
        cssProps(path, t)
      },
      TaggedTemplateExpression (path, state) {
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
        const identifierName =
          parent && t.isIdentifier(parent.node.id) ? parent.node.id.name : ''

        function buildCallExpression (identifier, tag, path) {
          const built = findAndReplaceAttrs(path, t)

          let { hash, rules, name, hasOtherMatch, composes } = inline(
            built,
            identifierName,
            'css',
            state.inline
          )

          // hash will be '0' when no styles are passed so we can just return the original tag
          if (hash === '0') {
            return tag
          }
          const inputClasses = [t.stringLiteral(`${name}-${hash}`)]
          for (var i = 0; i < composes; i++) {
            inputClasses.push(path.node.quasi.expressions.shift())
          }
          const args = [
            tag,
            t.arrayExpression(inputClasses),
            t.arrayExpression(built.expressions)
          ]
          if (!hasOtherMatch && !state.inline) {
            state.insertStaticRules(rules)
          } else {
            const expressions = built.expressions.map((x, i) =>
              t.identifier(`x${i}`)
            )
            const inlineContentExpr = t.functionExpression(
              t.identifier('createEmotionStyledRules'),
              expressions,
              t.blockStatement([
                t.returnStatement(
                  t.arrayExpression(
                    parseDynamicValues(rules, t, expressions, composes)
                  )
                )
              ])
            )
            args.push(inlineContentExpr)
          }

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
          path.node.tag.name === 'css'
        ) {
          try {
            const {
              hash,
              name,
              rules,
              hasVar,
              composes,
              hasOtherMatch
            } = inline(path.node.quasi, identifierName, 'css', state.inline)
            const inputClasses = [t.stringLiteral(`${name}-${hash}`)]
            for (var i = 0; i < composes; i++) {
              inputClasses.push(path.node.quasi.expressions.shift())
            }
            const args = [
              t.arrayExpression(inputClasses),
              t.arrayExpression(path.node.quasi.expressions)
            ]
            if (!hasOtherMatch && !state.inline) {
              state.insertStaticRules(rules)
              if (!hasVar) {
                return path.replaceWith(
                  joinExpressionsWithSpaces(inputClasses, t)
                )
              }
            } else {
              const expressions = path.node.quasi.expressions.map((x, i) =>
                t.identifier(`x${i}`)
              )
              const inlineContentExpr = t.functionExpression(
                t.identifier('createEmotionRules'),
                expressions,
                t.blockStatement([
                  t.returnStatement(
                    t.arrayExpression(
                      parseDynamicValues(rules, t, expressions, composes)
                    )
                  )
                ])
              )
              args.push(inlineContentExpr)
            }
            path.replaceWith(t.callExpression(t.identifier('css'), args))
          } catch (e) {
            throw path.buildCodeFrameError(e)
          }
        } else if (
          t.isIdentifier(path.node.tag) &&
          path.node.tag.name === 'keyframes'
        ) {
          const { hash, name, rules, hasInterpolation } = keyframes(
            path.node.quasi,
            identifierName,
            'animation'
          )
          const animationName = `${name}-${hash}`
          if (!hasInterpolation && !state.inline) {
            state.insertStaticRules([
              `@keyframes ${animationName} ${rules.join('')}`
            ])
            path.replaceWith(t.stringLiteral(animationName))
          } else {
            path.replaceWith(
              t.callExpression(t.identifier('keyframes'), [
                t.stringLiteral(animationName),
                t.arrayExpression(
                  parseDynamicValues(rules, t, path.node.quasi.expressions)
                )
              ])
            )
          }
        } else if (
          t.isIdentifier(path.node.tag) &&
          path.node.tag.name === 'fontFace'
        ) {
          const { rules, hasInterpolation } = fontFace(
            path.node.quasi,
            state.inline
          )
          if (!hasInterpolation && !state.inline) {
            state.insertStaticRules(rules)
            if (t.isExpressionStatement(path.parent)) {
              path.parentPath.remove()
            } else {
              path.replaceWith(t.identifier('undefined'))
            }
          } else {
            path.replaceWith(
              t.callExpression(t.identifier('fontFace'), [
                t.arrayExpression(
                  parseDynamicValues(rules, t, path.node.quasi.expressions)
                )
              ])
            )
          }
        } else if (
          t.isIdentifier(path.node.tag) &&
          path.node.tag.name === 'injectGlobal' &&
          t.isTemplateLiteral(path.node.quasi)
        ) {
          const { rules, hasInterpolation } = injectGlobal(path.node.quasi)
          if (!hasInterpolation && !state.inline) {
            state.insertStaticRules(rules)
            if (t.isExpressionStatement(path.parent)) {
              path.parentPath.remove()
            } else {
              path.replaceWith(t.identifier('undefined'))
            }
          } else {
            path.replaceWith(
              t.callExpression(t.identifier('injectGlobal'), [
                t.arrayExpression(
                  parseDynamicValues(rules, t, path.node.quasi.expressions)
                )
              ])
            )
          }
        }
      }
    }
  }
}
