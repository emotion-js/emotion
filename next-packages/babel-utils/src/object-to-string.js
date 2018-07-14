// @flow
import { handleInterpolation } from '@emotion/serialize'

export function simplifyObject(node: *, t: Object) {
  let bailout = false
  let finalString = ''
  node.properties.forEach(property => {
    if (bailout) {
      return
    }
    if (
      property.computed ||
      (!t.isIdentifier(property.key) && !t.isStringLiteral(property.key)) ||
      (!t.isStringLiteral(property.value) &&
        !t.isNumericLiteral(property.value) &&
        !t.isObjectExpression(property.value))
    ) {
      bailout = true
    }

    let key = property.key.name || property.key.value
    if (key === 'styles') {
      bailout = true
      return
    }
    if (t.isObjectExpression(property.value)) {
      let simplifiedChild = simplifyObject(property.value, t)
      if (!t.isStringLiteral(simplifiedChild)) {
        bailout = true
        return
      }
      finalString += `${key}{${simplifiedChild.value}}`
      return
    }
    let value = property.value.value

    finalString += handleInterpolation({}, { [key]: value })
  })
  return bailout ? node : t.stringLiteral(finalString)
}
