import fs from 'fs'
import { basename } from 'path'
import { touchSync } from 'touch'
import postcssJs from 'postcss-js'
import autoprefixer from 'autoprefixer'
import { inline, keyframes, fontFace, injectGlobal } from './inline'
import { getIdentifierName } from './babel-utils'
import cssProps from './css-prop'
import createAttrExpression from './attrs'

function joinExpressionsWithSpaces (expressions, t) {
  const quasis = [t.templateElement({ cooked: '', raw: '' }, true)]
  expressions.forEach((x, i) => {
    if (i === expressions.length - 1) {
      return quasis.push(t.templateElement({ cooked: '', raw: '' }, true))
    }
    quasis.push(t.templateElement({ cooked: ' ', raw: ' ' }, true))
  })
  return t.templateLiteral(quasis, expressions)
}

function parseDynamicValues (rules, t, options) {
  if (options.composes === undefined) options.composes = 0
  return rules.map(rule => {
    const re = /xxx(\d+)xxx|attr\(([^,\s)]+)(?:\s*([^,)]*)?)(?:,\s*(\S+))?\)/gm
    const VAR = 'VAR'
    const ATTR = 'ATTR'
    let match
    const matches = []
    while ((match = re.exec(rule)) !== null) {
      if (match[1]) {
        matches.push({
          value: match[0],
          p1: match[1],
          index: match.index,
          type: VAR
        })
      } else {
        matches.push({
          value: match[0],
          propName: match[2],
          valueType: match[3],
          defaultValue: match[4],
          index: match.index,
          type: ATTR
        })
      }
    }

    let cursor = 0
    const [quasis, expressions] = matches.reduce(
      (accum, match, i) => {
        const [quasis, expressions] = accum
        const preMatch = rule.substring(cursor, match.index)
        cursor = cursor + preMatch.length + match.value.length
        if (preMatch) {
          quasis.push(t.templateElement({ raw: preMatch, cooked: preMatch }))
        }
        if (match.type === VAR) {
          if (options.inputExpressions) {
            expressions.push(
              options.inputExpressions[match.p1 - options.composes]
            )
          } else {
            expressions.push(t.identifier(`x${match.p1 - options.composes}`))
          }
        }
        if (match.type === ATTR) {
          const expr = createAttrExpression(
            match,
            options.vars,
            options.composes,
            t
          )
          options.vars.push(expr)
          expressions.push(t.identifier(`x${options.vars.length - 1}`))
        }

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

export function buildStyledCallExpression (identifier, tag, path, state, t) {
  const identifierName = getIdentifierName(path, t)
  let { hash, rules, name, hasOtherMatch, composes, hasCssFunction } = inline(
    path.node.quasi,
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

  const vars = path.node.quasi.expressions

  const dynamicValues = parseDynamicValues(rules, t, { composes, vars })
  const args = [tag, t.arrayExpression(inputClasses), t.arrayExpression(vars)]
  if (!hasOtherMatch && !state.inline && !hasCssFunction) {
    state.insertStaticRules(rules)
  } else if (rules.length !== 0) {
    const inlineContentExpr = t.functionExpression(
      t.identifier('createEmotionStyledRules'),
      vars.map((x, i) => t.identifier(`x${i}`)),
      t.blockStatement([t.returnStatement(t.arrayExpression(dynamicValues))])
    )
    args.push(inlineContentExpr)
  }

  return t.callExpression(identifier, args)
}

export function buildStyledObjectCallExpression (path, identifier, t) {
  const tag = t.isCallExpression(path.node.callee)
    ? path.node.callee.arguments[0]
    : t.stringLiteral(path.node.callee.property.name)
  return t.callExpression(identifier, [
    tag,
    t.arrayExpression(prefixAst(path.node.arguments, t)),
    t.arrayExpression()
  ])
}

export function replaceGlobalWithCallExpression (
  identifier,
  processQuasi,
  path,
  state,
  t
) {
  const { rules, hasInterpolation } = processQuasi(path.node.quasi)
  if (!hasInterpolation && !state.inline) {
    state.insertStaticRules(rules)
    if (t.isExpressionStatement(path.parent)) {
      path.parentPath.remove()
    } else {
      path.replaceWith(t.identifier('undefined'))
    }
  } else {
    path.replaceWith(
      t.callExpression(identifier, [
        t.arrayExpression(
          parseDynamicValues(rules, t, {
            inputExpressions: path.node.quasi.expressions
          })
        )
      ])
    )
  }
}

function prefixAst (args, t) {
  const prefixer = postcssJs.sync([autoprefixer])

  function isLiteral (value) {
    return (
        t.isStringLiteral(value) ||
        t.isNumericLiteral(value) ||
        t.isBooleanLiteral(value)
    )
  }
  if (Array.isArray(args)) {
    return args.map(element => prefixAst(element, t))
  }

  if (t.isObjectExpression(args)) {
    let properties = []
    args.properties.forEach(property => {
      // nested objects
      if (t.isObjectExpression(property.value)) {
        const key = t.isStringLiteral(property.key)
          ? t.stringLiteral(property.key.value)
          : t.identifier(property.key.name)
        return properties.push(
          t.objectProperty(key, prefixAst(property.value, t))
        )

        // literal value or array of literal values
      } else if (
        isLiteral(property.value) ||
        (t.isArrayExpression(property.value) &&
          property.value.elements.every(isLiteral))
      ) {
        // handle array values: { display: ['flex', 'block'] }
        const propertyValue = t.isArrayExpression(property.value)
          ? property.value.elements.map(element => element.value)
          : property.value.value

        const style = { [property.key.name]: propertyValue }
        const prefixedStyle = prefixer(style)

        for (var k in prefixedStyle) {
          const key = t.isStringLiteral(property.key)
            ? t.stringLiteral(k)
            : t.identifier(k)
          const val = prefixedStyle[k]
          let value

          if (typeof val === 'number') {
            value = t.numericLiteral(val)
          } else if (typeof val === 'string') {
            value = t.stringLiteral(val)
          } else if (Array.isArray(val)) {
            value = t.arrayExpression(val.map(i => t.stringLiteral(i)))
          }

          properties.push(t.objectProperty(key, value))
        }

        // expressions
      } else {
        properties.push(property)
      }
    })

    return t.objectExpression(properties)
  }

  if (t.isArrayExpression(args)) {
    return t.arrayExpression(prefixAst(args.elements, t))
  }

  return args
}

export function replaceCssWithCallExpression (path, identifier, state, t) {
  try {
    const { hash, name, rules, hasVar, composes, hasOtherMatch } = inline(
      path.node.quasi,
      getIdentifierName(path, t),
      'css',
      state.inline
    )
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
        return path.replaceWith(joinExpressionsWithSpaces(inputClasses, t))
      }
    } else if (rules.length !== 0) {
      const expressions = path.node.quasi.expressions.map((x, i) =>
        t.identifier(`x${i}`)
      )
      const inlineContentExpr = t.functionExpression(
        t.identifier('createEmotionRules'),
        expressions,
        t.blockStatement([
          t.returnStatement(
            t.arrayExpression(
              parseDynamicValues(rules, t, {
                inputExpressions: expressions,
                composes
              })
            )
          )
        ])
      )
      args.push(inlineContentExpr)
    }
    path.replaceWith(t.callExpression(identifier, args))
  } catch (e) {
    throw path.buildCodeFrameError(e)
  }
}

export function replaceKeyframesWithCallExpression (path, identifier, state, t) {
  const { hash, name, rules, hasInterpolation } = keyframes(
    path.node.quasi,
    getIdentifierName(path, t),
    'animation'
  )
  const animationName = `${name}-${hash}`
  if (!hasInterpolation && !state.inline) {
    state.insertStaticRules([`@keyframes ${animationName} ${rules.join('')}`])
    path.replaceWith(t.stringLiteral(animationName))
  } else {
    path.replaceWith(
      t.callExpression(identifier, [
        t.stringLiteral(animationName),
        t.arrayExpression(
          parseDynamicValues(rules, t, {
            inputExpressions: path.node.quasi.expressions
          })
        )
      ])
    )
  }
}

const visited = Symbol('visited')

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
      CallExpression (path) {
        if (path[visited]) {
          return
        }
        if (
          (t.isCallExpression(path.node.callee) &&
            path.node.callee.callee.name === 'styled') ||
          (t.isMemberExpression(path.node.callee) &&
            t.isIdentifier(path.node.callee.object) &&
            path.node.callee.object.name === 'styled')
        ) {
          const identifier = t.isCallExpression(path.node.callee)
            ? path.node.callee.callee
            : path.node.callee.object
          path.replaceWith(buildStyledObjectCallExpression(path, identifier, t))
        }

        if (t.isCallExpression(path.node) && path.node.callee.name === 'css') {
          const prefixedAst = prefixAst(path.node.arguments, t)
          path.replaceWith(t.callExpression(t.identifier('css'), prefixedAst))
        }
        path[visited] = true
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
        if (
          // styled.h1`color:${color};`
          t.isMemberExpression(path.node.tag) &&
          path.node.tag.object.name === 'styled'
        ) {
          path.replaceWith(
            buildStyledCallExpression(
              path.node.tag.object,
              t.stringLiteral(path.node.tag.property.name),
              path,
              state,
              t
            )
          )
        } else if (
          // styled('h1')`color:${color};`
          t.isCallExpression(path.node.tag) &&
          path.node.tag.callee.name === 'styled'
        ) {
          path.replaceWith(
            buildStyledCallExpression(
              path.node.tag.callee,
              path.node.tag.arguments[0],
              path,
              state,
              t
            )
          )
        } else if (t.isIdentifier(path.node.tag)) {
          if (path.node.tag.name === 'css') {
            replaceCssWithCallExpression(path, t.identifier('css'), state, t)
          } else if (path.node.tag.name === 'keyframes') {
            replaceKeyframesWithCallExpression(
              path,
              t.identifier('keyframes'),
              state,
              t
            )
          } else if (path.node.tag.name === 'fontFace') {
            replaceGlobalWithCallExpression(
              t.identifier('fontFace'),
              fontFace,
              path,
              state,
              t
            )
          } else if (path.node.tag.name === 'injectGlobal') {
            replaceGlobalWithCallExpression(
              t.identifier('injectGlobal'),
              injectGlobal,
              path,
              state,
              t
            )
          }
        }
      }
    }
  }
}
