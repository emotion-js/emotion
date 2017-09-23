import { hashString, Stylis, memoize, unitless } from 'emotion-utils'
import StyleSheet from './sheet'

export const sheet = new StyleSheet()
// 🚀
sheet.inject()
const stylisOptions = { keyframe: false, compress: false }

const stylis = new Stylis(stylisOptions)
const keyframeStylis = new Stylis(stylisOptions)

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
    case 3:
      queue.push(`${selectors.join(',')}{${content}}`)
  }
}

function keyframeInsertionPlugin(context, content, selector) {
  if (context === 3) {
    sheet.insert(
      `${selector[0].replace('keyframes', '-webkit-keyframes')}{${content}}`
    )
    sheet.insert(`${selector[0]}{${content}}`)
  }
}

stylis.use(insertionPlugin)
keyframeStylis.use(keyframeInsertionPlugin)

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

function createStringFromObject(obj) {
  let string = ''

  if (Array.isArray(obj)) {
    flatten(obj).forEach(interpolation => {
      string += handleInterpolation(interpolation, false)
    })
  } else {
    Object.keys(obj).forEach(key => {
      if (key === '__emotion_source_map') {
        currentSourceMap = obj[key]
        return
      }

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

function identityParser(selector, styles) {
  return styles
}

const sourceMapRegEx = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//
function buildAndInsertStyles(selector, styles, parser) {
  if (process.env.NODE_ENV === 'production') {
    parser(selector, styles)
  } else {
    const result = sourceMapRegEx.exec(styles)
    currentSourceMap = currentSourceMap.length
      ? currentSourceMap
      : result ? result[0] : ''
    parser(selector, styles)
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
    buildAndInsertStyles(`.${cls}`, styles, stylis)
    inserted[hash] = true
  }
  return cls
}

export function injectGlobal(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  if (inserted[hash] === undefined) {
    buildAndInsertStyles(``, styles, stylis)
    inserted[hash] = true
  }
}

export function keyframes(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  const name = `animation-${hash}`
  if (inserted[hash] === undefined) {
    buildAndInsertStyles('', `@keyframes ${name}{${styles}}`, keyframeStylis)
    inserted[hash] = true
  }
  return name
}

export function fontFace(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  if (inserted[hash] === undefined) {
    sheet.insert(`@font-face{${styles}}`)
    buildAndInsertStyles('', `@font-face{${styles}}`, identityParser)
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

export function merge(className) {
  const registeredStyles = []

  const rawClassName = getRegisteredStyles(registeredStyles, className)

  if (registeredStyles.length < 2) {
    return className
  }
  return rawClassName + css(...registeredStyles)
}

export function hydrate(ids) {
  ids.forEach(id => {
    inserted[id] = true
  })
}
