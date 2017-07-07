export default function createAttrExpression (match, vars, composes, t) {
  const placeholderRegex = /xxx(\d+)xxx/gm
  const propNameMatch = placeholderRegex.exec(match.propName)
  let propName = t.identifier(match.propName)
  if (propNameMatch) {
    const varsIndex = propNameMatch[1] - composes
    propName = vars[varsIndex]
  }

  const valueTypeMatch = placeholderRegex.exec(match.valueType)
  let valueType = t.stringLiteral(match.valueType || '')
  if (valueTypeMatch) {
    const varsIndex = valueTypeMatch[1] - composes
    valueType = vars[varsIndex]
  }

  const defaultValueMatch = placeholderRegex.exec(match.defaultValue)
  let defaultValue = t.stringLiteral(match.defaultValue || '')
  if (defaultValueMatch) {
    const varsIndex = defaultValueMatch[1] - composes
    defaultValue = vars[varsIndex]
  }

  let createMemberExpression = () =>
            t.memberExpression(t.identifier('props'), propName, !!propNameMatch)

  let returnValue = createMemberExpression()

  if (match.valueType) {
    returnValue = t.binaryExpression(
              '+',
              createMemberExpression(),
              valueType
            )
  }

  if (match.defaultValue) {
    returnValue = t.binaryExpression(
              '+',
              t.conditionalExpression(
                createMemberExpression(),
                createMemberExpression(),
                defaultValue
              ),
              valueType
            )
  }

  const body = t.blockStatement([t.returnStatement(returnValue)])

  const expr = t.functionExpression(
            t.identifier(
              `get${propNameMatch ? 'Prop' : match.propName.charAt(0).toUpperCase() + match.propName.slice(1)}`
            ),
            [t.identifier('props')],
            body
          )
  return expr
}
