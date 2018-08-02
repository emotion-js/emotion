// @flow
import type {
  Interpolation,
  ScopedInsertableStyles,
  RegisteredCache
} from '@emotion/utils'
import hashString from '@emotion/hash'
import unitless from '@emotion/unitless'
import memoize from '@emotion/memoize'

let hyphenateRegex = /[A-Z]|^ms/g

let animationRegex = /_EMO_([^_]+?)_([^]*?)_ANIM_/g

const processStyleName: (styleName: string) => string = memoize(
  (styleName: string) => styleName.replace(hyphenateRegex, '-$&').toLowerCase()
)

let processStyleValue = (
  key: string,
  value: string,
  addDependantStyle: string => void
): string => {
  if (value == null || typeof value === 'boolean') {
    return ''
  }

  switch (key) {
    case 'animation':
    case 'animationName': {
      value = value.replace(animationRegex, (match, p1, p2) => {
        addDependantStyle(p2)
        return p1
      })
    }
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
  processStyleValue = (
    key: string,
    value: string,
    addDependantStyle: string => void
  ) => {
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
    return oldProcessStyleValue(key, value, addDependantStyle)
  }
}

function handleInterpolation(
  registered: RegisteredCache,
  interpolation: Interpolation,
  addDependantStyle: string => void
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
      if (interpolation.anim === 1) {
        addDependantStyle(interpolation.styles)
        return interpolation.name
      }
      if (interpolation.styles !== undefined) {
        return interpolation.styles
      }

      return createStringFromObject.call(
        this,
        registered,
        interpolation,
        addDependantStyle
      )
    }
    case 'function': {
      if (this !== undefined) {
        return handleInterpolation.call(
          this,
          registered,
          // $FlowFixMe
          interpolation(this),
          addDependantStyle
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
  obj: { [key: string]: Interpolation },
  addDependantStyle: string => void
): string {
  let string = ''

  if (Array.isArray(obj)) {
    obj.forEach(function(interpolation: Interpolation) {
      string += handleInterpolation.call(
        this,
        registered,
        interpolation,
        addDependantStyle
      )
    }, this)
  } else {
    Object.keys(obj).forEach(function(key: string) {
      if (typeof obj[key] !== 'object') {
        string += `${processStyleName(key)}:${processStyleValue(
          key,
          obj[key],
          addDependantStyle
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
              value,
              addDependantStyle
            )};`
          })
        } else {
          string += `${key}{${handleInterpolation.call(
            this,
            registered,
            obj[key],
            addDependantStyle
          )}}`
        }
      }
    }, this)
  }

  return string
}

let labelPattern = /label:\s*([^\s;\n{]+)\s*;/g

let dependantStyles = ''

let addDependantStyle = style => {
  dependantStyles += style
}

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
  dependantStyles = ''
  let stringMode = true
  let styles: string = ''
  let identifierName = ''
  let strings = args[0]
  if (strings == null || strings.raw === undefined) {
    stringMode = false
    styles += handleInterpolation(registered, strings, addDependantStyle)
  } else {
    styles += strings[0]
  }
  // we start at 1 since we've already handled the first arg
  for (let i = 1; i < args.length; i++) {
    styles += handleInterpolation(registered, args[i], addDependantStyle)
    if (stringMode) {
      styles += strings[i + 1]
    }
  }

  styles = styles.replace(labelPattern, (match, p1: string) => {
    identifierName += `-${p1}`
    return ''
  })

  let name = hashString(styles) + identifierName

  return {
    name,
    styles: styles + dependantStyles
  }
}
