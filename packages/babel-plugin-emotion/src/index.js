// @flow weak
import fs from 'fs'
import { basename } from 'path'
import { touchSync } from 'touch'
import { addSideEffect } from '@babel/helper-module-imports'
import {
  getIdentifierName,
  getName,
  createRawStringFromTemplateLiteral,
  minify
} from './babel-utils'

import { hashString, Stylis } from 'emotion-utils'
import { addSourceMaps } from './source-map'

import cssProps from './css-prop'
import ASTObject from './ast-object'

export function hashArray(arr) {
  return hashString(arr.join(''))
}

const staticStylis = new Stylis({ keyframe: false })

export function hoistPureArgs(path) {
  const args = path.get('arguments')

  if (args && Array.isArray(args)) {
    args.forEach(arg => {
      if (!arg.isIdentifier() && arg.isPure()) {
        arg.hoist()
      }
    })
  }
}

export function replaceCssWithCallExpression(
  path,
  identifier,
  state,
  t,
  staticCSSSrcCreator = src => src,
  removePath = false,
  staticCSSSelectorCreator = (name, hash) => `.${name}-${hash}`
) {
  try {
    let { hash, src } = createRawStringFromTemplateLiteral(path.node.quasi)
    const identifierName = getIdentifierName(path, t)
    const name = getName(identifierName, 'css')

    if (state.extractStatic && !path.node.quasi.expressions.length) {
      const staticCSSRules = staticStylis(
        staticCSSSelectorCreator(name, hash),
        staticCSSSrcCreator(src, name, hash)
      )
      state.insertStaticRules([staticCSSRules])
      if (!removePath) {
        return path.replaceWith(t.stringLiteral(`${name}-${hash}`))
      }
      return path.replaceWith(t.identifier('undefined'))
    }

    if (!removePath) {
      path.addComment('leading', '#__PURE__')
    }
    if (state.opts.sourceMap === true && path.node.quasi.loc !== undefined) {
      src += addSourceMaps(path.node.quasi.loc.start, state)
    }

    path.replaceWith(
      t.callExpression(
        identifier,
        new ASTObject(minify(src), path.node.quasi.expressions, t)
          .toExpressions()
          .concat(
            state.opts.autoLabel && identifierName
              ? [t.stringLiteral(`label:${identifierName.trim()};`)]
              : []
          )
      )
    )

    if (state.opts.hoist) {
      hoistPureArgs(path)
    }

    return
  } catch (e) {
    if (path) {
      throw path.buildCodeFrameError(e)
    }

    throw e
  }
}

export function buildStyledCallExpression(identifier, tag, path, state, t) {
  const identifierName = getIdentifierName(path, t)

  if (state.extractStatic && !path.node.quasi.expressions.length) {
    const { hash, src } = createRawStringFromTemplateLiteral(
      path.node.quasi,
      identifierName,
      'styled' // we don't want these styles to be merged in css``
    )
    const staticClassName = `css-${hash}`
    const staticCSSRules = staticStylis(`.${staticClassName}`, src)

    state.insertStaticRules([staticCSSRules])
    return t.callExpression(
      t.callExpression(identifier, [
        tag,
        t.objectExpression([
          t.objectProperty(t.identifier('e'), t.stringLiteral(staticClassName))
        ])
      ]),
      []
    )
  }

  let { src } = createRawStringFromTemplateLiteral(path.node.quasi)

  path.addComment('leading', '#__PURE__')

  if (state.opts.sourceMap === true && path.node.quasi.loc !== undefined) {
    src += addSourceMaps(path.node.quasi.loc.start, state)
  }

  return t.callExpression(
    t.callExpression(
      identifier,
      state.opts.autoLabel && identifierName
        ? [
            tag,
            t.objectExpression([
              t.objectProperty(
                t.identifier('label'),
                t.stringLiteral(identifierName.trim())
              )
            ])
          ]
        : [tag]
    ),
    new ASTObject(minify(src), path.node.quasi.expressions, t).toExpressions()
  )
}

export function buildStyledObjectCallExpression(path, state, identifier, t) {
  const identifierName = getIdentifierName(path, t)
  const tag = t.isCallExpression(path.node.callee)
    ? path.node.callee.arguments[0]
    : t.stringLiteral(path.node.callee.property.name)

  let args = path.node.arguments
  if (state.opts.sourceMap === true && path.node.loc !== undefined) {
    args.push(t.stringLiteral(addSourceMaps(path.node.loc.start, state)))
  }

  path.addComment('leading', '#__PURE__')

  return t.callExpression(
    t.callExpression(
      identifier,
      state.opts.autoLabel && identifierName
        ? [
            tag,
            t.objectExpression([
              t.objectProperty(
                t.identifier('label'),
                t.stringLiteral(identifierName.trim())
              )
            ])
          ]
        : [tag]
    ),
    args
  )
}

