// @flow
import transform from 'css-to-react-native'
import { StyleSheet } from 'react-primitives'
import { interleave } from './utils'

export function css(...args: any) {
  let vals

  if (args[0] == null || args[0].raw === undefined) {
    vals = args
  } else {
    vals = interleave(args)
  }

  let styles = []
  let buffer = ''
  let lastType

  let handleInterpolation = (interpolation: *, i: number, arr: Array<*>) => {
    let type = typeof interpolation

    if (type === 'function') {
      if (this === undefined && process.env.NODE_ENV !== 'production') {
        console.error(
          'Interpolating functions in css calls is not allowed.\n' +
            'If you want to have a css call based on props, create a function that returns a css call like this\n' +
            'let dynamicStyle = (props) => css`color: ${props.color}`\n' +
            'It can be called directly with props or interpolated in a styled call like this\n' +
            'let SomeComponent = styled.View`${dynamicStyle}`'
        )
      } else {
        handleInterpolation(interpolation(this.mergedProps), i, arr)
      }
      return
    }
    let isFalsy = interpolation == null || type === 'boolean'
    let isRnStyle =
      (type === 'object' && !Array.isArray(interpolation)) || type === 'number'
    if (lastType === 'string' && (isRnStyle || isFalsy)) {
      let converted = convertStyles(buffer)
      if (converted !== undefined) {
        styles.push(converted)
      }
      buffer = ''
    }
    if (isFalsy) {
      return
    }

    if (type === 'string') {
      buffer += interpolation

      if (arr.length - 1 === i) {
        let converted = convertStyles(buffer)
        if (converted !== undefined) {
          styles.push(converted)
        }
        buffer = ''
      }
    }
    if (isRnStyle) {
      styles.push(interpolation)
    }
    if (Array.isArray(interpolation)) {
      interpolation.forEach(handleInterpolation)
    }
    lastType = type
  }

  vals.forEach(handleInterpolation)

  return StyleSheet.flatten(styles)
}

let propertyValuePattern = /\s*([^\s]+)\s*:\s*(.+?)\s*$/

function convertStyles(str: string) {
  if (str.trim() === '') return

  const styleObj = []

  const parsedString = str.split(';')

  parsedString.forEach(style => {
    // Get prop name and prop value
    let match = propertyValuePattern.exec(style)
    // match[2] will be " " in cases where there is no value
    // but there is whitespace, e.g. "color: "
    if (match !== null && match[2] !== ' ') {
      // the first value in the array will
      // be the whole string so we remove it
      match.shift()
      styleObj.push(match)
    }
  })
  if (styleObj.length === 0) {
    return
  }

  return transform(styleObj)
}
