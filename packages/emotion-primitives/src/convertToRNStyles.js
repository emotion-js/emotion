import { StyleSheet } from 'react-primitives'
import transform from 'css-to-react-native'
import { convertRuleOptions } from 'tslint/lib/configuration'

// Copied and edited from @emotion/css
// Cannot use css from @emotion/css directly because of unnecessary checks, __emotion_styles, and registering interpolations in cache.
function handleInterpolation(interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return ''
  }

  switch (typeof interpolation) {
    case 'boolean':
      return ''
    case 'function':
      return handleInterpolation.call(
        this,
        this === undefined ? interpolation() : interpolation(this.props),
        couldBeSelectorInterpolation
      )

    default:
      return interpolation
  }
}

// Return evaluated css string
function createStyles(strings, ...interpolations) {
  let stringMode = true
  let styles = ''

  if (strings == null || strings.raw === undefined) {
    stringMode = false
    styles += handleInterpolation.call(this, strings, false)
  } else {
    styles += strings[0]
  }

  interpolations.forEach(function(interpolation, i) {
    styles += handleInterpolation.call(
      this,
      interpolation,
      styles.charCodeAt(styles.length - 1) === 46
    )

    if (stringMode === true && strings[i + 1] !== undefined) {
      styles += strings[i + 1]
    }
  }, this)

  return styles
}

function convertStyles(str) {
  if (typeof str === 'string' && str.length === 0) return ''

  const styleObj = []

  const parsedString = str.split(';')

  parsedString.forEach(style => {
    // Get prop name and prop value
    const ar = style.split(': ')

    if (ar[0] && ar[1]) {
      styleObj.push([ar[0].trim(), ar[1].trim()])
    }
  })

  return styleObj
}

export function convertToRNStyles(styles) {
  if (styles[0][0] !== undefined) {
    let arr = []

    arr.push(styles[0][0])
    let len = styles.length
    let i = 1
    for (; i < len; i++) {
      arr.push(styles[i], styles[0][i])
    }

    let css = createStyles.apply(this, arr)
    let parsedCSS = convertStyles(css)

    // Convert css styles to react native
    let rnStyles = Array.isArray(parsedCSS) ? transform(parsedCSS) : {}
    return [StyleSheet.create({ style: rnStyles }).style]
  }

  return styles.map(style => {
    if (typeof style === 'object' && Object.keys(style).length > 0) {
      return StyleSheet.create({ style }).style
    }
    return style
  })
}
