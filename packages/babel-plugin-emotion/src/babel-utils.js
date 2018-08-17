// @flow
import nodePath from 'path'
import { hashArray } from './index'
import type { BabelPath, EmotionBabelPluginPass } from './index'
import type { Types, Identifier, Node } from 'babel-flow-types'

export { getLabelFromPath as getIdentifierName } from '@emotion/babel-utils'

function getBestNodeName(t, arg) {
  if (t.isLiteral(arg)) return arg.value
  if (arg.id && typeof arg.id.name !== 'undefined') return arg.id.name
  if (typeof arg.name !== 'undefined') return arg.name
  return null
}

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
  filename: string,
  t: Types,
  args: Node[]
) {
  if (!autoLabel) return null

  if (!identifierName && t && args && args.length > 0) {
    // Try to generate name based on first argument
    const argLabel = getBestNodeName(t, args[0])
    return argLabel ? `styled(${argLabel})` : null
  }

  if (!labelFormat) return identifierName.trim()

  const parsedPath = nodePath.parse(filename)
  const normalizedFilename = parsedPath.name.replace('.', '-')
  return labelFormat
    .replace(/\[local\]/gi, identifierName.trim())
    .replace(/\[filename\]/gi, normalizedFilename)
}

export function createRawStringFromTemplateLiteral(quasi: {
  quasis: Array<{ value: { cooked: string } }>
}) {
  let strs = quasi.quasis.map(x => x.value.cooked)
  let hash = hashArray([...strs])

  const src = strs
    .reduce((arr, str, i) => {
      arr.push(str)
      if (i !== strs.length - 1) {
        arr.push(`xxx${i}xxx`)
      }
      return arr
    }, [])
    .join('')
    .trim()
  return { src, hash }
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
