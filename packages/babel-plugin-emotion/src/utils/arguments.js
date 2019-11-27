// @flow
import { isTaggedTemplateExpressionTranspiledByTypeScript } from './checks'

export const appendExpressionToArguments = (t: *, path: *, expression: *) => {
  let lastIndex = path.node.arguments.length - 1
  let last = path.node.arguments[lastIndex]
  if (t.isStringLiteral(last)) {
    path.node.arguments[lastIndex] = t.binaryExpression('+', last, expression)
  } else if (isTaggedTemplateExpressionTranspiledByTypeScript(path)) {
    const makeTemplateObjectCallPath = path
      .get('arguments')[0]
      .get('right')
      .get('right')

    makeTemplateObjectCallPath.get('arguments').forEach(argPath => {
      const elements = argPath.get('elements')
      const lastElement = elements[elements.length - 1]
      lastElement.replaceWith(
        t.binaryExpression('+', lastElement.node, t.cloneNode(expression))
      )
    })
  } else {
    path.node.arguments.push(expression)
  }
}
