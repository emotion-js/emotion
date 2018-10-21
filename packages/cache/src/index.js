// @flow
import { StyleSheet } from '@emotion/sheet'
import {
  isBrowser,
  type EmotionCache,
  type SerializedStyles
} from '@emotion/utils'
import Stylis from '@emotion/stylis'
import weakMemoize from '@emotion/weak-memoize'
// import ruleSheetPlugin from './rule-sheet'
import type { StylisPlugin } from './types'

export type PrefixOption =
  | boolean
  | ((key: string, value: string, context: 1 | 2 | 3) => boolean)

type StylisPlugins = StylisPlugin[] | StylisPlugin

export type Options = {
  nonce?: string,
  stylisPlugins?: StylisPlugins,
  prefix?: PrefixOption,
  key?: string,
  container?: HTMLElement,
  speedy?: boolean
}

let rootServerStylisCache = {}

let getServerStylisCache = weakMemoize(() => ({}))

const delimiter = '/*|*/'
const needle = delimiter + '}'

let createCache = (options?: Options): EmotionCache => {
  if (options === undefined) options = {}
  let key = options.key || 'css'
  let stylisOptions

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    }
  }

  function toSheet(block) {
    if (block) {
      currentSheet.insert(block + '}')
    }
  }

  let ruleSheet: StylisPlugin = (
    context,
    content,
    selectors,
    parents,
    line,
    column,
    length,
    ns,
    depth,
    at
  ) => {
    switch (context) {
      // property
      case 1: {
        switch (content.charCodeAt(0)) {
          case 64: {
            // @import
            if (depth === 0) {
              currentSheet.insert(content + ';')
              return ''
            }
            break
          }
          // charcode for l
          case 108: {
            // charcode for b
            // this ignores label
            if (content.charCodeAt(2) === 98) {
              return ''
            }
          }
        }
        break
      }
      // selector
      case 2: {
        if (ns === 0) return content + delimiter
        break
      }
      // at-rule
      case 3: {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112: {
            currentSheet.insert(selectors[0] + content)
            return ''
          }
          default: {
            return content + (at === 0 ? delimiter : '')
          }
        }
      }
      case -2: {
        content.split(needle).forEach(toSheet)
        return current
      }
    }
  }

  let current

  let stylis = new Stylis(stylisOptions)

  stylis.use(options.stylisPlugins)(ruleSheet)

  let serverStylis
  if (!isBrowser) {
    let removeLabel: StylisPlugin = (context, content) => {
      if (
        context === 1 &&
        // charcode for l
        content.charCodeAt(0) === 108 &&
        // charcode for b
        content.charCodeAt(2) === 98
        // this ignores label
      ) {
        return ''
      }
    }
    serverStylis = new Stylis(stylisOptions)
    serverStylis.use(removeLabel)
    let serverStylisCache = rootServerStylisCache
    if (options.stylisPlugins) {
      serverStylis.use(options.stylisPlugins)
      serverStylisCache = getServerStylisCache(options.stylisPlugins)
    }
    let actualServerStylis = serverStylis
    serverStylis = (selector, serialized) => {
      let name = serialized.name
      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = actualServerStylis(
          selector,
          serialized.styles
        )
      }
      return serverStylisCache[name]
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error(
        `Emotion key must only contain lower case alphabetical characters and - but "${key}" was passed`
      )
    }
    stylis.use((context, content, selectors) => {
      switch (context) {
        case 2: {
          for (let i = 0, len = selectors.length; len > i; i++) {
            // :last-child isn't included here since it's safe
            // because a style element will never be the last element
            let match = selectors[i].match(/:(first|nth|nth-last)-child/)
            if (match !== null) {
              console.error(
                `The pseudo class "${
                  match[0]
                }" is potentially unsafe when doing server-side rendering. Try changing it to "${
                  match[1]
                }-of-type"`
              )
            }
          }
          break
        }
      }
    })
  }
  let inserted = {}
  // $FlowFixMe
  let container: HTMLElement
  if (isBrowser) {
    container = options.container || document.head

    const nodes = document.querySelectorAll(`style[data-emotion-${key}]`)

    Array.prototype.forEach.call(nodes, (node: HTMLStyleElement) => {
      const attrib = node.getAttribute(`data-emotion-${key}`)
      // $FlowFixMe
      attrib.split(' ').forEach(id => {
        inserted[id] = true
      })
      if (node.parentNode !== container) {
        container.appendChild(node)
      }
    })
  }
  let currentSheet

  function insert(
    selector: string,
    serialized: SerializedStyles,
    sheet: StyleSheet,
    shouldCache: boolean
  ): string | void {
    let name = serialized.name
    if (isBrowser) {
      currentSheet = sheet
      if (
        process.env.NODE_ENV !== 'production' &&
        serialized.map !== undefined
      ) {
        let map = serialized.map
        currentSheet = {
          insert: (rule: string) => {
            sheet.insert(rule + map)
          }
        }
      }
      stylis(selector, serialized.styles)
      if (shouldCache) {
        cache.inserted[name] = true
      }
    } else {
      let rules = serverStylis(selector, serialized)
      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true
        }
        return rules
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        if (shouldCache) {
          cache.inserted[name] = rules
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
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert
  }
  return cache
}

export default createCache
