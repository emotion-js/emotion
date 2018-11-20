// @flow
import type {
  Interpolation,
  SerializedStyles,
  RegisteredCache
} from '@emotion/utils'
import { cursor } from './state'
import {
  processStyleName,
  processStyleValue,
  createSerializedStyles
} from './utils'

let shouldWarnAboutInterpolatingClassNameFromCss = true

function handleInterpolation(
  mergedProps: void | Object,
  registered: RegisteredCache | null,
  interpolation: Interpolation,
  couldBeSelectorInterpolation: boolean
): string | number {
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

      return createStringFromObject(mergedProps, registered, interpolation)
    }
    case 'function': {
      if (mergedProps !== undefined) {
        let previousCursor = cursor.current
        let result = interpolation(mergedProps)
        cursor.current = previousCursor

        return handleInterpolation(
          mergedProps,
          registered,
          result,
          couldBeSelectorInterpolation
        )
      } else if (process.env.NODE_ENV !== 'production') {
        console.error(
          'Functions that are interpolated in css calls will be stringified.\n' +
            'If you want to have a css call based on props, create a function that returns a css call like this\n' +
            'let dynamicStyle = (props) => css`color: ${props.color}`\n' +
            'It can be called directly with props or interpolated in a styled call like this\n' +
            "let SomeComponent = styled('div')`${dynamicStyle}`"
        )
      }
    }
    // eslint-disable-next-line no-fallthrough
    default: {
      if (registered === null) {
        return interpolation
      }
      const cached = registered[interpolation]
      if (
        process.env.NODE_ENV !== 'production' &&
        couldBeSelectorInterpolation &&
        shouldWarnAboutInterpolatingClassNameFromCss &&
        cached !== undefined
      ) {
        console.error(
          'Interpolating a className from css`` is not recommended and will cause problems with composition.\n' +
            'Interpolating a className from css`` will be completely unsupported in a future major version of Emotion'
        )
        shouldWarnAboutInterpolatingClassNameFromCss = false
      }
      return cached !== undefined && !couldBeSelectorInterpolation
        ? cached
        : interpolation
    }
  }
}

function createStringFromObject(
  mergedProps: void | Object,
  registered: RegisteredCache | null,
  obj: { [key: string]: Interpolation }
): string {
  let string = ''

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false)
    }
  } else {
    for (let key in obj) {
      let value = obj[key]
      if (typeof value !== 'object') {
        if (registered !== null && registered[value] !== undefined) {
          string += `${key}{${registered[value]}}`
        } else {
          string += `${processStyleName(key)}:${processStyleValue(key, value)};`
        }
      } else {
        if (
          key === 'NO_COMPONENT_SELECTOR' &&
          process.env.NODE_ENV !== 'production'
        ) {
          throw new Error(
            'Component selectors can only be used in conjunction with babel-plugin-emotion.'
          )
        }
        if (
          Array.isArray(value) &&
          (registered === null ||
            (typeof value[0] === 'string' &&
              registered[value[0]] === undefined))
        ) {
          for (let i = 0; i < value.length; i++) {
            string += `${processStyleName(key)}:${processStyleValue(
              key,
              value[i]
            )};`
          }
        } else {
          string += `${key}{${handleInterpolation(
            mergedProps,
            registered,
            value,
            false
          )}}`
        }
      }
    }
  }

  return string
}

export { basicSerializeStyles } from './basic'

export const serializeStyles = function(
  registered: RegisteredCache | null,
  args: Array<Interpolation>,
  mergedProps: void | Object
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
    styles += handleInterpolation(mergedProps, registered, strings, false)
  } else {
    styles += strings[0]
  }
  // we start at 1 since we've already handled the first arg
  for (let i = 1; i < args.length; i++) {
    styles += handleInterpolation(
      mergedProps,
      registered,
      args[i],
      styles.charCodeAt(styles.length - 1) === 46
    )
    if (stringMode) {
      styles += strings[i]
    }
  }
  return createSerializedStyles(styles)
}
