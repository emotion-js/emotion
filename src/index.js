// @flow
import forEach from '@arr/foreach'
import { StyleSheet } from './sheet'
import { hashString as hash, hashArray, hashObject } from './hash'
import { createMarkupForStyles } from './glamor/CSSPropertyOperations'
import clean from './glamor/clean.js'

export const sheet = new StyleSheet()
// 🚀
sheet.inject()

export let inserted: { [string]: boolean | void } = {}

type inputVar = string | number

type vars = Array<inputVar>

export function flush () {
  sheet.flush()
  inserted = {}
  sheet.inject()
}

// a simple cache to store generated obj styles
let registered = (sheet.registered = {})

function register (spec) {
  if (!registered[spec.id]) {
    registered[spec.id] = spec
  }
}

function _getRegistered (rule) {
  if (isLikeRule(rule)) {
    let ret = registered[idFor(rule)]
    if (ret == null) {
      throw new Error(
        '[emotion] an unexpected rule cache miss occurred. This is probably a sign of multiple glamor instances in your app. See https://github.com/threepointone/glamor/issues/79'
      )
    }
    return ret
  }
  return rule
}

// The idea on how to merge object class names come from glamorous
// 💄
// https://github.com/paypal/glamorous/blob/master/src/get-glamor-classname.js
function getEmotionStylesFromClassName (className) {
  const id = className.trim().slice('css-'.length)
  if (sheet.registered[id]) {
    return sheet.registered[id].style
  } else {
    return []
  }
}

function buildStyles (objs) {
  let computedClassName = ''
  let objectStyles = []

  // This needs to be moved into the core
  forEach(objs, (cls): void => {
    if (typeof cls === 'string') {
      if (cls.trim().indexOf('css-') === 0) {
        objectStyles.push(getEmotionStylesFromClassName(cls))
      } else {
        computedClassName && (computedClassName += ' ')
        computedClassName += cls
      }
    } else {
      objectStyles.push(
        cls
      )
    }
  })

  return { computedClassName, objectStyles }
}

export function css (objs: any, vars: Array<any>, content: () => Array<any>) {
  if (!Array.isArray(objs)) {
    objs = [objs]
  }

  let { computedClassName = '', objectStyles = [] } = buildStyles(content ? objs.concat(content.apply(null, vars)) : objs)
  if (objectStyles.length) {
    computedClassName += ' ' + objStyle.apply(null, objectStyles).toString()
  }

  return computedClassName.trim()
}

export function injectGlobal (src: string[]) {
  const hash = hashArray(src)
  if (!inserted[hash]) {
    inserted[hash] = true
    forEach(src, r => sheet.insert(r))
  }
}

export const fontFace = injectGlobal

export function keyframes (kfm: string, src: string[]) {
  const hash = hashArray(src)
  const animationName = `${kfm}-${hash}`
  if (!inserted[hash]) {
    inserted[hash] = true
    forEach(src, r => sheet.insert(`@keyframes ${animationName} ${r}`))
  }
  return animationName
}

export function hydrate (ids: string[]) {
  forEach(ids, id => (inserted[id] = true))
}

// 🍩
// https://github.com/jxnblk/cxs/blob/master/src/monolithic/index.js
type EmotionRule = { [string]: any }

type CSSRuleList = Array<EmotionRule>

type EmotionClassName = {
  [string]: any
}

let cachedCss: (rules: CSSRuleList) => EmotionClassName = typeof WeakMap !==
  'undefined'
  ? multiIndexCache(_css)
  : _css

export function objStyle (...rules: CSSRuleList): EmotionClassName {
  rules = clean(rules)
  if (!rules) {
    return nullrule
  }

  return cachedCss(rules)
}

function _css (rules) {
  let style = {}
  build(style, { src: rules }) // mutative! but worth it.

  let spec = {
    id: hashObject(style),
    style,
    type: 'css'
  }
  return toRule(spec)
}

// define some constants

const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
const isTest = process.env.NODE_ENV === 'test'

// takes a string, converts to lowercase, strips out nonalphanumeric.
function simple (str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '')
}

