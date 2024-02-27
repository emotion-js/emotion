// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.2
import { SerializedStyles } from '@emotion/serialize'
import { StyleSheet } from '@emotion/sheet'

export interface RegisteredCache {
  [key: string]: string
}

export interface EmotionStyleSheet extends StyleSheet {
  constructor: typeof StyleSheet
}

export interface EmotionCache {
  inserted: {
    [key: string]: string | true
  }
  registered: RegisteredCache
  sheet: EmotionStyleSheet
  key: string
  compat?: true
  nonce?: string
  insert(
    selector: string,
    serialized: SerializedStyles,
    sheet: StyleSheet,
    shouldCache: boolean
  ): string | void
}

export interface StylisElement {
  type: string
  value: string
  props: Array<string> | string
  root: StylisElement | null
  parent: StylisElement | null
  children: Array<StylisElement> | string
  line: number
  column: number
  length: number
  return: string
}
export type StylisPluginCallback = (
  element: StylisElement,
  index: number,
  children: Array<StylisElement>,
  callback: StylisPluginCallback
) => string | void

export type StylisPlugin = (
  element: StylisElement,
  index: number,
  children: Array<StylisElement>,
  callback: StylisPluginCallback
) => string | void

export interface Options {
  nonce?: string
  stylisPlugins?: Array<StylisPlugin>
  key: string
  container?: Node
  speedy?: boolean
  /** @deprecate use `insertionPoint` instead */
  prepend?: boolean
  insertionPoint?: HTMLElement
}

export default function createCache(options: Options): EmotionCache
