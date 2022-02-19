import { CSSInterpolation } from '@emotion/serialize'
import { EmotionCache, Options } from '@emotion/cache'
import { StyleSheet } from '@emotion/sheet'
export type {
  CSSInterpolation,
  ArrayCSSInterpolation,
  ComponentSelector,
  CSSObject
} from '@emotion/serialize'
export type { EmotionCache, Options }
export interface ArrayClassNamesArg extends Array<ClassNamesArg> {}
export declare type ClassNamesArg =
  | undefined
  | null
  | string
  | boolean
  | {
      [className: string]: boolean | null | undefined
    }
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
declare let createEmotion: (options: Options) => Emotion
export default createEmotion
