// @flow
import type { Interpolation, SerializedStyles } from '@emotion/utils'
import { cursor } from './state'
import {
  processStyleName,
  processStyleValue,
  createSerializedStyles
} from './utils'

function handleInterpolation(interpolation: Interpolation): string | number {
  if (interpolation == null) {
    return ''
  }
  if (interpolation.__emotion_styles !== undefined) {
    if (
      process.env.NODE_ENV !== 'production' &&
      interpolation.toString() === 'NO_COMPONENT_SELECTOR'
    ) {
      throw new Error(
        'Component selectors can only be used in conjunction with babel-plugin-emotion.'
      )
    }
    return interpolation
  }

  switch (typeof interpolation) {
    case 'boolean': {
      return ''
    }
    case 'object': {
      if (interpolation.anim === 1) {
        cursor.current = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor.current
        }

        return interpolation.name
      }
      if (interpolation.styles !== undefined) {
        let next = interpolation.next
        if (next !== undefined) {
          // not the most efficient thing ever but this is a pretty rare case
          // and there will be very few iterations of this generally
          while (next !== undefined) {
            cursor.current = {
              name: next.name,
              styles: next.styles,
              next: cursor.current
            }
            next = next.next
          }
        }
        return interpolation.styles
      }

      return createStringFromObject(interpolation)
    }

    default: {
      if (
        process.env.NODE_ENV !== 'production' &&
        typeof interpolation === 'function'
      ) {
        console.error(
          'Functions that are interpolated in css calls will be stringified.\n' +
            'If you want to have a css call based on props, create a function that returns a css call like this\n' +
            'let dynamicStyle = (props) => css`color: ${props.color}`\n' +
            'It can be called directly with props or interpolated in a styled call like this\n' +
            "let SomeComponent = styled('div')`${dynamicStyle}`"
        )
      }
      return interpolation
    }
  }
}

function createStringFromObject(obj: { [key: string]: Interpolation }): string {
  let string = ''

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      string += handleInterpolation(obj[i])
    }
  } else {
    for (let key in obj) {
      let value = obj[key]
      if (typeof value !== 'object') {
        string += `${processStyleName(key)}:${processStyleValue(key, value)};`
      } else {
        if (
          key === 'NO_COMPONENT_SELECTOR' &&
          process.env.NODE_ENV !== 'production'
        ) {
          throw new Error(
            'Component selectors can only be used in conjunction with babel-plugin-emotion.'
          )
        }
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            string += `${processStyleName(key)}:${processStyleValue(
              key,
              value[i]
            )};`
          }
        } else {
          string += `${key}{${handleInterpolation(value)}}`
        }
      }
    }
  }

  return string
}

export const basicSerializeStyles = function(
  args: Array<Interpolation>
): SerializedStyles {
  if (
    args.length === 1 &&
    typeof args[0] === 'object' &&
    args[0] !== null &&
    args[0].styles !== undefined
  ) {
    return args[0]
  }
  let stringMode = true
  let styles = ''

  cursor.current = undefined
  let strings = args[0]
  if (strings == null || strings.raw === undefined) {
    stringMode = false
    styles += handleInterpolation(strings)
  } else {
    styles += strings[0]
  }
  // we start at 1 since we've already handled the first arg
  for (let i = 1; i < args.length; i++) {
    styles += handleInterpolation(args[i])
    if (stringMode) {
      styles += strings[i]
    }
  }

  return createSerializedStyles(styles)
}
