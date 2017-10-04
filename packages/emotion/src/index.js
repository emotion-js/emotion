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

const externalStylisPlugins = []

const use = stylis.use

export const useStylisPlugin = plugin => {
  externalStylisPlugins.push(plugin)
  use(null)(externalStylisPlugins)(insertionPlugin)
}

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

const cssRegex = /css-[A-Za-z0-9]+/

function getRegisteredStylesFromString(interpolation: any) {
  if (typeof interpolation === 'string') {
    const matches = cssRegex.exec(interpolation)
    if (matches != null && matches[0] !== undefined) {
      return registered[matches[0]]
    }
  }

  return registered[interpolation]
}

function handleInterpolation(
  interpolation: any,
  couldBeSelectorInterpolation: boolean
) {
  if (
    interpolation === undefined ||
    interpolation === null ||
    typeof interpolation === 'boolean'
  ) {
    return ''
  }

  if (typeof interpolation === 'function') {
    return handleInterpolation.call(
      this,
      this === undefined
        ? interpolation()
        : interpolation(this.mergedProps, this.context),
      couldBeSelectorInterpolation
    )
  }

  if (typeof interpolation === 'object') {
    return createStringFromObject.call(this, interpolation)
  }

  if (
    couldBeSelectorInterpolation === false &&
    getRegisteredStylesFromString(interpolation) !== undefined
  ) {
    return getRegisteredStylesFromString(interpolation)
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
    flatten(obj).forEach(function(interpolation) {
      string += handleInterpolation.call(this, interpolation, false)
    }, this)
  } else {
    Object.keys(obj).forEach(function(key) {
      if (typeof obj[key] !== 'object') {
        if (registered[obj[key]] !== undefined) {
          string += `${key}{${getRegisteredStylesFromString(obj[key])}}`
        } else {
          string += `${processStyleName(key)}:${processStyleValue(
            key,
            obj[key]
          )};`
        }
      } else {
        string += `${key}{${handleInterpolation.call(this, obj[key], false)}}`
      }
    }, this)
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
  let meta = {}

  if (strings == null || strings.raw === undefined) {
    stringMode = false
    styles = handleInterpolation.call(this, strings, false)
  } else {
    styles = strings[0]
  }

  interpolations.forEach(function(interpolation, i) {
    if (typeof interpolation === 'object' && 'meta' in interpolation) {
      meta = interpolation.meta
      return
    }

    styles += handleInterpolation.call(
      this,
      interpolation,
      isLastCharDot(styles)
    )
    if (stringMode === true && strings[i + 1] !== undefined) {
      styles += strings[i + 1]
    }
  }, this)

  return { styles, meta }
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

export function css() {
  const { styles, meta } = createStyles.apply(this, arguments)
  const hash = hashString(styles)
  const cls = `css-${hash}`

  if (getRegisteredStylesFromString(cls) === undefined) {
    registered[cls] = styles
  }

  if (inserted[cls] === undefined) {
    stylis(`.${cls}`, styles)
    inserted[hash] = true
  }

  return meta.identifierName !== undefined
    ? `${cls} ${meta.identifierName}`
    : cls
}

export function keyframes() {
  const { styles, meta } = createStyles.apply(this, arguments)
  const hash = hashString(styles)
  const name =
    meta.identifierName !== undefined
      ? `animation-${hash}-${meta.identifierName}`
      : `animation-${hash}`

  if (inserted[hash] === undefined) {
    stylis('', `@keyframes ${name}{${styles}}`)
    inserted[hash] = true
  }
  return name
}

export function injectGlobal() {
  const { styles } = createStyles.apply(this, arguments)
  const hash = hashString(styles)
  if (inserted[hash] === undefined) {
    stylis('', styles)
    inserted[hash] = true
  }
}

export function fontFace() {
  const { styles } = createStyles.apply(this, arguments)
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
  const what = rawClassName + css(registeredStyles, sourceMap).split(' ')[0]
  console.log(what)
  return what
}

export function hydrate(ids) {
  ids.forEach(id => {
    inserted[id] = true
  })
}