// of shape { 'data-css-<id>': '' }
export function isLikeRule (rule: EmotionRule) {
  let keys = Object.keys(rule).filter(x => x !== 'toString')
  if (keys.length !== 1) {
    return false
  }
  return !!/css\-obj\-([a-zA-Z0-9]+)/.exec(keys[0])
}

// extracts id from a { 'css-<id>': ''} like object
export function idFor (rule: EmotionRule) {
  let keys = Object.keys(rule).filter(x => x !== 'toString')
  if (keys.length !== 1) throw new Error('not a rule')
  let regex = /css\-obj\-([a-zA-Z0-9]+)/
  let match = regex.exec(keys[0])
  if (!match) throw new Error('not a rule')
  return match[1]
}

function selector (id: string, path: string = '') {
  if (!id) {
    return path.replace(/\&/g, '')
  }
  if (!path) return `.css-${id}`

  let x = path
    .split(',')
    .map(
      x =>
        x.indexOf('&') >= 0
          ? x.replace(/\&/gm, `.css-${id}`)
          : `.css-${id}${x}`
    )
    .join(',')

  return x
}

function deconstruct (style) {
  // we can be sure it's not infinitely nested here
  let plain, selects, medias, supports
  Object.keys(style).forEach(key => {
    if (key.indexOf('&') >= 0) {
      selects = selects || {}
      selects[key] = style[key]
    } else if (key.indexOf('@media') === 0) {
      medias = medias || {}
      medias[key] = deconstruct(style[key])
    } else if (key.indexOf('@supports') === 0) {
      supports = supports || {}
      supports[key] = deconstruct(style[key])
    } else {
      plain = plain || {}
      plain[key] = style[key]
    }
  })
  return { plain, selects, medias, supports }
}

function deconstructedStyleToCSS (id, style) {
  let { plain, selects, medias, supports } = style
  let css = []

  if (plain) {
    css.push(`${selector(id)}{${createMarkupForStyles(plain)}}`)
  }
  if (selects) {
    Object.keys(selects).forEach((key: string) =>
      css.push(`${selector(id, key)}{${createMarkupForStyles(selects[key])}}`)
    )
  }
  if (medias) {
    Object.keys(medias).forEach(key =>
      css.push(`${key}{${deconstructedStyleToCSS(id, medias[key]).join('')}}`)
    )
  }
  if (supports) {
    Object.keys(supports).forEach(key =>
      css.push(`${key}{${deconstructedStyleToCSS(id, supports[key]).join('')}}`)
    )
  }
  return css
}

// and helpers to insert rules into said sheet
function insert (spec) {
  if (!inserted[spec.id]) {
    inserted[spec.id] = true
    let deconstructed = deconstruct(spec.style)
    deconstructedStyleToCSS(spec.id, deconstructed).map(cssRule =>
      sheet.insert(cssRule)
    )
  }
}

// todo - perf
let ruleCache = {}

function toRule (spec) {
  register(spec)
  insert(spec)
  console.log(spec)
  if (ruleCache[spec.id]) {
    return ruleCache[spec.id]
  }

  let ret = { [`css-${spec.id}`]: '' }
  Object.defineProperty(ret, 'toString', {
    enumerable: false,
    value () {
      return 'css-' + spec.id
    }
  })
  ruleCache[spec.id] = ret
  return ret
}

function log () {
  // eslint-disable-line no-unused-vars
  console.log(this) // eslint-disable-line no-console
  return this
}

function isSelector (key) {
  let possibles = [':', '.', '[', '>', ' '],
    found = false,
    ch = key.charAt(0)
  for (let i = 0; i < possibles.length; i++) {
    if (ch === possibles[i]) {
      found = true
      break
    }
  }
  return found || key.indexOf('&') >= 0
}

function joinSelectors (a, b) {
  let as = a.split(',').map(a => (!(a.indexOf('&') >= 0) ? '&' + a : a))
  let bs = b.split(',').map(b => (!(b.indexOf('&') >= 0) ? '&' + b : b))

  return bs
    .reduce((arr, b) => arr.concat(as.map(a => b.replace(/\&/g, a))), [])
    .join(',')
}

function joinMediaQueries (a, b) {
  return a ? `@media ${a.substring(6)} and ${b.substring(6)}` : b
}

function isMediaQuery (key) {
  return key.indexOf('@media') === 0
}

