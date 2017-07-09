// @flow
import map from '@arr/map'
import { StyleSheet } from './sheet'
import { hashArray, hashObject } from './hash'

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
  let src = map(vars, (val: inputVar, i: number) => `--${cls}-${i}: ${val}`).join('; ')
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
  if (!Array.isArray(classes)) {
    classes = [classes]
  }

  const computedClassName = map(classes, (cls): string => typeof cls === 'string' ? cls : objStyle(cls))
    .join(' ')
    .trim()

  if (content) {
    // inline mode
    let src = content(...vars) // returns an array
    let hash = hashArray(src)

    if (!inserted[hash]) {
      inserted[hash] = true
      map(src, r => r.replace(new RegExp(classes[0], 'gm'), `${classes[0]}-${hash}`))
        .forEach(r => sheet.insert(r))
    }
    return `${classes[0]}-${hash} ${computedClassName}`
  }

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

// 🍩
// https://github.com/jxnblk/cxs/blob/master/src/monolithic/index.js
export function objStyle (style: { [string]: any }) {
  const hash = hashObject(style)
  const className = `css-${hash}`
  const selector = '.' + className

  if (inserted[hash]) return className

  const rules = deconstruct(selector, style)
  rules.forEach(rule => sheet.insert(rule))

  inserted[hash] = true

  return className
}

function deconstruct (selector, styles, media) {
  const decs = []
  const rules = []

  for (let key in styles) {
    const value = styles[key]
    const type = typeof value

    if (type === 'number' || type === 'string') {
      decs.push(createDec(key, value))
      continue
    } else if (Array.isArray(value)) {
      value.forEach(val => {
        decs.push(createDec(key, val))
      })
      continue
    } else if (/^:/.test(key)) {
      deconstruct(selector + key, value, media).forEach(r => rules.push(r))
      continue
    } else if (/^@media/.test(key)) {
      deconstruct(selector, value, key).forEach(r => rules.push(r))
      continue
    } else {
      deconstruct(selector + ' ' + key, value, media).forEach(r =>
        rules.push(r)
      )
      continue
    }
  }

  rules.unshift(createRule(selector, decs, media))

  return rules
}

function createDec (key, value) {
  const prop = hyphenate(key)
  const val = addPx(key, value)
  return prop + ':' + val
}

function createRule (selector, decs, media) {
  const rule = `${selector}{${decs.join(';')}}`
  return media ? `${media}{${rule}}` : rule
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
