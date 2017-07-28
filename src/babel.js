// @flow weak
import fs from 'fs'
import { basename } from 'path'
import { touchSync } from 'touch'
import { inline } from './inline'
import { parseCSS } from './parser'
import { getIdentifierName } from './babel-utils'
import { map } from './utils'
import cssProps from './css-prop'
import ASTObject from './ast-object'

function getFilename (path) {
  return path.hub.file.opts.filename === 'unknown' ? '' : path.hub.file.opts.filename
}

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
      const { staticCSSRules } = parseCSS(cssText, true, getFilename(path))

      state.insertStaticRules(staticCSSRules)
      if (!removePath) {
        return path.replaceWith(t.stringLiteral(`${name}-${hash}`))
      }
      if (t.isExpressionStatement(path.parent)) {
        path.parentPath.remove()
      } else {
        path.replaceWith(t.identifier('undefined'))
      }
      return
    }

    const { styles, composesCount } = parseCSS(src, false, getFilename(path))

    if (!removePath) {
      path.addComment('leading', '#__PURE__')
    }

    const composeValues = path.node.quasi.expressions.slice(0, composesCount)
    const vars = path.node.quasi.expressions.slice(composesCount)
    path.replaceWith(
      t.callExpression(identifier, [
        t.arrayExpression(composeValues),
        t.arrayExpression(vars),
        t.functionExpression(
          t.identifier('createEmotionStyledRules'),
          vars.map((x, i) => t.identifier(`x${i}`)),
          t.blockStatement([
            t.returnStatement(
              t.arrayExpression([
                ASTObject.fromJS(styles, composesCount, t).toAST()
              ])
            )
          ])
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
    const { staticCSSRules } = parseCSS(cssText, true, getFilename(path))

    state.insertStaticRules(staticCSSRules)
    return t.callExpression(identifier, [
      tag,
      t.arrayExpression([t.stringLiteral(`${name}-${hash}`)])
    ])
  }

  const { src } = inline(path.node.quasi, identifierName, 'css')

  path.addComment('leading', '#__PURE__')

  const { styles, composesCount } = parseCSS(src, false, getFilename(path))

  const objs = path.node.quasi.expressions.slice(0, composesCount)
  const vars = path.node.quasi.expressions.slice(composesCount)
  const obj = ASTObject.fromJS(styles, composesCount, t)
  const args = [
    tag,
    t.arrayExpression(objs),
    t.arrayExpression(vars),
    t.functionExpression(
      t.identifier('createEmotionStyledRules'),
      vars.map((x, i) => t.identifier(`x${i}`)),
      t.blockStatement([
        t.returnStatement(
          t.arrayExpression([
            obj.toAST()
          ])
        )
      ])
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
    t.arrayExpression(buildProcessedStylesFromObjectAST(path.node.arguments, path, t))
  ])
}

function buildProcessedStylesFromObjectAST (objectAST, path, t) {
  if (t.isObjectExpression(objectAST)) {
    const astObject = ASTObject.fromAST(objectAST, t)
    const { styles } = parseCSS(astObject, false, getFilename(path))
    return astObject.merge(styles).toAST()
  }
  if (t.isArrayExpression(objectAST)) {
    return t.arrayExpression(
      buildProcessedStylesFromObjectAST(objectAST.elements, path, t)
    )
  }
  if (Array.isArray(objectAST)) {
    return map(objectAST, obj => buildProcessedStylesFromObjectAST(obj, path, t))
  }

  return objectAST
}

export function replaceCssObjectCallExpression (path, identifier, t) {
  const argWithStyles = path.node.arguments[0]
  const styles = buildProcessedStylesFromObjectAST(argWithStyles, path, t)
  path.replaceWith(t.callExpression(identifier, [styles]))
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
        try {
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
            path.replaceWith(
              buildStyledObjectCallExpression(path, identifier, t)
            )
          }
          if (
            path.node.callee.name === 'css' &&
            !path.node.arguments[1] &&
            path.node.arguments[0]
          ) {
            replaceCssObjectCallExpression(path, t.identifier('css'), t)
          }
        } catch (e) {
          throw path.buildCodeFrameError(e)
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