function isSupports (key) {
  return key.indexOf('@supports') === 0
}

function joinSupports (a, b) {
  return a ? `@supports ${a.substring(9)} and ${b.substring(9)}` : b
}

// flatten a nested array
function flatten (inArr) {
  let arr = []
  for (let i = 0; i < inArr.length; i++) {
    if (Array.isArray(inArr[i])) arr = arr.concat(flatten(inArr[i]))
    else arr = arr.concat(inArr[i])
  }
  return arr
}

// mutable! modifies dest.
function build (dest, { selector = '', mq = '', supp = '', src = {} }) {
  if (!Array.isArray(src)) {
    src = [src]
  }
  src = flatten(src)

  src.forEach(_src => {
    if (isLikeRule(_src)) {
      let reg = _getRegistered(_src)
      if (reg.type !== 'css') {
        throw new Error('cannot merge this rule')
      }
      _src = reg.style
    }
    _src = clean(_src)
    if (_src && _src.composes) {
      console.log('found composes')
      build(dest, { selector, mq, supp, src: _src.composes })
    }
    Object.keys(_src || {}).forEach(key => {
      if (isSelector(key)) {
        if (key === '::placeholder') {
          build(dest, {
            selector: joinSelectors(selector, '::-webkit-input-placeholder'),
            mq,
            supp,
            src: _src[key]
          })
          build(dest, {
            selector: joinSelectors(selector, '::-moz-placeholder'),
            mq,
            supp,
            src: _src[key]
          })
          build(dest, {
            selector: joinSelectors(selector, '::-ms-input-placeholder'),
            mq,
            supp,
            src: _src[key]
          })
        }

        build(dest, {
          selector: joinSelectors(selector, key),
          mq,
          supp,
          src: _src[key]
        })
      } else if (isMediaQuery(key)) {
        build(dest, {
          selector,
          mq: joinMediaQueries(mq, key),
          supp,
          src: _src[key]
        })
      } else if (isSupports(key)) {
        build(dest, {
          selector,
          mq,
          supp: joinSupports(supp, key),
          src: _src[key]
        })
      } else if (key === 'composes') {
        // ignore, we already dealth with it
        console.log('key === composes')
      } else {
        let _dest = dest
        if (supp) {
          _dest[supp] = _dest[supp] || {}
          _dest = _dest[supp]
        }
        if (mq) {
          _dest[mq] = _dest[mq] || {}
          _dest = _dest[mq]
        }
        if (selector) {
          _dest[selector] = _dest[selector] || {}
          _dest = _dest[selector]
        }

        _dest[key] = _src[key]
      }
    })
  })
}

let nullrule: EmotionClassName = {
  // 'data-css-nil': ''
}

Object.defineProperty(nullrule, 'toString', {
  enumerable: false,
  value () {
    return 'css-nil'
  }
})

let inputCaches = typeof WeakMap !== 'undefined'
  ? [nullrule, new WeakMap(), new WeakMap(), new WeakMap()]
  : [nullrule]

let warnedWeakMapError = false

function multiIndexCache (fn) {
  return function (args) {
    if (inputCaches[args.length]) {
      let coi = inputCaches[args.length]
      let ctr = 0
      while (ctr < args.length - 1) {
        if (!coi.has(args[ctr])) {
          coi.set(args[ctr], new WeakMap())
        }
        coi = coi.get(args[ctr])
        ctr++
      }
      if (coi.has(args[args.length - 1])) {
        let ret = coi.get(args[ctr])

        if (registered[ret.toString().substring(4)]) {
          // make sure it hasn't been flushed
          return ret
        }
      }
    }
    let value = fn(args)
    if (inputCaches[args.length]) {
      let ctr = 0,
        coi = inputCaches[args.length]
      while (ctr < args.length - 1) {
        coi = coi.get(args[ctr])
        ctr++
      }
      try {
        coi.set(args[ctr], value)
      } catch (err) {
        if (isDev && !warnedWeakMapError) {
          warnedWeakMapError = true
          console.warn('failed setting the WeakMap cache for args:', ...args) // eslint-disable-line no-console
          console.warn(
            'this should NOT happen, please file a bug on the github repo.'
          ) // eslint-disable-line no-console
        }
      }
    }
    return value
  }
}
