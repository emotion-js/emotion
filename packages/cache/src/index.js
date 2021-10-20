// @flow
import { StyleSheet } from '@emotion/sheet'
import { type EmotionCache, type SerializedStyles } from '@emotion/utils'
import {
  serialize,
  compile,
  middleware,
  rulesheet,
  stringify,
  prefixer,
  COMMENT
} from 'stylis'
import weakMemoize from '@emotion/weak-memoize'
import memoize from '@emotion/memoize'
import {
  compat,
  removeLabel,
  createUnsafeSelectorsAlarm,
  incorrectImportAlarm
} from './stylis-plugins'
import type { StylisPlugin } from './types'

let isBrowser = typeof document !== 'undefined'

export type Options = {
  nonce?: string,
  stylisPlugins?: StylisPlugin[],
  key: string,
  container?: HTMLElement,
  speedy?: boolean,
  prepend?: boolean,
  insertionPoint?: HTMLElement
}

let getServerStylisCache = isBrowser
  ? undefined
  : weakMemoize(() =>
      memoize(() => {
        let cache = {}
        return name => cache[name]
      })
    )

const defaultStylisPlugins = [prefixer]

let createCache = (options: Options): EmotionCache => {
  let key = options.key

  if (process.env.NODE_ENV !== 'production' && !key) {
    throw new Error(
      "You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" +
        `If multiple caches share the same key they might "fight" for each other's style elements.`
    )
  }

  if (isBrowser && key === 'css') {
    const ssrStyles = document.querySelectorAll(
      `style[data-emotion]:not([data-s])`
    )

    // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component
    Array.prototype.forEach.call(ssrStyles, (node: HTMLStyleElement) => {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      const dataEmotionAttribute = ((node.getAttribute(
        'data-emotion'
      ): any): string)
      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return
      }

      ;((document.head: any): HTMLHeadElement).appendChild(node)
      node.setAttribute('data-s', '')
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
  const nodesToHydrate = []
  if (isBrowser) {
    container = options.container || ((document.head: any): HTMLHeadElement)

    Array.prototype.forEach.call(
      // this means we will ignore elements which don't have a space in them which
      // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
      document.querySelectorAll(`style[data-emotion^="${key} "]`),
      (node: HTMLStyleElement) => {
        const attrib = ((node.getAttribute(`data-emotion`): any): string).split(
          ' '
        )
        // $FlowFixMe
        for (let i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true
        }
        nodesToHydrate.push(node)
      }
    )
  }

  let insert: (
    selector: string,
    serialized: SerializedStyles,
    sheet: StyleSheet,
    shouldCache: boolean
  ) => string | void

  const omnipresentPlugins = [compat, removeLabel]

  if (process.env.NODE_ENV !== 'production') {
    omnipresentPlugins.push(
      createUnsafeSelectorsAlarm({
        get compat() {
          return cache.compat
        }
      }),
      incorrectImportAlarm
    )
  }

  if (isBrowser) {
    let currentSheet

    const finalizingPlugins = [
      stringify,
      process.env.NODE_ENV !== 'production'
        ? element => {
            if (!element.root) {
              if (element.return) {
                currentSheet.insert(element.return)
              } else if (element.value && element.type !== COMMENT) {
                // insert empty rule in non-production environments
                // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
                currentSheet.insert(`${element.value}{}`)
              }
            }
          }
        : rulesheet(rule => {
            currentSheet.insert(rule)
          })
    ]

    const serializer = middleware(
      omnipresentPlugins.concat(stylisPlugins, finalizingPlugins)
    )
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
          insert: (rule: string) => {
            sheet.insert(rule + ((serialized.map: any): string))
          }
        }
      }

      stylis(selector ? `${selector}{${serialized.styles}}` : serialized.styles)

      if (shouldCache) {
        cache.inserted[serialized.name] = true
      }
    }
  } else {
    const finalizingPlugins = [stringify]
    const serializer = middleware(
      omnipresentPlugins.concat(stylisPlugins, finalizingPlugins)
    )
    const stylis = styles => serialize(compile(styles), serializer)

    // $FlowFixMe
    let serverStylisCache = getServerStylisCache(stylisPlugins)(key)
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
      container: ((container: any): HTMLElement),
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert
  }

  cache.sheet.hydrate(nodesToHydrate)

  return cache
}

export default createCache
