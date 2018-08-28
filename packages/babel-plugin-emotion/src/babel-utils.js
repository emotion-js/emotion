// @flow
import nodePath from 'path'
import type { BabelPath, EmotionBabelPluginPass } from './index'
import type { Types, Identifier } from 'babel-flow-types'

export { getLabelFromPath as getIdentifierName } from '@emotion/babel-utils'

function cloneNode(t: any, node) {
  return (typeof t.cloneNode === 'function' ? t.cloneNode : t.cloneDeep)(node)
}

export function getRuntimeImportPath(path: BabelPath, t: Types) {
  // $FlowFixMe
  const binding = path.scope.getBinding(path.node.name)
  if (!t.isImportDeclaration(binding.path.parentPath)) {
    throw binding.path.buildCodeFrameError(
      'the emotion macro must be imported with es modules'
    )
  }
  const importPath = binding.path.parentPath.node.source.value
  return importPath.match(/(.*)\/macro/)[1]
}

type EmotionMacroPluginPass = EmotionBabelPluginPass & {
  emotionImports: void | {
    [key: string]: {
      [key: string]: Identifier
    }
  }
}

export function buildMacroRuntimeNode(
  path: BabelPath,
  state: EmotionMacroPluginPass,
  importName: string,
  t: Types
): Identifier {
  const runtimeImportPath = getRuntimeImportPath(path, t)
  if (state.emotionImports === undefined) state.emotionImports = {}
  if (state.emotionImports[runtimeImportPath] === undefined) {
    state.emotionImports[runtimeImportPath] = {}
  }
  if (state.emotionImports[runtimeImportPath][importName] === undefined) {
    // $FlowFixMe
    state.emotionImports[runtimeImportPath][
      importName
    ] = path.scope.generateUidIdentifier(path.node.name)
  }
  // $FlowFixMe
  return cloneNode(t, state.emotionImports[runtimeImportPath][importName])
}

export function addRuntimeImports(state: EmotionMacroPluginPass, t: Types) {
  if (state.emotionImports) {
    const emotionImports = state.emotionImports
    Object.keys(emotionImports).forEach(importPath => {
      const importSpecifiers = []
      Object.keys(emotionImports[importPath]).forEach(importName => {
        const identifier = emotionImports[importPath][importName]
        if (importName === 'default') {
          importSpecifiers.push(t.importDefaultSpecifier(identifier))
        } else {
          importSpecifiers.push(
            t.importSpecifier(identifier, t.identifier(importName))
          )
        }
      })
      // $FlowFixMe
      state.file.path.node.body.unshift(
        t.importDeclaration(importSpecifiers, t.stringLiteral(importPath))
      )
    })
    state.emotionImports = undefined
  }
}
export function getName(identifierName?: string, prefix: string) {
  const parts = []
  parts.push(prefix)
  if (identifierName) {
    parts.push(identifierName)
  }
  return parts.join('-')
}

export function getLabel(
  identifierName?: string,
  autoLabel: boolean,
  labelFormat?: string,
  filename: string
) {
  if (!identifierName || !autoLabel) return null
  if (!labelFormat) return identifierName.trim()

  const parsedPath = nodePath.parse(filename)
  const normalizedFilename = parsedPath.name.replace('.', '-')
  return labelFormat
    .replace(/\[local\]/gi, identifierName.trim())
    .replace(/\[filename\]/gi, normalizedFilename)
}

export function omit(
  obj: { [string]: any },
  testFn: (key: string, obj: any) => boolean
) {
  let target: { [string]: any } = {}
  let i: string
  for (i in obj) {
    if (!testFn(i, obj)) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

export { appendStringToExpressions } from '@emotion/babel-utils'
