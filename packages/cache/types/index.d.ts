// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.2
import { EmotionCache } from '@emotion/utils'

export { EmotionCache }

export interface StylisElement {
  type: string
  value: string
  props: ReadonlyArray<string>
  root: StylisElement | null
  children: ReadonlyArray<StylisElement>
  line: number
  column: number
  length: number
  return: string
}
export type StylisPluginCallback = (
  element: StylisElement,
  index: number,
  children: ReadonlyArray<StylisElement>,
  callback: StylisPluginCallback
) => string | undefined

export type StylisPlugin = (
  element: StylisElement,
  index: number,
  children: ReadonlyArray<StylisElement>,
  callback: StylisPluginCallback
) => string | undefined

export interface Options {
  nonce?: string
  stylisPlugins?: ReadonlyArray<StylisPlugin>
  key: string
  container?: HTMLElement
  speedy?: boolean
  prepend?: boolean
}

export default function createCache(options: Options): EmotionCache