const visited = Symbol('visited')

const defaultImportedNames = {
  styled: 'styled',
  css: 'css',
  keyframes: 'keyframes',
  injectGlobal: 'injectGlobal',
  merge: 'merge'
}

const defaultEmotionPaths = ['emotion', 'react-emotion', 'preact-emotion']

export default function(babel) {
  const { types: t } = babel

  return {
    name: 'emotion', // not required
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      Program: {
        enter(path, state) {
          // this needs to handle relative paths and stuff
          // https://github.com/tleunen/babel-plugin-module-resolver/tree/master/src
          state.emotionImportPath =
            state.opts.primaryPath !== undefined
              ? state.opts.primaryPath
              : 'emotion'

          state.importedNames = {
            ...defaultImportedNames,
            ...state.opts.importedNames
          }

          const imports = []

          let isModule = false

          for (const node of path.node.body) {
            if (t.isModuleDeclaration(node)) {
              isModule = true
              break
            }
          }

          if (isModule) {
            path.traverse({
              ImportDeclaration: {
                exit(path) {
                  const { node } = path

                  const imported = []
                  const specifiers = []

                  imports.push({
                    source: node.source.value,
                    imported,
                    specifiers
                  })

                  for (const specifier of path.get('specifiers')) {
                    const local = specifier.node.local.name

                    if (specifier.isImportDefaultSpecifier()) {
                      imported.push('default')
                      specifiers.push({
                        kind: 'named',
                        imported: 'default',
                        local
                      })
                    }

                    if (specifier.isImportSpecifier()) {
                      const importedName = specifier.node.imported.name
                      imported.push(importedName)
                      specifiers.push({
                        kind: 'named',
                        imported: importedName,
                        local
                      })
                    }
                  }
                }
              }
            })
          }

          imports.forEach(({ source, imported, specifiers }) => {
            if (
              defaultEmotionPaths
                .concat(state.opts.paths || [])
                .indexOf(source) !== -1
            ) {
              const importedNames = specifiers
                .filter(
                  v =>
                    [
                      'default',
                      'css',
                      'keyframes',
                      'injectGlobal',
                      'merge'
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
          })

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
            addSideEffect(path, './' + basename(cssFilename))
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
      JSXOpeningElement(path, state) {
        cssProps(path, state, t)
        if (state.opts.hoist) {
          path.traverse({
            CallExpression(callExprPath) {
              if (
                callExprPath.node.callee.name === state.importedNames.css ||
                callExprPath.node.callee === state.cssPropIdentifier
              ) {
                hoistPureArgs(callExprPath)
              }
            }
          })
        }
      },
      CallExpression(path, state) {
        if (path[visited]) {
          return
        }
        try {
          if (t.isIdentifier(path.node.callee)) {
            switch (path.node.callee.name) {
              case state.importedNames.css:
              case state.importedNames.keyframes: {
                path.addComment('leading', '#__PURE__')
                if (state.opts.autoLabel) {
                  const identifierName = getIdentifierName(path, t)
                  if (identifierName) {
                    path.node.arguments.push(
                      t.stringLiteral(`label:${identifierName.trim()};`)
                    )
                  }
                }
              }
              // eslint-disable-next-line no-fallthrough
              case state.importedNames.injectGlobal:
                if (
                  state.opts.sourceMap === true &&
                  path.node.loc !== undefined
                ) {
                  path.node.arguments.push(
                    t.stringLiteral(addSourceMaps(path.node.loc.start, state))
                  )
                }
            }
          }

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

            if (state.opts.hoist) {
              hoistPureArgs(path)
            }
          }
        } catch (e) {
          throw path.buildCodeFrameError(e)
        }

        path[visited] = true
      },
      TaggedTemplateExpression(path, state) {
        if (path[visited]) {
          return
        }
        path[visited] = true
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
              (src, name, hash) => `@keyframes ${name}-${hash} { ${src} }`,
              false,
              () => ''
            )
          } else if (path.node.tag.name === state.importedNames.injectGlobal) {
            replaceCssWithCallExpression(
              path,
              path.node.tag,
              state,
              t,
              undefined,
              true,
              () => ''
            )
          }
        }
      }
    }
  }
}
