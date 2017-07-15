export function getIdentifierName (path, t) {
  const parent = path.findParent(p => p.isVariableDeclarator())
  return parent && t.isIdentifier(parent.node.id) ? parent.node.id.name : ''
}

export function getRuntimeImportPath (path, t) {
  const binding = path.scope.getBinding(path.node.name)
  // console.log(binding)
  const thing = binding.path.parentPath.node.source.value
  return thing.match(/(.*)\/macro/)[1]
}

export function buildMacroRuntimeNode (path, nameOfImport, t) {
  return t.memberExpression(
    t.callExpression(t.identifier('require'), [
      t.stringLiteral(getRuntimeImportPath(path, t))
    ]),
    t.identifier(nameOfImport)
  )
}
