export function getIdentifierName (path, t) {
  const parent = path.findParent(p => p.isVariableDeclarator())
  return parent && t.isIdentifier(parent.node.id) ? parent.node.id.name : ''
}

export function getRuntimeImportPath (path, t) {
  const binding = path.scope.getBinding(path.node.name)
  const thing = binding.path.parentPath.node.source.value
  return thing.match(/(.*)\/macro/)[1]
}
