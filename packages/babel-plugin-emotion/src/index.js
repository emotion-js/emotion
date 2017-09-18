// @flow weak
import fs from 'fs'
import {
  basename,
  dirname,
  join as pathJoin,
  sep as pathSep,
  relative
} from 'path'
import { touchSync } from 'touch'
import { inline, getName } from './inline'
import { parseCSS } from './parser'
import { getIdentifierName } from './babel-utils'
import { hashArray, map } from 'emotion-utils'
import cssProps from './css-prop'
import ASTObject from './ast-object'

export function getFilename(path) {
  return path.hub.file.opts.filename === 'unknown'
    ? ''
    : path.hub.file.opts.filename
}

export function replaceCssWithCallExpression(
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
      return path.replaceWith(t.identifier('undefined'))
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

// babel-plugin-styled-components
// https://github.com/styled-components/babel-plugin-styled-components/blob/37a13e9c21c52148ce6e403100df54c0b1561a88/src/visitors/displayNameAndId.js#L49-L93

const findModuleRoot = filename => {
  if (!filename || filename === 'unknown') {
    return null
  }
  let dir = dirname(filename)
  if (fs.existsSync(pathJoin(dir, 'package.json'))) {
    return dir
  } else if (dir !== filename) {
    return findModuleRoot(dir)
  } else {
    return null
  }
}

const FILE_HASH = 'emotion-file-hash'
const COMPONENT_POSITION = 'emotion-component-position'

const getFileHash = state => {
  const { file } = state
  // hash calculation is costly due to fs operations, so we'll cache it per file.
  if (file.get(FILE_HASH)) {
    return file.get(FILE_HASH)
  }
  const filename = file.opts.filename
  // find module root directory
  const moduleRoot = findModuleRoot(filename)
  const filePath =
    moduleRoot && relative(moduleRoot, filename).replace(pathSep, '/')
  let moduleName = ''
  if (moduleRoot) {
    const packageJsonContent = fs.readFileSync(
      pathJoin(moduleRoot, 'package.json')
    )
    if (packageJsonContent) {
      try {
        moduleName = JSON.parse(packageJsonContent.toString()).name
      } catch (e) {}
    }
  }
  const code = file.code

  const fileHash = hashArray([moduleName, filePath, code])
  file.set(FILE_HASH, fileHash)
  return fileHash
}

const getNextId = state => {
  const id = state.file.get(COMPONENT_POSITION) || 0
  state.file.set(COMPONENT_POSITION, id + 1)
  return id
}

const getComponentId = (state, prefix: string = 'css') => {
  // Prefix the identifier with css- because CSS classes cannot start with a number
  // Also in snapshots with jest-glamor-react the hash will be replaced with an index
  return `${prefix}-${getFileHash(state)}${getNextId(state)}`
}

export function buildStyledCallExpression(identifier, tag, path, state, t) {
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
      t.stringLiteral(getComponentId(state, name)),
      t.arrayExpression([t.stringLiteral(`${name}-${hash}`)])
    ])
  }

  const { src, name } = inline(path.node.quasi, identifierName, 'css')

  path.addComment('leading', '#__PURE__')

  const { styles, composesCount } = parseCSS(src, false, getFilename(path))

  const objs = path.node.quasi.expressions.slice(0, composesCount)
  const vars = path.node.quasi.expressions.slice(composesCount)
  const args = [
    tag,
    t.stringLiteral(getComponentId(state, name)),
    t.arrayExpression(objs),
    t.arrayExpression(vars),
    t.functionExpression(
      t.identifier('createEmotionStyledRules'),
      vars.map((x, i) => t.identifier(`x${i}`)),
      t.blockStatement([
        t.returnStatement(ASTObject.fromJS(styles, composesCount, t).toAST())
      ])
    )
  ]

  return t.callExpression(identifier, args)
}

export function buildStyledObjectCallExpression(path, state, identifier, t) {
  const tag = t.isCallExpression(path.node.callee)
    ? path.node.callee.arguments[0]
    : t.stringLiteral(path.node.callee.property.name)
  return t.callExpression(identifier, [
    tag,
    t.stringLiteral(
      getComponentId(state, getName(getIdentifierName(path, t), 'css'))
    ),
    t.arrayExpression(
      buildProcessedStylesFromObjectAST(path.node.arguments, path, t)
    )
  ])
}

