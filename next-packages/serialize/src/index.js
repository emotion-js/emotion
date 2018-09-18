// @flow
import type {
  Interpolation,
  SerializedStyles,
  RegisteredCache
} from '@emotion/utils'
import hashString from '@emotion/hash'
import unitless from '@emotion/unitless'
import memoize from '@emotion/memoize'

let hyphenateRegex = /[A-Z]|^ms/g

let animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g

const processStyleName = memoize((styleName: string) =>
  styleName.replace(hyphenateRegex, '-$&').toLowerCase()
)

let processStyleValue = (key: string, value: string): string => {
  if (value == null || typeof value === 'boolean') {
    return ''
  }

  switch (key) {
    case 'animation':
    case 'animationName': {
      value = value.replace(animationRegex, (match, p1, p2) => {
        cursor = {
          name: p1,
          styles: p2,
          next: cursor
        }
        return p1
      })
    }
  }

  if (
    unitless[key] !== 1 &&
    key.charCodeAt(1) !== 45 && // custom properties
    typeof value === 'number' &&
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

function handleInterpolation(
  mergedProps: void | Object,
  registered: RegisteredCache,
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
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        }

        return interpolation.name
      }
      if (interpolation.styles !== undefined) {
        let next = interpolation.next
        if (next !== undefined) {
          // not the most efficient thing ever but this is a pretty rare case
          // and there will be very few iterations of this generally
          while (next !== undefined) {
            cursor = {
              name: next.name,
              styles: next.styles,
              next: cursor
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
        return handleInterpolation(
          mergedProps,
          registered,
          interpolation(mergedProps),
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
      const cached = registered[interpolation]
      return cached !== undefined && !couldBeSelectorInterpolation
        ? cached
        : interpolation
    }
  }
}

function createStringFromObject(
  mergedProps: void | Object,
  registered: RegisteredCache,
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
        if (registered[value] !== undefined) {
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
          (typeof value[0] === 'string' && registered[value[0]] === undefined)
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

let labelPattern = /label:\s*([^\s;\n{]+)\s*;/g

// this is set to an empty string on each serializeStyles call
// it's declared in the module scope since we need to add to
// it in the middle of serialization to add styles from keyframes
let styles = ''

let sourceMap

let replaceStyles = () => {}

if (process.env.NODE_ENV !== 'production') {
  let sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//

  replaceStyles = () => {
    styles = styles.replace(sourceMapPattern, match => {
      sourceMap = match
      return ''
    })
  }
}

// this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list
let cursor

export const serializeStyles = function(
  registered: RegisteredCache,
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
  styles = ''
  sourceMap = undefined
  cursor = undefined

  let strings = args[0]
  if (strings == null || strings.raw === undefined) {
    stringMode = false
    // we have to store this in a variable and then append it to styles since
    // styles could be modified in handleInterpolation and using += would mean
    // it would append the return value of handleInterpolation to the value before handleInterpolation is called
    let stringifiedInterpolation = handleInterpolation(
      mergedProps,
      registered,
      strings,
      false
    )
    styles += stringifiedInterpolation
  } else {
    styles += strings[0]
  }
  // we start at 1 since we've already handled the first arg
  for (let i = 1; i < args.length; i++) {
    // we have to store this in a variable and then append it to styles since
    // styles could be modified in handleInterpolation and using += would mean
    // it would append the return value of handleInterpolation to the value before handleInterpolation is called
    let stringifiedInterpolation = handleInterpolation(
      mergedProps,
      registered,
      args[i],
      styles.charCodeAt(styles.length - 1) === 46
    )
    styles += stringifiedInterpolation
    if (stringMode) {
      styles += strings[i]
    }
  }

  replaceStyles()

  // using a global regex with .exec is stateful so lastIndex has to be reset each time
  labelPattern.lastIndex = 0
  let identifierName = ''

  let match
  // https://esbench.com/bench/5b809c2cf2949800a0f61fb5
  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName +=
      '-' +
      // $FlowFixMe we know it's not null
      match[1]
  }

  let name = hashString(styles) + identifierName

  return {
    name,
    styles,
    map: sourceMap,
    next: cursor
  }
}
