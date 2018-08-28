// @flow
import createCache from '@emotion/cache'
import { serializeStyles } from '@emotion/serialize'
import {
  insertStyles,
  isBrowser,
  getRegisteredStyles,
  getClassName
} from '@emotion/utils'

function insertWithoutScoping(cache, name: string, styles: string) {
  if (cache.inserted[name] === undefined) {
    let rules = cache.stylis('', styles)
    cache.inserted[name] = true

    if (isBrowser) {
      rules.forEach(cache.sheet.insert, cache.sheet)
    } else {
      let joinedRules = rules.join('')
      cache.inserted[name] = joinedRules
    }
  }
}

function merge(registered: Object, css: (*) => string, className: string) {
  const registeredStyles = []

  const rawClassName = getRegisteredStyles(
    registered,
    registeredStyles,
    className
  )

  if (registeredStyles.length < 2) {
    return className
  }
  return rawClassName + css(registeredStyles)
}

export type Interpolation = any
export type Interpolations = Array<Interpolation>

type CreateStyles<ReturnValue> = (...args: Interpolations) => ReturnValue

type ClassNameArg =
  | string
  | boolean
  | { [key: string]: boolean }
  | Array<ClassNameArg>

type EmotionCaches = {
  registered: { [key: string]: string },
  inserted: { [key: string]: string | true },
  nonce?: string,
  key: string
}

declare class StyleSheet {
  insert(rule: string): void;
  flush(): void;
  speedy(newVal: boolean): void;
  tags: Array<HTMLStyleElement>;
  isSpeedy: number;
  ctr: number;
}

export type Emotion = {
  css: CreateStyles<string>,
  cx: (...classNames: Array<ClassNameArg>) => string,
  flush: () => void,
  hydrate: (ids: Array<string>) => void,
  injectGlobal: CreateStyles<void>,
  keyframes: CreateStyles<string>,
  sheet: StyleSheet,
  caches: EmotionCaches,
  merge: *,
  getRegisteredStyles: *
}

let createEmotion = (options: *): Emotion => {
  let cache = createCache(options)

  // $FlowFixMe
  cache.sheet.speedy = function(value: boolean) {
    if (this.ctr !== 0) {
      throw new Error('speedy must be changed before any rules are inserted')
    }
    this.isSpeedy = value
    this.maxLength = value ? 65000 : 1
  }
  cache.compat = true

  let css = function(...args) {
    let serialized = serializeStyles(
      cache.registered,
      args,
      this !== undefined ? this.mergedProps : undefined
    )
    insertStyles(cache, serialized, false)
    return getClassName(cache, serialized)
  }

  let keyframes = (...args) => {
    let serialized = serializeStyles(cache.registered, args)
    let animation = `animation-${serialized.name}${serialized.label || ''}`
    insertWithoutScoping(
      cache,
      serialized.name,
      `@keyframes ${animation}{${serialized.styles}}`
    )

    return animation
  }
  let injectGlobal = (...args) => {
    let serialized = serializeStyles(cache.registered, args)
    insertWithoutScoping(cache, serialized.name, serialized.styles)
  }

  let cx = (...args) => {
    return merge(cache.registered, css, classnames(args))
  }
  return {
    css,
    cx,
    injectGlobal,
    keyframes,
    hydrate(ids: Array<string>) {
      ids.forEach(key => {
        cache.inserted[key] = true
      })
    },
    flush() {
      cache.registered = {}
      cache.inserted = {}
      cache.sheet.flush()
    },
    // $FlowFixMe
    sheet: cache.sheet,
    caches: cache,
    getRegisteredStyles: getRegisteredStyles.bind(null, cache.registered),
    merge: merge.bind(null, cache.registered, css)
  }
}

let classnames = args => {
  let cls = ''
  for (let i = 0; i < args.length; i++) {
    let arg = args[i]
    if (arg == null) continue

    let toAdd
    switch (typeof arg) {
      case 'boolean':
        break
      case 'object': {
        if (Array.isArray(arg)) {
          toAdd = classnames(arg)
        } else {
          toAdd = ''
          for (const k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += ' ')
              toAdd += k
            }
          }
        }
        break
      }
      default: {
        toAdd = arg
      }
    }
    if (toAdd) {
      cls && (cls += ' ')
      cls += toAdd
    }
  }
  return cls
}

export default createEmotion
