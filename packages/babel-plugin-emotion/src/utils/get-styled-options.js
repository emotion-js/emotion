// @flow
import { getLabelFromPath } from './label'
import { getTargetClassName } from './get-target-class-name'

const isInObject = (path, keyName) =>
  path && path.properties.find(p => p.key.name === keyName)

export let getStyledOptions = (t: *, path: *, state: *) => {
  let args = path.node.arguments
  let optionsArgument = args.length >= 2 ? args[1] : null

  let properties = []

  if (!isInObject(optionsArgument, 'target')) {
    properties.push(
      t.objectProperty(
        t.identifier('target'),
        t.stringLiteral(getTargetClassName(state, t))
      )
    )
  }

  let label = getLabelFromPath(path, state, t)
  if (label && !isInObject(optionsArgument, 'label')) {
    properties.push(
      t.objectProperty(t.identifier('label'), t.stringLiteral(label))
    )
  }

  if (optionsArgument) {
    if (!t.isObjectExpression(optionsArgument)) {
      return t.callExpression(state.file.addHelper('extends'), [
        t.objectExpression([]),
        t.objectExpression(properties),
        optionsArgument
      ])
    }

    properties.unshift(...optionsArgument.properties)
  }

  return t.objectExpression(
    // $FlowFixMe
    properties
  )
}
