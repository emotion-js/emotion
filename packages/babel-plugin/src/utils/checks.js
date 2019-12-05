// @flow

export function isTaggedTemplateExpressionTranspiledByTypeScript(path: *) {
  if (path.node.arguments.length !== 1) {
    return false
  }

  const argPath = path.get('arguments')[0]

  return (
    argPath.isLogicalExpression() &&
    argPath.get('left').isIdentifier() &&
    argPath.node.left.name.includes('templateObject') &&
    argPath.get('right').isAssignmentExpression() &&
    argPath
      .get('right')
      .get('right')
      .isCallExpression() &&
    argPath
      .get('right')
      .get('right')
      .get('callee')
      .isIdentifier() &&
    argPath.node.right.right.callee.name.includes('makeTemplateObject') &&
    argPath.node.right.right.arguments.length === 2
  )
}
