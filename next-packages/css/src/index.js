// @flow
import type { Interpolation, ScopedInsertableStyles } from '@emotion/utils'
import hashString from '@emotion/hash'
import { handleInterpolation, labelPattern } from '@emotion/serialize'

let fakeRegisteredCache = {}

let dependantStyles
let addDependantStyle = style => {
  if (dependantStyles === undefined) {
    dependantStyles = []
  }
  dependantStyles.push(style)
}

function css(
  strings: Interpolation | string[],
  ...interpolations: Interpolation[]
): ScopedInsertableStyles {
  let stringMode = true
  let styles: string = ''
  let identifierName = ''
  dependantStyles = undefined
  if (strings == null || strings.raw === undefined) {
    stringMode = false
    styles += handleInterpolation(
      fakeRegisteredCache,
      strings,
      addDependantStyle
    )
  } else {
    styles += strings[0]
  }

  interpolations.forEach(function(interpolation, i) {
    styles += handleInterpolation(
      fakeRegisteredCache,
      interpolation,
      addDependantStyle
    )
    if (stringMode === true && strings[i + 1] !== undefined) {
      styles += strings[i + 1]
    }
  }, this)
  styles = styles.replace(labelPattern, (match, p1: string) => {
    identifierName += `-${p1}`
    return ''
  })
  let name = hashString(styles) + identifierName

  return {
    name,
    styles,
    deps: dependantStyles
  }
}

export default css
