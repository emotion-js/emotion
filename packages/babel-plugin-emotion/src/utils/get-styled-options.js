// @flow
import { getLabelFromPath } from './label'
import { getTargetClassName } from './get-target-class-name'

const getKnownProperties = (path, keyName) =>
  (path &&
    path.properties &&
    path.properties.map(p => p.key.name === keyName)) ||
  []

export let getStyledOptions = (t: *, path: *, state: *) => {
  let args = path.node.arguments
  let optionsArgument = args.length >= 2 ? args[1] : null

  let properties = []
  let knownProperties = getKnownProperties(optionsArgument)

  if (!knownProperties.includes('target')) {
    properties.push(
      t.objectProperty(
        t.identifier('target'),
        t.stringLiteral(getTargetClassName(state, t))
      )
    )
  }

  let label = getLabelFromPath(path, state, t)
  if (label && !knownProperties.includes('label')) {
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
