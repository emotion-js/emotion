// @flow
import createCache from '@emotion/cache'
import { serializeStyles } from '@emotion/serialize'
import {
  insertStyles,
  getRegisteredStyles,
  type EmotionCache,
  type SerializedStyles
} from '@emotion/utils'

function insertWithoutScoping(cache, serialized: SerializedStyles) {
  if (cache.inserted[serialized.name] === undefined) {
    return cache.insert('', serialized, cache.sheet, true)
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
  cache: EmotionCache,
  merge: *,
  getRegisteredStyles: *
}

let createEmotion = (options: *): Emotion => {
  let cache = createCache(options)

  // $FlowFixMe
  cache.sheet.speedy = function(value: boolean) {
    if (process.env.NODE_ENV !== 'production' && this.ctr !== 0) {
      throw new Error('speedy must be changed before any rules are inserted')
    }
    this.isSpeedy = value
  }
  cache.compat = true

  let css = function(...args) {
    let serialized = serializeStyles(
      args,
      cache.registered,
      this !== undefined ? this.mergedProps : undefined
    )
    insertStyles(cache, serialized, false)
    return `${cache.key}-${serialized.name}`
  }

  let keyframes = (...args) => {
    let serialized = serializeStyles(args, cache.registered)
    let animation = `animation-${serialized.name}`
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: `@keyframes ${animation}{${serialized.styles}}`
    })

    return animation
  }
  let injectGlobal = (...args) => {
    let serialized = serializeStyles(args, cache.registered)
    insertWithoutScoping(cache, serialized)
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
    cache,
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
