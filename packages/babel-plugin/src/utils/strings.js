// @flow
function isTaggedTemplateExpressionTranspiledByTypeScript(path: *) {
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

export const appendStringReturningExpressionToArguments = (
  t: *,
  path: *,
  expression: *
) => {
  let lastIndex = path.node.arguments.length - 1
  let last = path.node.arguments[lastIndex]
  if (t.isStringLiteral(last)) {
    if (typeof expression === 'string') {
      path.node.arguments[lastIndex].value += expression
    } else {
      path.node.arguments[lastIndex] = t.binaryExpression('+', last, expression)
    }
  } else if (isTaggedTemplateExpressionTranspiledByTypeScript(path)) {
    const makeTemplateObjectCallPath = path
      .get('arguments')[0]
      .get('right')
      .get('right')

    makeTemplateObjectCallPath.get('arguments').forEach(argPath => {
      const elements = argPath.get('elements')
      const lastElement = elements[elements.length - 1]
      if (typeof expression === 'string') {
        lastElement.replaceWith(
          t.stringLiteral(lastElement.node.value + expression)
        )
      } else {
        lastElement.replaceWith(
          t.binaryExpression('+', lastElement.node, t.cloneNode(expression))
        )
      }
    })
  } else if (typeof expression === 'string') {
    path.node.arguments.push(t.stringLiteral(expression))
  } else {
    path.node.arguments.push(expression)
  }
}

export const joinStringLiterals = (expressions: Array<*>, t: *) => {
  return expressions.reduce((finalExpressions, currentExpression, i) => {
    if (!t.isStringLiteral(currentExpression)) {
      finalExpressions.push(currentExpression)
    } else if (
      t.isStringLiteral(finalExpressions[finalExpressions.length - 1])
    ) {
      finalExpressions[finalExpressions.length - 1].value +=
        currentExpression.value
    } else {
      finalExpressions.push(currentExpression)
    }
    return finalExpressions
  }, [])
}
