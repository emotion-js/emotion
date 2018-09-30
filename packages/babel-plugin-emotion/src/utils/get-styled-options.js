// @flow
import { getLabelFromPath } from './label'
import { getTargetClassName } from './get-target-class-name'

export let getStyledOptions = (t: *, path: *, state: *) => {
  let properties = [
    t.objectProperty(
      t.identifier('target'),
      t.stringLiteral(getTargetClassName(state, t))
    )
  ]
  let label = getLabelFromPath(path, state, t)
  if (label) {
    properties.push(
      t.objectProperty(t.identifier('label'), t.stringLiteral(label))
    )
  }

  let args = path.node.arguments
  let optionsArgument = args.length >= 2 ? args[1] : null
  if (optionsArgument) {
    if (t.isObjectExpression(optionsArgument)) {
      properties.unshift(...optionsArgument.properties)
    } else {
      console.warn(
        "Second argument to a styled call is not an object, it's going to be removed."
      )
    }
  }

  return t.objectExpression(
    // $FlowFixMe
    properties
  )
}
