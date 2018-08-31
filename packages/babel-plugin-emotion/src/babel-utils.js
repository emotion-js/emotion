// @flow
import nodePath from 'path'
import { getLabelFromPath, getTargetClassName } from '@emotion/babel-utils'

export { getLabelFromPath as getIdentifierName } from '@emotion/babel-utils'

export let buildStyledOptions = (t: *, path: *, state: *) => {
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

export function getName(identifierName?: string, prefix: string) {
  const parts = []
  parts.push(prefix)
  if (identifierName) {
    parts.push(identifierName)
  }
  return parts.join('-')
}

export function getLabel(
  identifierName?: string,
  autoLabel: boolean,
  labelFormat?: string,
  filename: string
) {
  if (!identifierName || !autoLabel) return null
  if (!labelFormat) return identifierName.trim()

  const parsedPath = nodePath.parse(filename)
  const normalizedFilename = parsedPath.name.replace('.', '-')
  return labelFormat
    .replace(/\[local\]/gi, identifierName.trim())
    .replace(/\[filename\]/gi, normalizedFilename)
}

export function omit(
  obj: { [string]: any },
  testFn: (key: string, obj: any) => boolean
) {
  let target: { [string]: any } = {}
  let i: string
  for (i in obj) {
    if (!testFn(i, obj)) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

export { appendStringToExpressions } from '@emotion/babel-utils'
