// @flow
import { StyleSheet } from './sheet'
import { hashArray, hashString } from './hash'

export const sheet = new StyleSheet()
sheet.inject()

export let inserted: { [string]: boolean | void } = {}

type inputVar = string | number

type vars = Array<inputVar>

function values (cls: string, vars: vars) {
  const hash = hashArray([cls, ...vars])
  const varCls = `vars-${hash}`
  if (inserted[hash]) {
    return varCls
  }
  let src = vars
    .map((val: inputVar, i: number) => `--${cls}-${i}: ${val}`)
    .join('; ')
  sheet.insert(`.${varCls} {${src}}`)
  inserted[hash] = true

  return varCls
}

export function flush () {
  sheet.flush()
  inserted = {}
  sheet.inject()
}

export function css (classes: string[], vars: vars, content: () => string[]) {
  if (content) {
    // inline mode
    let src = content(...vars) // returns an array
    let hash = hashArray(src)

    if (!inserted[hash]) {
      inserted[hash] = true
      src
        .map(r =>
          r.replace(new RegExp(classes[0], 'gm'), `${classes[0]}-${hash}`)
        )
        .forEach(r => sheet.insert(r))
    }
    return `${classes[0]}-${hash} ${classes.join(' ')}`
  }

  if (!Array.isArray(classes)) {
    return objStyle(classes)
  }

  const computedClassName = classes
    .reduce((out: string, cls): string => {
      if (typeof cls === 'string') {
        out += ' ' + cls
        return out
      }

      out += ' ' + objStyle(cls)
      return out
    }, '')
    .trim()

  return (
    computedClassName +
    (vars && vars.length > 0 ? ' ' + values(classes[0], vars) : '')
  )
}

export function injectGlobal (src: string[]) {
  const hash = hashArray(src)
  if (!inserted[hash]) {
    inserted[hash] = true
    src.forEach(r => sheet.insert(r))
  }
}

export const fontFace = injectGlobal

export function keyframes (kfm: string, src: string[]) {
  const hash = hashArray(src)
  const animationName = `${kfm}-${hash}`
  if (!inserted[hash]) {
    inserted[hash] = true
    src.forEach(r => {
      sheet.insert(`@keyframes ${animationName} ${r}`)
    })
  }
  return animationName
}

export function hydrate (ids: string[]) {
  ids.forEach(id => (inserted[id] = true))
}

// ported from cxs-lite
// https://github.com/jxnblk/cxs/blob/master/src/lite/index.js
export function objStyle (style: { [string]: any }) {
  return deconstruct(style)
}

function deconstruct (obj, media, pseudo = '') {
  let className = ''

  for (let key in obj) {
    const value = obj[key]
    const type = typeof value

    if (type === 'string' || type === 'number') {
      className += ' ' + createStyle(key, value, media, pseudo)
      continue
    }

    if (key.charAt(0) === ':') {
      className += ' ' + deconstruct(value, media, pseudo + key)
      continue
    }

    if (key.charAt(0) === '@') {
      className += ' ' + deconstruct(value, key, pseudo)
      continue
    }

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        className += ' ' + createStyle(key, value[i], media, pseudo)
      }
      continue
    }
  }

  return className.trim()
}

function createStyle (key, value, media, pseudo = ''): string {
  const hash = hashString(key + value + (media || '') + pseudo).toString(36)
  if (inserted[hash]) return `css-${hash}`

  const className = `css-${hash}`
  const selector = '.' + className + pseudo

  const prop = hyphenate(key)
  const val = addPx(key, value)

  const rule = selector + '{' + prop + ':' + val + '}'
  sheet.insert(media ? media + '{' + rule + '}' : rule)
  inserted[hash] = true

  return className
}

function hyphenate (str) {
  return ('' + str).replace(/[A-Z]|^ms/g, '-$&').toLowerCase()
}

function addPx (prop, value) {
  if (typeof value !== 'number' || unitlessProps[prop]) return value
  return value + 'px'
}

const unitlessProps = {
  animationIterationCount: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridColumn: 1,
  fontWeight: 1,
  lineClamp: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  fillOpacity: 1,
  stopOpacity: 1,
  strokeDashoffset: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}
