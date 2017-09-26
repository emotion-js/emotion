import { hashString, Stylis, memoize, unitless } from 'emotion-utils'
import StyleSheet from './sheet'

export const sheet = new StyleSheet()
// 🚀
sheet.inject()
const stylisOptions = { keyframe: false }

if (process.env.NODE_ENV !== 'production') {
  stylisOptions.compress = false
}

let stylis = new Stylis(stylisOptions)

export let registered = {}

export let inserted = {}

export function flush() {
  sheet.flush()
  inserted = {}
  registered = {}
  sheet.inject()
}

let currentSourceMap = ''
let queue = []

function insertRule(rule) {
  sheet.insert(rule, currentSourceMap)
}

function insertionPlugin(
  context,
  content,
  selectors,
  parent,
  line,
  column,
  length,
  id
) {
  switch (context) {
    case -2: {
      queue.forEach(insertRule)
      queue = []
      break
    }

    case 2: {
      if (id === 0) {
        const joinedSelectors = selectors.join(',')
        const rule = `${joinedSelectors}{${content}}`
        if (parent.join(',') === joinedSelectors || parent[0] === '') {
          queue.push(rule)
        } else {
          queue.unshift(rule)
        }
      }
      break
    }
    // after an at rule block
    case 3: {
      let chars = selectors.join('')
      const second = chars.charCodeAt(1)
      let child = content
      switch (second) {
        // s upports
        case 115:
        // d ocument
        // eslint-disable-next-line no-fallthrough
        case 100:
        // m edia
        // eslint-disable-next-line no-fallthrough
        case 109: {
          queue.push(chars + '{' + child + '}')
          break
        }
        // k eyframes
        case 107: {
          chars = chars.substring(1)
          child = chars + '{' + child + '}'
          queue.push('@-webkit-' + child)
          queue.push('@' + child)
          break
        }
        default: {
          queue.push(chars + child)
        }
      }
    }
  }
}

stylis.use(insertionPlugin)

function flatten(inArr) {
  let arr = []
  inArr.forEach(val => {
    if (Array.isArray(val)) arr = arr.concat(flatten(val))
    else arr = arr.concat(val)
  })

  return arr
}

function handleInterpolation(
  interpolation: any,
  couldBeSelectorInterpolation: boolean
) {
  if (
    interpolation === undefined ||
    interpolation === null ||
    interpolation === false
  ) {
    return ''
  }

  if (typeof interpolation === 'function') {
    return handleInterpolation(interpolation())
  }

  if (typeof interpolation === 'object') {
    return createStringFromObject(interpolation)
  }

  if (
    couldBeSelectorInterpolation === false &&
    registered[interpolation] !== undefined
  ) {
    return registered[interpolation]
  }
  return interpolation
}

const hyphenateRegex = /[A-Z]|^ms/g

const processStyleName = memoize(styleName =>
  styleName.replace(hyphenateRegex, '-$&').toLowerCase()
)

const processStyleValue = (key, value) => {
  if (value === undefined || value === null || typeof value === 'boolean')
    return ''

  if (unitless[key] !== 1 && !isNaN(value) && value !== 0) {
    return value + 'px'
  }
  return value
}

const objectToStringCache = new WeakMap()

function createStringFromObject(obj) {
  if (objectToStringCache.has(obj)) {
    return objectToStringCache.get(obj)
  }
  let string = ''

  if (Array.isArray(obj)) {
    flatten(obj).forEach(interpolation => {
      string += handleInterpolation(interpolation, false)
    })
  } else {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] !== 'object') {
        if (registered[obj[key]] !== undefined) {
          string += `${key}{${registered[obj[key]]}}`
        } else {
          string += `${processStyleName(key)}:${processStyleValue(
            key,
            obj[key]
          )};`
        }
      } else {
        string += `${key}{${createStringFromObject(obj[key])}}`
      }
    })
  }
  objectToStringCache.set(obj, string)

  return string
}

function isLastCharDot(string) {
  return string.charCodeAt(string.length - 1) === 46 // .
}

function createStyles(strings, ...interpolations) {
  let stringMode = true
  let styles = ''
  if (
    (strings !== undefined && strings.raw === undefined) ||
    strings === undefined
  ) {
    stringMode = false
    styles = handleInterpolation(strings, false)
  } else {
    styles = strings[0]
  }
  interpolations.forEach((interpolation, i) => {
    styles += handleInterpolation(interpolation, isLastCharDot(styles))
    if (stringMode === true && strings[i + 1] !== undefined) {
      styles += strings[i + 1]
    }
  })

  return styles
}

if (process.env.NODE_ENV !== 'production') {
  const sourceMapRegEx = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\/\s+\/\*@\ssourceURL=\S+\s+\*\//
  const oldStylis = stylis
  stylis = (selector, styles) => {
    const result = sourceMapRegEx.exec(styles)
    currentSourceMap = result ? result[0] : ''
    oldStylis(selector, styles)
    currentSourceMap = ''
  }
}

export function css(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  const cls = `css-${hash}`
  if (registered[cls] === undefined) {
    registered[cls] = styles
  }
  if (inserted[hash] === undefined) {
    stylis(`.${cls}`, styles)
    inserted[hash] = true
  }
  return cls
}

export function injectGlobal(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  if (inserted[hash] === undefined) {
    stylis('', styles)
    inserted[hash] = true
  }
}

export function keyframes(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  const name = `animation-${hash}`
  if (inserted[hash] === undefined) {
    stylis('', `@keyframes ${name}{${styles}}`)
    inserted[hash] = true
  }
  return name
}

export function fontFace(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  if (inserted[hash] === undefined) {
    stylis('', `@font-face{${styles}}`)
    inserted[hash] = true
  }
}

export function getRegisteredStyles(registeredStyles, classNames) {
  let rawClassName = ''

  classNames.split(' ').forEach(className => {
    if (registered[className] !== undefined) {
      registeredStyles.push(className)
    } else {
      rawClassName += `${className} `
    }
  })
  return rawClassName
}

export function merge(className, sourceMap) {
  const registeredStyles = []

  const rawClassName = getRegisteredStyles(registeredStyles, className)

  if (registeredStyles.length < 2) {
    return className
  }
  return rawClassName + css(registeredStyles, sourceMap)
}

export function hydrate(ids) {
  ids.forEach(id => {
    inserted[id] = true
  })
}
