import { hashArray } from './index'

function getDeclaratorName(path, t) {
  const parent = path.findParent(p => p.isVariableDeclarator())
  return parent && t.isIdentifier(parent.node.id) ? parent.node.id.name : ''
}

export function getIdentifierName(path, t) {
  const classParent = path.findParent(p => t.isClass(p))
  if (classParent && classParent.node.id) {
    return t.isIdentifier(classParent.node.id) ? classParent.node.id.name : ''
  } else if (
    classParent &&
    classParent.node.superClass &&
    classParent.node.superClass.name
  ) {
    return `${getDeclaratorName(path, t)}(${classParent.node.superClass.name})`
  }

  return getDeclaratorName(path, t)
}

export function getRuntimeImportPath(path, t) {
  const binding = path.scope.getBinding(path.node.name)
  if (!t.isImportDeclaration(binding.path.parentPath)) {
    throw binding.path.buildCodeFrameError(
      'the emotion macro must be imported with es modules'
    )
  }
  const importPath = binding.path.parentPath.node.source.value
  return importPath.match(/(.*)\/macro/)[1]
}

export function buildMacroRuntimeNode(path, state, importName, t) {
  const runtimeImportPath = getRuntimeImportPath(path, t)
  if (state.emotionImports === undefined) state.emotionImports = {}
  if (state.emotionImports[runtimeImportPath] === undefined) {
    state.emotionImports[runtimeImportPath] = {}
  }
  if (state.emotionImports[runtimeImportPath][importName] === undefined) {
    state.emotionImports[runtimeImportPath][
      importName
    ] = path.scope.generateUidIdentifier(path.node.name)
  }
  return state.emotionImports[runtimeImportPath][importName]
}

export function addRuntimeImports(state, t) {
  if (state.emotionImports === undefined) return
  Object.keys(state.emotionImports).forEach(importPath => {
    const importSpecifiers = []
    Object.keys(state.emotionImports[importPath]).forEach(importName => {
      const identifier = state.emotionImports[importPath][importName]
      if (importName === 'default') {
        importSpecifiers.push(t.importDefaultSpecifier(identifier))
      } else {
        importSpecifiers.push(
          t.importSpecifier(identifier, t.identifier(importName))
        )
      }
    })
    state.file.path.node.body.unshift(
      t.importDeclaration(importSpecifiers, t.stringLiteral(importPath))
    )
  })
  state.emotionImports = undefined
}
export function getName(identifierName?: string, prefix: string): string {
  const parts = []
  parts.push(prefix)
  if (identifierName) {
    parts.push(identifierName)
  }
  return parts.join('-')
}

export function createRawStringFromTemplateLiteral(quasi: {
  quasis: Array<{ value: { cooked: string } }>
}): { src: string, dynamicValueCount: number } {
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

// babel-plugin-styled-components
// https://github.com/styled-components/babel-plugin-styled-components/blob/8d44acc36f067d60d4e09f9c22ff89695bc332d2/src/minify/index.js

const symbolRegex = /(\s*[;:{},]\s*)/g

// Counts occurences of substr inside str
const countOccurences = (str, substr) => str.split(substr).length - 1

export const minify = code =>
  code.split(symbolRegex).reduce((str, fragment, index) => {
    // Even-indices are non-symbol fragments
    if (index % 2 === 0) {
      return str + fragment
    }

    // Only manipulate symbols outside of strings
    if (
      countOccurences(str, "'") % 2 === 0 &&
      countOccurences(str, '"') % 2 === 0
    ) {
      return str + fragment.trim()
    }

    return str + fragment
  }, '')
