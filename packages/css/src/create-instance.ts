import createCache from '@emotion/cache'
import {
  serializeStyles,
  CSSInterpolation,
  Interpolation
} from '@emotion/serialize'
import {
  insertStyles,
  getRegisteredStyles,
  SerializedStyles,
  RegisteredCache
} from '@emotion/utils'
import { EmotionCache, Options } from '@emotion/cache'
import { StyleSheet } from '@emotion/sheet'
import isDevelopment from '#is-development'

export type {
  CSSInterpolation,
  ArrayCSSInterpolation,
  ComponentSelector,
  CSSObject
} from '@emotion/serialize'

function insertWithoutScoping(
  cache: EmotionCache,
  serialized: SerializedStyles
) {
  if (cache.inserted[serialized.name] === undefined) {
    return cache.insert('', serialized, cache.sheet, true)
  }
}

export type { EmotionCache, Options }

export interface ArrayClassNamesArg extends Array<ClassNamesArg> {}
export type ClassNamesArg =
  | undefined
  | null
  | string
  | boolean
  | { [className: string]: boolean | null | undefined }
  | ArrayClassNamesArg

export interface CSSStyleSheet extends StyleSheet {
  speedy(value: boolean): void
}

export interface Emotion {
  css(template: TemplateStringsArray, ...args: Array<CSSInterpolation>): string
  css(...args: Array<CSSInterpolation>): string
  cx(...classNames: Array<ClassNamesArg>): string
  flush(): void
  hydrate(ids: Array<string>): void
  injectGlobal(
    template: TemplateStringsArray,
    ...args: Array<CSSInterpolation>
  ): void
  injectGlobal(...args: Array<CSSInterpolation>): void
  keyframes(
    template: TemplateStringsArray,
    ...args: Array<CSSInterpolation>
  ): string
  keyframes(...args: Array<CSSInterpolation>): string
  sheet: CSSStyleSheet
  cache: EmotionCache
  merge(className: string): string
  getRegisteredStyles(
    registeredStyles: Array<string>,
    className: string
  ): string
}

function merge(
  registered: RegisteredCache,
  css: Emotion['css'],
  className: string
) {
  const registeredStyles: string[] = []
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

let createEmotion = (options: Options): Emotion => {
  let cache = createCache(options)

  ;(cache.sheet as CSSStyleSheet).speedy = function (value: boolean) {
    if (isDevelopment && this.ctr !== 0) {
      throw new Error('speedy must be changed before any rules are inserted')
    }
    this.isSpeedy = value
  }

  cache.compat = true

  let css: Emotion['css'] = (
    ...args: (TemplateStringsArray | Interpolation<unknown>)[]
  ) => {
    let serialized = serializeStyles(args, cache.registered, undefined)
    insertStyles(cache, serialized, false)
    return `${cache.key}-${serialized.name}`
  }

  let keyframes: Emotion['keyframes'] = (
    ...args: (TemplateStringsArray | Interpolation<unknown>)[]
  ) => {
    let serialized = serializeStyles(args, cache.registered)
    let animation = `animation-${serialized.name}`
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: `@keyframes ${animation}{${serialized.styles}}`
    })

    return animation
  }
  let injectGlobal: Emotion['injectGlobal'] = (
    ...args: (TemplateStringsArray | Interpolation<unknown>)[]
  ) => {
    let serialized = serializeStyles(args, cache.registered)
    insertWithoutScoping(cache, serialized)
  }

  let cx: Emotion['cx'] = (...args) => {
    return merge(cache.registered, css, classnames(args))
  }
  return {
    css,
    cx,
    injectGlobal,
    keyframes,
    hydrate(ids) {
      ids.forEach(key => {
        cache.inserted[key] = true
      })
    },
    flush() {
      cache.registered = {}
      cache.inserted = {}
      cache.sheet.flush()
    },
    sheet: cache.sheet as CSSStyleSheet,
    cache,
    getRegisteredStyles: getRegisteredStyles.bind(null, cache.registered),
    merge: merge.bind(null, cache.registered, css)
  }
}

let classnames = (args: ClassNamesArg[]) => {
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
