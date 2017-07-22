// @flow weak
import fs from 'fs'
import { basename } from 'path'
import { touchSync } from 'touch'
import postcssJs from 'postcss-js'
import autoprefixer from 'autoprefixer'
import { forEach, map } from './utils'
import { inline } from './inline'
import { parseCSS, expandCSSFallbacks } from './parser'
import { getIdentifierName } from './babel-utils'
import cssProps from './css-prop'

export function replaceCssWithCallExpression (
  path,
  identifier,
  state,
  t,
  staticCSSTextCreator = (name, hash, src) => `.${name}-${hash} { ${src} }`,
  removePath = false
) {
  try {
    const { name, hash, src } = inline(
      path.node.quasi,
      getIdentifierName(path, t),
      'css'
    )
    if (state.extractStatic && !path.node.quasi.expressions.length) {
      const cssText = staticCSSTextCreator(name, hash, src)
      const { staticCSSRules } = parseCSS(cssText, true)

      state.insertStaticRules(staticCSSRules)
      return removePath
        ? path.remove()
        : path.replaceWith(t.stringLiteral(`${name}-${hash}`))
    }

    const { styles, composesCount } = parseCSS(src, false)

    const inputClasses = []
    const composeValues = []
    for (let i = 0; i < composesCount; i++) {
      composeValues.push(path.node.quasi.expressions[i])
    }

    inputClasses.push(createAstObj(styles, false, composesCount, t))

    const vars = path.node.quasi.expressions.slice(composesCount)
    path.replaceWith(
      t.callExpression(identifier, [
        t.arrayExpression(composeValues),
        t.arrayExpression(vars),
        t.functionExpression(
          t.identifier('createEmotionStyledRules'),
          vars.map((x, i) => t.identifier(`x${i}`)),
          t.blockStatement([t.returnStatement(t.arrayExpression(inputClasses))])
        )
      ])
    )
  } catch (e) {
    if (path) {
      throw path.buildCodeFrameError(e)
    }

    throw e
  }
}

export function buildStyledCallExpression (identifier, tag, path, state, t) {
  const identifierName = getIdentifierName(path, t)

  if (state.extractStatic && !path.node.quasi.expressions.length) {
    const { name, hash, src } = inline(
      path.node.quasi,
      identifierName,
      'styled' // we don't want these styles to be merged in css``
    )

    const cssText = `.${name}-${hash} { ${src} }`
    const { staticCSSRules } = parseCSS(cssText, true)

    state.insertStaticRules(staticCSSRules)
    return t.callExpression(identifier, [
      tag,
      t.arrayExpression([t.stringLiteral(`${name}-${hash}`)])
    ])
  }

  const { src } = inline(
    path.node.quasi,
    getIdentifierName(path, t),
    'css'
  )

  const { styles, composesCount } = parseCSS(src, false)
  // const inputClasses = []
  // const composeValues = []
  // for (let i = 0; i < composesCount; i++) {
  //   composeValues.push(path.node.quasi.expressions[i])
  // }

  const objs = path.node.quasi.expressions.slice(0, composesCount)
  const vars = path.node.quasi.expressions
    .slice(composesCount)
  const args = [
    tag,
    t.arrayExpression(objs),
    t.arrayExpression(vars),
    t.functionExpression(
      t.identifier('createEmotionStyledRules'),
      vars.map((x, i) => t.identifier(`x${i}`)),
      t.blockStatement([t.returnStatement(t.arrayExpression([createAstObj(styles, false, composesCount, t)]))])
    )
  ]

  return t.callExpression(identifier, args)
}

