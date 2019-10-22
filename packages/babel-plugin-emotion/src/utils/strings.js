// @flow
import { isTaggedTemplateExpressionTranspiledByTypeScript } from './checks'

export const appendStringToArguments = (path: *, string: string, t: *) => {
  if (!string) {
    return
  }
  const args = path.node.arguments
  if (t.isStringLiteral(args[args.length - 1])) {
    args[args.length - 1].value += string
  } else if (isTaggedTemplateExpressionTranspiledByTypeScript(path)) {
    const makeTemplateObjectCallPath = path
      .get('arguments')[0]
      .get('right')
      .get('right')

    makeTemplateObjectCallPath.get('arguments').forEach(argPath => {
      const elements = argPath.get('elements')
      const lastElement = elements[elements.length - 1]
      lastElement.replaceWith(t.stringLiteral(lastElement.node.value + string))
    })
  } else {
    args.push(t.stringLiteral(string))
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
