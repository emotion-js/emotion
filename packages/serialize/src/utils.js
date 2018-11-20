// @flow
import unitless from '@emotion/unitless'
import memoize from '@emotion/memoize'
import { cursor } from './state'
import hashString from '@emotion/hash'

let hyphenateRegex = /[A-Z]|^ms/g

let animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g

export const processStyleName = memoize((styleName: string) =>
  styleName.replace(hyphenateRegex, '-$&').toLowerCase()
)

export let processStyleValue = (
  key: string,
  value: string | number
): string | number => {
  if (value == null || typeof value === 'boolean') {
    return ''
  }

  switch (key) {
    case 'animation':
    case 'animationName': {
      if (typeof value === 'string') {
        value = value.replace(animationRegex, (match, p1, p2) => {
          cursor.current = {
            name: p1,
            styles: p2,
            next: cursor.current
          }
          return p1
        })
      }
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

  let msPattern = /^-ms-/
  let hyphenPattern = /-(.)/g

  let hyphenatedCache = {}

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

    if (
      key.charCodeAt(1) !== 45 &&
      key.indexOf('-') !== -1 &&
      hyphenatedCache[key] === undefined
    ) {
      hyphenatedCache[key] = true
      console.error(
        `Using kebab-case for css properties in objects is not supported. Did you mean ${key
          .replace(msPattern, 'ms-')
          .replace(hyphenPattern, (str, char) => char.toUpperCase())}?`
      )
    }

    return oldProcessStyleValue(key, value)
  }
}

export let labelPattern = /label:\s*([^\s;\n{]+)\s*;/g

export let sourceMapPattern
if (process.env.NODE_ENV !== 'production') {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//
}

export function createSerializedStyles(styles: string) {
  let sourceMap

  if (process.env.NODE_ENV !== 'production') {
    styles = styles.replace(sourceMapPattern, match => {
      sourceMap = match
      return ''
    })
  }

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

  if (process.env.NODE_ENV !== 'production') {
    return {
      name,
      styles,
      map: sourceMap,
      next: cursor.current
    }
  }
  return {
    name,
    styles,
    next: cursor.current
  }
}