function buildProcessedStylesFromObjectAST(objectAST, path, t) {
  if (t.isObjectExpression(objectAST)) {
    return ASTObject.fromAST(objectAST, t, path).toAST()
  }
  if (t.isArrayExpression(objectAST)) {
    return t.arrayExpression(
      buildProcessedStylesFromObjectAST(objectAST.elements, path, t)
    )
  }
  if (Array.isArray(objectAST)) {
    return map(objectAST, obj =>
      buildProcessedStylesFromObjectAST(obj, path, t)
    )
  }

  return objectAST
}

export function replaceCssObjectCallExpression(path, identifier, t) {
  const argWithStyles = path.node.arguments[0]
  const styles = buildProcessedStylesFromObjectAST(argWithStyles, path, t)
  path.replaceWith(t.callExpression(identifier, [styles]))
}

const visited = Symbol('visited')

const defaultImportedNames = {
  styled: 'styled',
  css: 'css',
  keyframes: 'keyframes',
  injectGlobal: 'injectGlobal',
  fontFace: 'fontFace'
}

export default function(babel) {
  const { types: t } = babel

  return {
    name: 'emotion', // not required
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      Program: {
        enter(path, state) {
          state.importedNames = {
            ...defaultImportedNames,
            ...state.opts.importedNames
          }
          state.file.metadata.modules.imports.forEach(
            ({ source, imported, specifiers }) => {
              if (source.indexOf('emotion') !== -1) {
                const importedNames = specifiers
                  .filter(
                    v =>
                      [
                        'default',
                        'css',
                        'keyframes',
                        'injectGlobal',
                        'fontFace'
                      ].indexOf(v.imported) !== -1
                  )
                  .reduce(
                    (acc, { imported, local }) => ({
                      ...acc,
                      [imported === 'default' ? 'styled' : imported]: local
                    }),
                    defaultImportedNames
                  )
                state.importedNames = {
                  ...importedNames,
                  ...state.opts.importedNames
                }
              }
            }
          )

          state.extractStatic =
            // path.hub.file.opts.filename !== 'unknown' ||
            state.opts.extractStatic

          state.staticRules = []

          state.insertStaticRules = function(staticRules) {
            state.staticRules.push(...staticRules)
          }
        },
        exit(path, state) {
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
          if (state.cssPropIdentifier) {
            path.node.body.unshift(
              t.importDeclaration(
                [
                  t.importSpecifier(
                    state.cssPropIdentifier,
                    t.identifier('css')
                  )
                ],
                t.stringLiteral('emotion')
              )
            )
          }
        }
      },
      JSXOpeningElement(path, state) {
        cssProps(path, state, t)
      },
      CallExpression(path, state) {
        if (path[visited]) {
          return
        }
        try {
          if (
            (t.isCallExpression(path.node.callee) &&
              path.node.callee.callee.name === state.importedNames.styled) ||
            (t.isMemberExpression(path.node.callee) &&
              t.isIdentifier(path.node.callee.object) &&
              path.node.callee.object.name === state.importedNames.styled)
          ) {
            const identifier = t.isCallExpression(path.node.callee)
              ? path.node.callee.callee
              : path.node.callee.object
            path.replaceWith(
              buildStyledObjectCallExpression(path, state, identifier, t)
            )
          }
          if (
            path.node.callee.name === state.importedNames.css &&
            !path.node.arguments[1] &&
            path.node.arguments[0]
          ) {
            replaceCssObjectCallExpression(
              path,
              t.identifier(state.importedNames.css),
              t
            )
          }
        } catch (e) {
          throw path.buildCodeFrameError(e)
        }

        path[visited] = true
      },
      TaggedTemplateExpression(path, state) {
        if (
          // styled.h1`color:${color};`
          t.isMemberExpression(path.node.tag) &&
          path.node.tag.object.name === state.importedNames.styled
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
          path.node.tag.callee.name === state.importedNames.styled
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
          if (
            path.node.tag.name === state.importedNames.css ||
            path.node.tag === state.cssPropIdentifier
          ) {
            replaceCssWithCallExpression(path, path.node.tag, state, t)
          } else if (path.node.tag.name === state.importedNames.keyframes) {
            replaceCssWithCallExpression(
              path,
              path.node.tag,
              state,
              t,
              (name, hash, src) => `@keyframes ${name}-${hash} { ${src} }`
            )
          } else if (path.node.tag.name === state.importedNames.fontFace) {
            replaceCssWithCallExpression(
              path,
              path.node.tag,
              state,
              t,
              (name, hash, src) => `@font-face {${src}}`,
              true
            )
          } else if (path.node.tag.name === state.importedNames.injectGlobal) {
            replaceCssWithCallExpression(
              path,
              path.node.tag,
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
