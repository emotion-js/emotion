// @flow
import fs from 'fs'
import nodePath from 'path'
import findRoot from 'find-root'
import { touchSync } from 'touch'
import { addSideEffect } from '@babel/helper-module-imports'
import {
  getIdentifierName,
  getName,
  createRawStringFromTemplateLiteral,
  minify,
  getLabel
} from './babel-utils'
import type {
  BabelPath as _BabelPath,
  Identifier,
  BabelPluginPass,
  Types,
  StringLiteral,
  Babel
} from 'babel-flow-types'
import { hashString, Stylis, memoize } from 'emotion-utils'
import { addSourceMaps } from './source-map'

import cssProps from './css-prop'
import ASTObject from './ast-object'

export type BabelPath = _BabelPath & {
  node: *
}

export function hashArray(arr: Array<string>) {
  return hashString(arr.join(''))
}

const staticStylis = new Stylis({ keyframe: false })

export function hoistPureArgs(path: BabelPath) {
  const args = path.get('arguments')

  if (args && Array.isArray(args)) {
    args.forEach(arg => {
      if (!arg.isIdentifier() && arg.isPure()) {
        arg.hoist()
      }
    })
  }
}

type ImportedNames = {
  css: string,
  keyframes: string,
  injectGlobal: string,
  styled: string,
  merge: string
}

export type EmotionBabelPluginPass = BabelPluginPass & {
  extractStatic: boolean,
  insertStaticRules: (rules: Array<string>) => void,
  emotionImportPath: string,
  staticRules: Array<string>,
  cssPropIdentifiers: Array<Identifier>,
  importedNames: ImportedNames,
  count: number,
  opts: any
}