export function buildStyledObjectCallExpression (path, identifier, t) {
  const tag = t.isCallExpression(path.node.callee)
    ? path.node.callee.arguments[0]
    : t.stringLiteral(path.node.callee.property.name)
  return t.callExpression(identifier, [
    tag,
    t.arrayExpression(prefixAst(path.node.arguments, t))
  ])
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
        const prefixedStyle = expandCSSFallbacks(prefixer(style))

        for (let k in prefixedStyle) {
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

function getDynamicMatches (str) {
  const re = /xxx(\d+)xxx/gm
  let match
  const matches = []
  while ((match = re.exec(str)) !== null) {
    matches.push({
      value: match[0],
      p1: parseInt(match[1], 10),
      index: match.index
    })
  }

  return matches
}

function replacePlaceholdersWithExpressions (
  matches: any[],
  str: string,
  expressions?: any[],
  composesCount,
  t
) {
  console.log('matches', JSON.stringify(matches, null, 2))
  const templateElements = []
  const templateExpressions = []
  let cursor = 0
  let hasSingleInterpolation = false
  forEach(matches, ({ value, p1, index }, i) => {
    const preMatch = str.substring(cursor, index)
    console.log('value', value, 'preMatch', preMatch)
    cursor = cursor + preMatch.length + value.length
    if (preMatch) {
      templateElements.push(
        t.templateElement({ raw: preMatch, cooked: preMatch })
      )
    } else if (i === 0) {
      templateElements.push(t.templateElement({ raw: '', cooked: '' }))
    }
    if (value === str) {
      hasSingleInterpolation = true
    }

    templateExpressions.push(
      expressions
        ? expressions[p1 - composesCount]
        : t.identifier(`x${p1 - composesCount}`)
    )
    if (i === matches.length - 1) {
      templateElements.push(
        t.templateElement(
          {
            raw: str.substring(index + value.length),
            cooked: str.substring(index + value.length)
          },
          true
        )
      )
    }
  })
  // if (hasSingleInterpolation) {
  //   return templateExpressions[0]
  // }
  return t.templateLiteral(templateElements, templateExpressions)
}

function objKeyToAst (
  key,
  expressions,
  composesCount: number,
  t
): { computed: boolean, ast: any, composes: boolean } {
  const matches = getDynamicMatches(key)

  if (matches.length) {
    return {
      computed: true,
      composes: key === 'composes',
      ast: replacePlaceholdersWithExpressions(
        matches,
        key,
        expressions,
        composesCount,
        t
      )
    }
  }

  return {
    computed: false,
    composes: key === 'composes',
    ast: t.stringLiteral(key)
  }
}

function objValueToAst (value, expressions, composesCount, t) {
  if (typeof value === 'string') {
    const matches = getDynamicMatches(value)
    if (matches.length) {
      return replacePlaceholdersWithExpressions(
        matches,
        value,
        expressions,
        composesCount,
        t
      )
    }
    return t.stringLiteral(value)
  } else if (Array.isArray(value)) {
    console.log('value is an array', value)
    return t.arrayExpression(
      value.map(v => objValueToAst(v, expressions, composesCount, t))
    )
  }

  return createAstObj(value, expressions, composesCount, t)
}

function createAstObj (obj, expressions, composesCount, t) {
  const props = []

  for (let key in obj) {
    const rawValue = obj[key]
    const { computed, composes, ast: keyAST } = objKeyToAst(
      key,
      expressions,
      composesCount,
      t
    )

    let valueAST
    if (composes) {
      valueAST = t.arrayExpression(expressions.slice(0, composesCount))
    } else {
      valueAST = objValueToAst(rawValue, expressions, composesCount, t)
    }

    props.push(t.objectProperty(keyAST, valueAST, computed))
  }
  return t.objectExpression(props)
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
          state.extractStatic =
            // path.hub.file.opts.filename !== 'unknown' ||
            state.opts.extractStatic

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
            replaceCssWithCallExpression(
              path,
              t.identifier('keyframes'),
              state,
              t,
              (name, hash, src) => `@keyframes ${name}-${hash} { ${src} }`
            )
          } else if (path.node.tag.name === 'fontFace') {
            replaceCssWithCallExpression(
              path,
              t.identifier('fontFace'),
              state,
              t,
              (name, hash, src) => `@font-face {${src}}`,
              true
            )
          } else if (path.node.tag.name === 'injectGlobal') {
            replaceCssWithCallExpression(
              path,
              t.identifier('injectGlobal'),
              state,
              t,
              (name, hash, src) => src,
              true
            )
          }
        }
      }
    }
  }
}
