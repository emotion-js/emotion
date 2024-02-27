// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.2
import type { SerializedStyles as EmotionSerializedStyles } from '@emotion/serialize'
import type {
  RegisteredCache as EmotionRegisteredCache,
  EmotionCache as EmotionStyleCache
} from '@emotion/cache'

/** @deprecated use `RegisteredCache` from `@emotion/cache` */
export interface RegisteredCache {
  [key: string]: string
}

/** @deprecated use `StyleSheet` from `@emotion/sheet` */
export interface StyleSheet {
  container: HTMLElement
  nonce?: string
  key: string
  insert(rule: string): void
  flush(): void
  tags: Array<HTMLStyleElement>
}

/** @deprecated use `EmotionCache` from `@emotion/cache` */
export interface EmotionCache {
  inserted: {
    [key: string]: string | true
  }
  registered: RegisteredCache
  sheet: StyleSheet
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

/** @deprecated use `SerializedStyles` from `@emotion/serialize` */
export interface SerializedStyles {
  name: string
  styles: string
  map?: string
  next?: SerializedStyles
}

export const isBrowser: boolean

export function getRegisteredStyles(
  registered: EmotionRegisteredCache,
  registeredStyles: Array<string>,
  classNames: string
): string

export function registerStyles(
  cache: EmotionStyleCache,
  serialized: EmotionSerializedStyles,
  isStringTag: boolean
): void

export function insertStyles(
  cache: EmotionStyleCache,
  serialized: EmotionSerializedStyles,
  isStringTag: boolean
): string | void
