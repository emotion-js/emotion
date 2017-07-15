import { keys } from './utils'
import forEach from '@arr/forEach'

export function getIdentifierName (path, t) {
  const parent = path.findParent(p => p.isVariableDeclarator())
  return parent && t.isIdentifier(parent.node.id) ? parent.node.id.name : ''
}

export function getRuntimeImportPath (path, t) {
  const binding = path.scope.getBinding(path.node.name)
  const importPath = binding.path.parentPath.node.source.value
  return importPath.match(/(.*)\/macro/)[1]
}

export function buildMacroRuntimeNode (path, state, importName, t) {
  const runtimeImportPath = getRuntimeImportPath(path, t)
  if (state.emotionImports === undefined) state.emotionImports = {}
  if (state.emotionImports[runtimeImportPath] === undefined) state.emotionImports[runtimeImportPath] = {}
  if (state.emotionImports[runtimeImportPath][importName] === undefined) {
    state.emotionImports[runtimeImportPath][importName] = path.scope.generateUidIdentifier(path.node.name)
  }
  return state.emotionImports[runtimeImportPath][importName]
  // return t.memberExpression(
  //   t.callExpression(t.identifier('require'), [
  //     t.stringLiteral(runtimeImportPath)
  //   ]),
  //   t.identifier(importName)
  // )
}

export function addRuntimeImports (state, t) {
  if (state.emotionImports === undefined) return
  const programPath = state.file.path
  forEach(keys(state.emotionImports), (importPath) => {
    const importSpecifiers = []
    forEach(keys(state.emotionImports[importPath]), (importName) => {
      const identifier = state.emotionImports[importPath][importName]
      if (importName === 'default') {
        importSpecifiers.push(t.importDefaultSpecifier(identifier))
      } else {
        importSpecifiers.push(t.importSpecifier(identifier, t.identifier(importName)))
      }
    })
    programPath.node.body.unshift(t.importDeclaration(importSpecifiers, t.stringLiteral(importPath)))
  })
  state.emotionImports = undefined
}
