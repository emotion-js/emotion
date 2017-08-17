// @flow
import { StyleSheet } from './sheet'
import {
  forEach,
  map,
  reduce,
  keys,
  assign,
  clean,
  createMarkupForStyles,
  hashString as hash,
  hashObject
} from 'emotion-utils'

export const sheet = new StyleSheet()
// 🚀
sheet.inject()

export let inserted: { [string | number]: boolean | void } = {}

export function flush() {
  sheet.flush()
  inserted = {}
  sheet.inject()
}

// a simple cache to store generated obj styles
let registered = (sheet.registered = {})

function register(spec) {
  if (!registered[spec.id]) {
    registered[spec.id] = spec
  }
}

function _getRegistered(rule) {
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

function buildStyles(objs) {
  let computedClassName = ''
  let objectStyles = []
  // This needs to be moved into the core
  forEach(objs, (cls): void => {
    if (typeof cls === 'string') {
      const match = emotionClassRegex.exec(cls)
      if (match !== null && ruleCache[match[1]] !== undefined) {
        objectStyles.push(ruleCache[match[1]])
      } else {
        computedClassName && (computedClassName += ' ')
        computedClassName += cls
      }
    } else {
      objectStyles.push(cls)
    }
  })

  return { computedClassName, objectStyles }
}

export function css(objs: any, vars: Array<any>, content: () => Array<any>) {
  if (!Array.isArray(objs)) {
    objs = [objs]
  }

  let { computedClassName = '', objectStyles = [] } = buildStyles(
    content ? objs.concat(content.apply(null, vars)) : objs
  )
  if (objectStyles.length) {
    computedClassName += ' ' + objStyle.apply(null, objectStyles).toString()
  }

  return computedClassName.trim()
}

function insertRawRule(css: string) {
  let spec = {
    id: hash(css),
    css,
    type: 'raw'
  }

  register(spec)

  if (!inserted[spec.id]) {
    sheet.insert(spec.css)
    inserted[spec.id] = true
  }
}

export function injectGlobal(
  objs: Array<any>,
  vars: Array<any>,
  content: () => Array<any>
) {
  const combined = content ? objs.concat(content.apply(null, vars)) : objs
  const style = {}
  build(style, { src: combined })
  forEach(deconstructedStyleToCSS('', deconstruct(style)), rule => {
    insertRawRule(rule)
  })
}

export function fontFace(
  objs: Array<any>,
  vars: Array<any>,
  content: () => Array<any>
) {
  const combined = reduce(
    content ? objs.concat(content.apply(null, vars)) : objs,
    (accum, item, i) => assign(accum, item),
    {}
  )

  insertRawRule(`@font-face{${createMarkupForStyles(combined)}}`)
}

function insertKeyframe(spec) {
  if (!inserted[spec.id]) {
    const inner = map(
      keys(spec.keyframes),
      kf => `${kf} {${createMarkupForStyles(spec.keyframes[kf])}}`
    ).join('')

    forEach(['-webkit-', ''], prefix =>
      sheet.insert(`@${prefix}keyframes ${spec.name + '_' + spec.id}{${inner}}`)
    )

    inserted[spec.id] = true
  }
}

export function keyframes(
  objs: any,
  vars: Array<any>,
  content: () => Array<any>
) {
  const [kfs] = content.apply(null, vars)
  const name = 'animation'

  let spec = {
    id: hashObject(kfs),
    type: 'keyframes',
    name,
    keyframes: kfs
  }

  register(spec)
  insertKeyframe(spec)
  return `${name}_${spec.id}`
}

export function hydrate(ids: string[]) {
  forEach(ids, id => (inserted[id] = true))
}

type EmotionRule = { [string]: any }

type CSSRuleList = Array<EmotionRule>

let cachedCss: (rules: CSSRuleList) => EmotionRule =
  typeof WeakMap !== 'undefined' ? multiIndexCache(_css) : _css

// 🍩
// https://github.com/threepointone/glamor
export function objStyle(...rules: CSSRuleList): EmotionRule {
  rules = clean(rules)
  if (!rules) {
    return nullrule
  }

  return cachedCss(rules)
}

function _css(rules) {
  let style = {}
  build(style, { src: rules }) // mutative! but worth it.

  let spec = {
    id: hashObject(style),
    style,
    type: 'css'
  }
  return toRule(spec)
}

const emotionClassRegex = /^css-([a-zA-Z0-9]+)/

// of shape { 'css-<id>': '' }
export function isLikeRule(rule: EmotionRule) {
  const ruleKeys = keys(rule)
  if (ruleKeys.length !== 1) {
    return false
  }
  return !!emotionClassRegex.exec(ruleKeys[0])
}

// extracts id from a { 'css-<id>': ''} like object
export function idFor(rule: EmotionRule) {
  const ruleKeys = keys(rule)
  if (ruleKeys.length !== 1) throw new Error('not a rule')
  let match = emotionClassRegex.exec(ruleKeys[0])
  if (!match) throw new Error('not a rule')
  return match[1]
}

const parentSelectorRegex = /&/gm

function selector(parentSelector: string, path: string = '') {
  if (!parentSelector) {
    return path.replace(parentSelectorRegex, '')
  }
  if (!path) return parentSelector

  let x = map(
    path.split(','),
    x =>
      x.indexOf('&') >= 0
        ? x.replace(parentSelectorRegex, parentSelector)
        : parentSelector + x
  ).join(',')

  return x
}

function deconstruct(style) {
  // we can be sure it's not infinitely nested here
  let plain
  let selects
  let medias
  let supports

  forEach(keys(style), key => {
    if (key.indexOf('&') >= 0) {
      selects = selects || {}
      selects[key] = deconstruct(style[key]).plain
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

function deconstructedStyleToCSS(id, style) {
  let { plain, selects, medias, supports } = style
  let css = []

  if (plain) {
    css.push(`${selector(id)}{${createMarkupForStyles(plain)}}`)
  }
  if (selects) {
    forEach(keys(selects), (key: string) =>
      css.push(`${selector(id, key)}{${createMarkupForStyles(selects[key])}}`)
    )
  }
  if (medias) {
    forEach(keys(medias), key =>
      css.push(`${key}{${deconstructedStyleToCSS(id, medias[key]).join('')}}`)
    )
  }
  if (supports) {
    forEach(keys(supports), key =>
      css.push(`${key}{${deconstructedStyleToCSS(id, supports[key]).join('')}}`)
    )
  }
  return css
}

// and helpers to insert rules into said sheet
function insert(spec) {
  if (!inserted[spec.id]) {
    inserted[spec.id] = true
    let deconstructed = deconstruct(spec.style)
    map(deconstructedStyleToCSS(`.css-${spec.id}`, deconstructed), cssRule =>
      sheet.insert(cssRule)
    )
  }
}

// todo - perf
let ruleCache = {}

function toRule(spec) {
  register(spec)
  insert(spec)
  if (ruleCache[spec.id]) {
    return ruleCache[spec.id]
  }

  let ret = { [`css-${spec.id}`]: '' }
  Object.defineProperty(ret, 'toString', {
    enumerable: false,
    value() {
      return 'css-' + spec.id
    }
  })
  ruleCache[spec.id] = ret
  return ret
}

function isFragment(key) {
  return key.indexOf('$') === 0
}

function isSelector(val) {
  return typeof val === 'object'
}

function joinSelectors(a, b) {
  let as = map(a.split(','), a => (!(a.indexOf('&') >= 0) ? '&' + a : a))
  let bs = map(b.split(','), b => (!(b.indexOf('&') >= 0) ? '&' + b : b))

  return reduce(
    bs,
    (arr, b) => arr.concat(map(as, a => b.replace(parentSelectorRegex, a))),
    []
  ).join(',')
}

function joinMediaQueries(a, b) {
  return a ? `@media ${a.substring(6)} and ${b.substring(6)}` : b
}

function isMediaQuery(key) {
  return key.indexOf('@media') === 0
}

function isSupports(key) {
  return key.indexOf('@supports') === 0
}

function joinSupports(a, b) {
  return a ? `@supports ${a.substring(9)} and ${b.substring(9)}` : b
}

// flatten a nested array
function flatten(inArr) {
  let arr = []
  forEach(inArr, val => {
    if (Array.isArray(val)) arr = arr.concat(flatten(val))
    else arr = arr.concat(val)
  })

  return arr
}

// mutable! modifies dest.
function build(
  dest,
  {
    selector = '',
    mq = '',
    supp = '',
    src = [{}]
  }: {
    selector?: string,
    mq?: string,
    supp?: string,
    src: Array<{ [string]: any }>
  }
) {
  if (!Array.isArray(src)) {
    src = [src]
  }
  src = flatten(src)
  forEach(src, _src => {
    if (isLikeRule(_src)) {
      let reg = _getRegistered(_src)
      if (reg.type !== 'css') {
        throw new Error('cannot merge this rule')
      }
      _src = reg.style
    }
    _src = clean(_src)
    if (_src && _src.composes) {
      build(dest, { selector, mq, supp, src: _src.composes })
    }

    forEach(keys(_src || {}), key => {
      // replace fragments
      if (isFragment(key)) {
        const fragment = _src[key]

        if (typeof fragment === 'string') {
          const match = emotionClassRegex.exec(fragment)
          if (match !== null && registered[match[1]]) {
            const reg = registered[match[1]]
            if (reg.type !== 'css') {
              throw new Error('cannot merge this rule')
            }
            build(dest, {
              selector,
              mq,
              supp,
              src: reg.style
            })
          }
        } else {
          build(dest, {
            selector,
            mq,
            supp,
            src: fragment
          })
        }
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
        // ignore, we already dealt with it
      } else if (isSelector(_src[key])) {
        build(dest, {
          selector: joinSelectors(selector, key),
          mq,
          supp,
          src: _src[key]
        })
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

let nullrule: EmotionRule = {
  // 'data-css-nil': ''
}

Object.defineProperty(nullrule, 'toString', {
  enumerable: false,
  value() {
    return 'css-nil'
  }
})

let inputCaches =
  typeof WeakMap !== 'undefined'
    ? [nullrule, new WeakMap(), new WeakMap(), new WeakMap()]
    : [nullrule]

let warnedWeakMapError = false

function multiIndexCache(fn) {
  return function(args) {
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
      let ctr = 0
      let coi = inputCaches[args.length]
      while (ctr < args.length - 1) {
        coi = coi.get(args[ctr])
        ctr++
      }
      try {
        coi.set(args[ctr], value)
      } catch (err) {
        if (
          (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) &&
          !warnedWeakMapError
        ) {
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
