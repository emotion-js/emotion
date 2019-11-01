// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.8

import { EmotionCache, Options } from '@emotion/cache'
import { Interpolation } from '@emotion/serialize'
import { StyleSheet } from '@emotion/sheet'

export {
  ArrayInterpolation,
  ComponentSelector,
  FunctionInterpolation,
  ObjectInterpolation
} from '@emotion/serialize'

export { EmotionCache, Interpolation, Options, StyleSheet }

export interface ArrayClassNamesArg extends Array<ClassNamesArg> {}
export type ClassNamesArg =
  | undefined
  | null
  | string
  | boolean
  | { [className: string]: boolean | null | undefined }
  | ArrayClassNamesArg

export interface Emotion {
  css(template: TemplateStringsArray, ...args: Array<Interpolation>): string
  css(...args: Array<Interpolation>): string
  cx(...classNames: Array<ClassNamesArg>): string
  flush(): void
  hydrate(ids: Array<string>): void
  injectGlobal(
    template: TemplateStringsArray,
    ...args: Array<Interpolation>
  ): void
  injectGlobal(...args: Array<Interpolation>): void
  keyframes(
    template: TemplateStringsArray,
    ...args: Array<Interpolation>
  ): string
  keyframes(...args: Array<Interpolation>): string
  sheet: StyleSheet
  cache: EmotionCache
  merge(className: string): string
  getRegisteredStyles(
    registeredStyles: Array<string>,
    className: string
  ): string
}

export default function createEmotion(options?: Options): Emotion
