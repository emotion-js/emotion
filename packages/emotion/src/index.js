import hashString from './hash'
import StyleSheet from './sheet'
import Stylis from './stylis'

const stylis = new Stylis()
const registerCacheStylis = new Stylis()

export const sheet = new StyleSheet()

sheet.inject()

export const registered = {}

export const inserted = {}

function compositionPlugin(context, content, selector, parent) {
  if (context === 1) {
    return registered[content]
  }
}

function insertionPlugin(context, content, selector, parent) {
  switch (context) {
    case 2: {
      if (parent.length !== 0 && parent[0] === selector[0]) {
        break
      }
    }
    // after an at rule block
    case 3: // eslint-disable-line no-fallthrough
      sheet.insert(`${selector.join(',')}{${content}}`)
  }
}

stylis.use([compositionPlugin, insertionPlugin])
registerCacheStylis.use(compositionPlugin)

const hyphenateRegex = /[A-Z]|^ms/g

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

function createStringFromObject(obj) {
  let string = ''

  if (Array.isArray(obj)) {
    flatten(obj).forEach(interpolation => {
      string += handleInterpolation(interpolation)
    })
  } else {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'string') {
        string += `${key.replace(hyphenateRegex, '-$&').toLowerCase()}:${obj[
          key
        ]};`
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
    registered[cls] = registerCacheStylis('&', styles).replace(
      andReplaceRegex,
      '$1'
    )
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
