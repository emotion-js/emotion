// @flow
import type {
  Interpolation,
  ScopedInsertableStyles,
  RegisteredCache
} from '@emotion/utils'
import hashString from '@emotion/hash'
import unitless from '@emotion/unitless'
import memoize from '@emotion/memoize'

const hyphenateRegex = /[A-Z]|^ms/g

export const processStyleName: (styleName: string) => string = memoize(
  (styleName: string) => styleName.replace(hyphenateRegex, '-$&').toLowerCase()
)

export let processStyleValue = (key: string, value: string): string => {
  if (value == null || typeof value === 'boolean') {
    return ''
  }

  if (
    unitless[key] !== 1 &&
    key.charCodeAt(1) !== 45 && // custom properties
    !isNaN(value) &&
    value !== 0
  ) {
    return value + 'px'
  }
  return value
}

if (process.env.NODE_ENV !== 'production') {
  let contentValuePattern = /(attr|calc|counters?|url)\(/
  let contentValues = [
    'normal',
    'none',
    'counter',
    'open-quote',
    'close-quote',
    'no-open-quote',
    'no-close-quote',
    'initial',
    'inherit',
    'unset'
  ]
  let oldProcessStyleValue = processStyleValue
  processStyleValue = (key: string, value: string) => {
    if (key === 'content') {
      if (
        typeof value !== 'string' ||
        (contentValues.indexOf(value) === -1 &&
          !contentValuePattern.test(value) &&
          (value.charAt(0) !== value.charAt(value.length - 1) ||
            (value.charAt(0) !== '"' && value.charAt(0) !== "'")))
      ) {
        console.error(
          `You seem to be using a value for 'content' without quotes, try replacing it with \`content: '"${value}"'\``
        )
      }
    }
    return oldProcessStyleValue(key, value)
  }
}

export function handleInterpolation(
  registered: RegisteredCache,
  interpolation: Interpolation
): string | number {
  if (interpolation == null) {
    return ''
  }
  if (interpolation.__emotion_styles !== undefined) {
    if (
      interpolation.toString() === 'NO_COMPONENT_SELECTOR' &&
      process.env.NODE_ENV !== 'production'
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
      if (interpolation.type === 2) {
        return interpolation.name
      }
      if (interpolation.styles !== undefined) {
        return interpolation.styles
      }

      return createStringFromObject.call(this, registered, interpolation)
    }
    case 'function': {
      if (this !== undefined) {
        return handleInterpolation.call(
          this,
          registered,
          // $FlowFixMe
          interpolation(this)
        )
      }
    }
    // eslint-disable-next-line no-fallthrough
    default: {
      const cached = registered[interpolation]
      return cached !== undefined ? cached : interpolation
    }
  }
}

function createStringFromObject(
  registered: RegisteredCache,
  obj: { [key: string]: Interpolation }
): string {
  let string = ''

  if (Array.isArray(obj)) {
    obj.forEach(function(interpolation: Interpolation) {
      string += handleInterpolation.call(this, registered, interpolation)
    }, this)
  } else {
    Object.keys(obj).forEach(function(key: string) {
      if (typeof obj[key] !== 'object') {
        string += `${processStyleName(key)}:${processStyleValue(
          key,
          obj[key]
        )};`
      } else {
        if (
          key === 'NO_COMPONENT_SELECTOR' &&
          process.env.NODE_ENV !== 'production'
        ) {
          throw new Error(
            'Component selectors can only be used in conjunction with @emotion/babel-plugin-core.'
          )
        }
        if (
          Array.isArray(obj[key]) &&
          (typeof obj[key][0] === 'string' &&
            registered[obj[key][0]] === undefined)
        ) {
          obj[key].forEach(value => {
            string += `${processStyleName(key)}:${processStyleValue(
              key,
              value
            )};`
          })
        } else {
          string += `${key}{${handleInterpolation.call(
            this,
            registered,
            obj[key]
          )}}`
        }
      }
    }, this)
  }

  return string
}

export const labelPattern = /label:\s*([^\s;\n{]+)\s*;/g

export const serializeStyles = function(
  registered: RegisteredCache,
  args: Array<Interpolation>
): ScopedInsertableStyles {
  if (
    args.length === 1 &&
    typeof args[0] === 'object' &&
    args[0] !== null &&
    args[0].styles !== undefined
  ) {
    return args[0]
  }
  let styles = ''
  let identifierName = ''
  args.forEach(function(interpolation, i) {
    styles += handleInterpolation.call(this, registered, interpolation)
  }, this)
  styles = styles.replace(labelPattern, (match, p1: string) => {
    identifierName += `-${p1}`
    return ''
  })
  let name = hashString(styles) + identifierName

  return {
    name,
    styles
  }
}
