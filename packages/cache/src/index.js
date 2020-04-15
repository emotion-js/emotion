// @flow
import { StyleSheet } from '@emotion/sheet'
import { type EmotionCache, type SerializedStyles } from '@emotion/utils'
import {
  serialize,
  compile,
  middleware,
  rulesheet,
  stringify,
  prefixer
} from '@emotion/stylis'
import weakMemoize from '@emotion/weak-memoize'
import {
  compat,
  removeLabel,
  createUnsafeSelectorsAlarm
} from './stylis-plugins'
import type { StylisPlugin } from './types'

let isBrowser = typeof document !== 'undefined'

export type PrefixOption =
  | boolean
  | ((key: string, value: string, context: 1 | 2 | 3) => boolean)

export type Options = {
  nonce?: string,
  stylisPlugins?: StylisPlugin[],
  prefix?: PrefixOption,
  key: string,
  container?: HTMLElement,
  speedy?: boolean,
  prepend?: boolean
}

let getServerStylisCache = isBrowser
  ? undefined
  : weakMemoize(() => {
      let getCache = weakMemoize(() => ({}))
      let prefixTrueCache = {}
      let prefixFalseCache = {}
      return prefix => {
        if (prefix === undefined || prefix === true) {
          return prefixTrueCache
        }
        if (prefix === false) {
          return prefixFalseCache
        }
        return getCache(prefix)
      }
    })

const defaultStylisPlugins = [compat, prefixer]
let movedStyles = false

let createCache = (options: Options): EmotionCache => {
  let key = options.key

  if (!key) {
    throw new Error(
      "You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" +
        `If multiple caches share the same key they might "fight" for each other's style elements.`
    )
  }

  if (isBrowser && !movedStyles && key === 'css') {
    movedStyles = true

    const ssrStyles = document.querySelectorAll(`style[data-emotion]`)
    // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to
    Array.prototype.forEach.call(ssrStyles, (node: HTMLStyleElement) => {
      ;((document.head: any): HTMLHeadElement).appendChild(node)
    })
  }

  const stylisPlugins = options.stylisPlugins || defaultStylisPlugins

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error(
        `Emotion key must only contain lower case alphabetical characters and - but "${key}" was passed`
      )
    }
  }
  let inserted = {}
  // $FlowFixMe
  let container: HTMLElement
  const nodesToRehydrate = []
  if (isBrowser) {
    container = options.container || document.head

    Array.prototype.forEach.call(
      document.querySelectorAll(`style[data-emotion]`),
      (node: HTMLStyleElement) => {
        const attrib = ((node.getAttribute(`data-emotion`): any): string).split(
          ' '
        )
        if (attrib[0] !== key) {
          return
        }
        // $FlowFixMe
        for (let i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true
        }
        nodesToRehydrate.push(node)
      }
    )
  }

  let insert: (
    selector: string,
    serialized: SerializedStyles,
    sheet: StyleSheet,
    shouldCache: boolean
  ) => string | void

  if (isBrowser) {
    let currentSheet
    const omnipresentPlugins = [
      removeLabel,
      stringify,
      rulesheet(rule => {
        currentSheet.insert(rule)
      })
    ]
    if (process.env.NODE_ENV !== 'production') {
      omnipresentPlugins.unshift(
        createUnsafeSelectorsAlarm({
          get compat() {
            return cache.compat
          }
        })
      )
    }
    const serializer = middleware(stylisPlugins.concat(omnipresentPlugins))
    const stylis = styles => serialize(compile(styles), serializer)

    insert = (
      selector: string,
      serialized: SerializedStyles,
      sheet: StyleSheet,
      shouldCache: boolean
    ): void => {
      currentSheet = sheet
      if (
        process.env.NODE_ENV !== 'production' &&
        serialized.map !== undefined
      ) {
        currentSheet = {
          insert: rule => {
            sheet.insert(rule + serialized.map)
          }
        }
      }

      stylis(selector ? `${selector}{${serialized.styles}}` : serialized.styles)

      if (shouldCache) {
        cache.inserted[serialized.name] = true
      }
    }
  } else {
    const omnipresentPlugins = [removeLabel, stringify]
    if (process.env.NODE_ENV !== 'production') {
      omnipresentPlugins.unshift(
        createUnsafeSelectorsAlarm({
          get compat() {
            return cache.compat
          }
        })
      )
    }
    const serializer = middleware(stylisPlugins.concat(omnipresentPlugins))
    const stylis = styles => serialize(compile(styles), serializer)

    // $FlowFixMe
    let serverStylisCache = getServerStylisCache(stylisPlugins)
    let getRules = (selector: string, serialized: SerializedStyles): string => {
      let name = serialized.name
      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = stylis(
          selector ? `${selector}{${serialized.styles}}` : serialized.styles
        )
      }
      return serverStylisCache[name]
    }
    insert = (
      selector: string,
      serialized: SerializedStyles,
      sheet: StyleSheet,
      shouldCache: boolean
    ): string | void => {
      let name = serialized.name
      let rules = getRules(selector, serialized)
      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true
        }
        if (
          // using === development instead of !== production
          // because if people do ssr in tests, the source maps showing up would be annoying
          process.env.NODE_ENV === 'development' &&
          serialized.map !== undefined
        ) {
          return rules + serialized.map
        }
        return rules
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal

        if (shouldCache) {
          cache.inserted[name] = rules
        } else {
          return rules
        }
      }
    }
  }

  const cache: EmotionCache = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert
  }

  cache.sheet.rehydrate(nodesToRehydrate)

  return cache
}

export default createCache
