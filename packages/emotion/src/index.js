import { hashString, Stylis, memoize, unitless } from 'emotion-utils'
import StyleSheet from './sheet'

export const sheet = new StyleSheet()
// 🚀
sheet.inject()
const stylisOptions = { keyframe: false }

const stylis = new Stylis(stylisOptions)
const shadowStylis = new Stylis(stylisOptions)
const keyframeStylis = new Stylis(stylisOptions)

export let registered = {}

export let inserted = {}

export function flush() {
  sheet.flush()
  inserted = {}
  registered = {}
  sheet.inject()
}

function compositionPlugin(context, content, selector, parent) {
  if (context === 1) {
    return registered[content]
  }
}

function insertionPlugin(context, content, selector, parent) {
  switch (context) {
    case 2: {
      if (parent[0] === selector[0]) {
        break
      }
    }
    // after an at rule block
    case 3: // eslint-disable-line no-fallthrough
      sheet.insert(`${selector.join(',')}{${content}}`)
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

stylis.use([compositionPlugin, insertionPlugin])
shadowStylis.use(compositionPlugin)
keyframeStylis.use(keyframeInsertionPlugin)

function flatten(inArr) {
  let arr = []
  inArr.forEach(val => {
    if (Array.isArray(val)) arr = arr.concat(flatten(val))
    else arr = arr.concat(val)
  })

  return arr
}

function handleInterpolation(interpolation) {
  if (typeof interpolation === 'object') {
    return createStringFromObject(interpolation)
  }
  if (
    interpolation === undefined ||
    interpolation === null ||
    interpolation === false
  )
    return ''

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
      string += handleInterpolation(interpolation)
    })
  } else {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] !== 'object') {
        string += `${processStyleName(key)}:${processStyleValue(
          key,
          obj[key]
        )};`
      } else {
        string += `${key}{${createStringFromObject(obj[key])}}`
      }
    })
  }
  return string
}

function createStyles(strings, ...interpolations) {
  let stringMode = true
  let styles = ''
  if (typeof strings[0] !== 'string') {
    stringMode = false
    styles = handleInterpolation(strings)
  } else {
    styles = strings[0]
  }
  interpolations.forEach((interpolation, i) => {
    styles += handleInterpolation(interpolation)
    if (stringMode === true) {
      styles += strings[i + 1]
    }
  })
  return styles
}

const andReplaceRegex = /&{([^}]*)}/g

export function css(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  const cls = `css-${hash}`
  if (registered[cls] === undefined) {
    registered[cls] = shadowStylis('&', styles).replace(andReplaceRegex, '$1')
  }
  if (inserted[cls] === undefined) {
    stylis(`.${cls}`, styles)
    inserted[cls] = true
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

export function hydrate(ids) {
  ids.forEach(id => {
    inserted[id] = true
  })
}

export function keyframes(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  const name = `animation-${hash}`
  if (inserted[hash] === undefined) {
    keyframeStylis('', `@keyframes ${name}{${styles}}`)
  }
  return name
}

export function fontFace(...args) {
  const styles = createStyles(...args)
  const hash = hashString(styles)
  if (inserted[hash] === undefined) {
    sheet.insert(shadowStylis('', `@font-face {${styles}}`))
  }
}