export function replaceCssWithCallExpression(
  path: BabelPath,
  identifier: Identifier,
  state: EmotionBabelPluginPass,
  t: Types,
  staticCSSSrcCreator: (
    src: string,
    name: string,
    hash: string
  ) => string = src => src,
  removePath: boolean = false,
  staticCSSSelectorCreator: (name: string, hash: string) => string = (
    name,
    hash
  ) => `.${name}-${hash}`
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

    const label = getLabel(
      identifierName,
      state.opts.autoLabel,
      state.opts.labelFormat,
      state.file.opts.filename
    )

    path.replaceWith(
      t.callExpression(
        identifier,
        new ASTObject(minify(src), path.node.quasi.expressions, t)
          .toExpressions()
          .concat(label ? [t.stringLiteral(`label:${label};`)] : [])
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

const unsafeRequire = require

const getPackageRootPath = memoize(filename => findRoot(filename))

function buildTargetObjectProperty(path, state, t) {
  if (state.count === undefined) {
    state.count = 0
  }

  const filename = state.file.opts.filename

  // normalize the file path to ignore folder structure
  // outside the current node project and arch-specific delimiters
  let moduleName = ''
  let rootPath = filename

  try {
    rootPath = getPackageRootPath(filename)
    moduleName = unsafeRequire(rootPath + '/package.json').name
  } catch (err) {}

  const finalPath =
    filename === rootPath
      ? nodePath.basename(filename)
      : filename.slice(rootPath.length)

  const positionInFile = state.count++

  const stuffToHash = [moduleName]

  if (finalPath) {
    stuffToHash.push(nodePath.normalize(finalPath))
  } else {
    stuffToHash.push(state.file.code)
  }

  const stableClassName = `e${hashArray(stuffToHash)}${positionInFile}`

  return t.objectProperty(
    t.identifier('target'),
    t.stringLiteral(stableClassName)
  )
}
export function buildStyledCallExpression(
  identifier: Identifier,
  tag: StringLiteral,
  path: BabelPath,
  state: EmotionBabelPluginPass,
  t: Types
) {
  const identifierName = getIdentifierName(path, t)

  const targetProperty = buildTargetObjectProperty(path, state, t)

  if (state.extractStatic && !path.node.quasi.expressions.length) {
    const { hash, src } = createRawStringFromTemplateLiteral(path.node.quasi)
    const staticClassName = `css-${hash}`
    const staticCSSRules = staticStylis(`.${staticClassName}`, src)

    state.insertStaticRules([staticCSSRules])

    return t.callExpression(
      t.callExpression(identifier, [
        tag,
        t.objectExpression([
          t.objectProperty(t.identifier('e'), t.stringLiteral(staticClassName)),
          targetProperty
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

  let labelProperty

  const label = getLabel(
    identifierName,
    state.opts.autoLabel,
    state.opts.labelFormat,
    state.file.opts.filename
  )

  if (label) {
    labelProperty = t.objectProperty(
      t.identifier('label'),
      t.stringLiteral(label)
    )
  }

  return t.callExpression(
    t.callExpression(identifier, [
      tag,
      t.objectExpression([labelProperty, targetProperty].filter(Boolean))
    ]),
    new ASTObject(minify(src), path.node.quasi.expressions, t).toExpressions()
  )
}

export function buildStyledObjectCallExpression(
  path: BabelPath,
  state: EmotionBabelPluginPass,
  identifier: Identifier,
  t: Types
) {
  const targetProperty = buildTargetObjectProperty(path, state, t)
  const identifierName = getIdentifierName(path, t)
  const tag = t.isCallExpression(path.node.callee)
    ? path.node.callee.arguments[0]
    : t.stringLiteral(path.node.callee.property.name)

  let args = path.node.arguments
  if (state.opts.sourceMap === true && path.node.loc !== undefined) {
    args.push(t.stringLiteral(addSourceMaps(path.node.loc.start, state)))
  }

  const objectProperties = [targetProperty]
  const label = getLabel(
    identifierName,
    state.opts.autoLabel,
    state.opts.labelFormat,
    state.file.opts.filename
  )

  if (label) {
    objectProperties.push(
      t.objectProperty(t.identifier('label'), t.stringLiteral(label))
    )
  }

  path.addComment('leading', '#__PURE__')

  return t.callExpression(
    t.callExpression(identifier, [tag, t.objectExpression(objectProperties)]),
    args
  )
}

const visited = Symbol('visited')

const defaultImportedNames: ImportedNames = {
  styled: 'styled',
  css: 'css',
  keyframes: 'keyframes',
  injectGlobal: 'injectGlobal',
  merge: 'merge'
}

const importedNameKeys = Object.keys(defaultImportedNames).map(
  key => (key === 'styled' ? 'default' : key)
)

const defaultEmotionPaths = ['emotion', 'react-emotion', 'preact-emotion']

function getRelativePath(filepath: string, absoluteInstancePath: string) {
  let relativePath = nodePath.relative(
    nodePath.dirname(filepath),
    absoluteInstancePath
  )

  return relativePath.charAt(0) === '.' ? relativePath : `./${relativePath}`
}

function getAbsolutePath(instancePath: string, rootPath: string) {
  if (instancePath.charAt(0) === '.') {
    let absoluteInstancePath = nodePath.resolve(rootPath, instancePath)
    return absoluteInstancePath
  }
  return false
}

function getInstancePathToImport(instancePath: string, filepath: string) {
  let absolutePath = getAbsolutePath(instancePath, process.cwd())
  if (absolutePath === false) {
    return instancePath
  }
  return getRelativePath(filepath, absolutePath)
}

function getInstancePathToCompare(instancePath: string, rootPath: string) {
  let absolutePath = getAbsolutePath(instancePath, rootPath)
  if (absolutePath === false) {
    return instancePath
  }
  return absolutePath
}

export default function(babel: Babel) {
  const { types: t } = babel

  return {
    name: 'emotion', // not required
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      Program: {
        enter(path: BabelPath, state: EmotionBabelPluginPass) {
          const hasFilepath =
            path.hub.file.opts.filename &&
            path.hub.file.opts.filename !== 'unknown'
          state.emotionImportPath = 'emotion'
          if (state.opts.primaryInstance !== undefined) {
            state.emotionImportPath = getInstancePathToImport(
              state.opts.primaryInstance,
              path.hub.file.opts.filename
            )
          }

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
          const emotionPaths = defaultEmotionPaths.concat(
            (state.opts.instances || []).map(instancePath =>
              getInstancePathToCompare(instancePath, process.cwd())
            )
          )
          let dirname = hasFilepath
            ? nodePath.dirname(path.hub.file.opts.filename)
            : ''
          imports.forEach(({ source, imported, specifiers }) => {
            if (
              emotionPaths.indexOf(
                getInstancePathToCompare(source, dirname)
              ) !== -1
            ) {
              const importedNames = specifiers
                .filter(v => importedNameKeys.indexOf(v.imported) !== -1)
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
          state.cssPropIdentifiers = []
          state.extractStatic =
            // path.hub.file.opts.filename !== 'unknown' ||
            state.opts.extractStatic

          state.staticRules = []

          state.insertStaticRules = function(staticRules) {
            state.staticRules.push(...staticRules)
          }
        },
        exit(path: BabelPath, state: EmotionBabelPluginPass) {
          if (state.staticRules.length !== 0) {
            const toWrite = state.staticRules.join('\n').trim()
            const filenameArr = path.hub.file.opts.filename.split('.')
            filenameArr.pop()
            filenameArr.push('emotion', 'css')
            const cssFilename = filenameArr.join('.')
            const exists = fs.existsSync(cssFilename)
            addSideEffect(path, './' + nodePath.basename(cssFilename))
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
      JSXOpeningElement(path: BabelPath, state: EmotionBabelPluginPass) {
        cssProps(path, state, t)
        if (state.opts.hoist) {
          path.traverse({
            CallExpression(callExprPath) {
              if (
                callExprPath.node.callee.name === state.importedNames.css ||
                state.cssPropIdentifiers.indexOf(callExprPath.node.callee) !==
                  -1
              ) {
                hoistPureArgs(callExprPath)
              }
            }
          })
        }
      },
      CallExpression: {
        enter(path: BabelPath, state: EmotionBabelPluginPass) {
          // $FlowFixMe
          if (path[visited]) {
            return
          }
          try {
            if (t.isIdentifier(path.node.callee)) {
              switch (path.node.callee.name) {
                case state.importedNames.css:
                case state.importedNames.keyframes: {
                  path.addComment('leading', '#__PURE__')
                  const label = getLabel(
                    getIdentifierName(path, t),
                    state.opts.autoLabel,
                    state.opts.labelFormat,
                    state.file.opts.filename
                  )
                  if (label) {
                    path.node.arguments.push(t.stringLiteral(`label:${label};`))
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
          // $FlowFixMe
          path[visited] = true
        },
        exit(path: BabelPath, state: EmotionBabelPluginPass) {
          try {
            if (
              path.node.callee &&
              path.node.callee.property &&
              path.node.callee.property.name === 'withComponent'
            ) {
              if (path.node.arguments.length === 1) {
                path.node.arguments.push(
                  t.objectExpression([
                    buildTargetObjectProperty(path, state, t)
                  ])
                )
              }
            }
          } catch (e) {
            throw path.buildCodeFrameError(e)
          }
        }
      },
      TaggedTemplateExpression(path: BabelPath, state: EmotionBabelPluginPass) {
        // $FlowFixMe
        if (path[visited]) {
          return
        }
        // $FlowFixMe
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
            state.cssPropIdentifiers.indexOf(path.node.tag) !== -1
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
