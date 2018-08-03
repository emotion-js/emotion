// @flow
import { StyleSheet } from '@emotion/sheet'
import { isBrowser, type CSSContextType } from '@emotion/utils'
import Stylis from '@emotion/stylis'
import ruleSheetPlugin from './rule-sheet'
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
  container?: HTMLElement
}

let createCache = (options?: Options): CSSContextType => {
  if (options === undefined) options = {}
  let key = options.key || 'css'
  let stylisOptions

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    }
  }

  let stylis = new Stylis(stylisOptions)

  stylis.use(options.stylisPlugins)(ruleSheetPlugin)

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error(
        `Emotion key must only contain lower case alphabetical characters and - but "${key}" was passed`
      )
    }
    let sourceMapRegEx = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//
    let currentSourceMap
    stylis.use((context, content, selectors) => {
      switch (context) {
        case -1: {
          let result = sourceMapRegEx.exec(content)
          if (result) {
            currentSourceMap = result[0]
          }
          break
        }
        case 2: {
          for (let i = 0, len = selectors.length; len > i; i++) {
            // :last-child isn't included here since it's safe
            // because a style element will never be the last element
            let match = selectors[i].match(/:(first|nth|nth-last)-child/)
            if (match !== null) {
              console.error(
                `The pseudo class "${
                  match[1]
                }" is potentially unsafe when doing server-side rendering. Try changing it to "${
                  match[1]
                }-of-type"`
              )
            }
          }
          break
        }
        case -2: {
          if (currentSourceMap) {
            content.forEach((rule, i) => {
              content[i] = rule + currentSourceMap
            })

            currentSourceMap = ''
          }
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

  const context: CSSContextType = {
    stylis,
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce
    }),
    inserted,
    registered: {},
    theme: {}
  }
  return context
}

export default createCache
