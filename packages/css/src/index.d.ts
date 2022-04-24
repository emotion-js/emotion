import type { CSSInterpolation } from '@emotion/serialize'

export declare const flush: () => void,
  hydrate: (ids: string[]) => void,
  cx: (...classNames: import('./create-instance').ClassNamesArg[]) => string,
  merge: (className: string) => string,
  getRegisteredStyles: (
    registeredStyles: string[],
    className: string
  ) => string,
  injectGlobal: {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): void
    (...args: CSSInterpolation[]): void
  },
  keyframes: {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): string
    (...args: CSSInterpolation[]): string
  },
  css: {
    (template: TemplateStringsArray, ...args: CSSInterpolation[]): string
    (...args: CSSInterpolation[]): string
  },
  sheet: import('./create-instance').CSSStyleSheet,
  cache: import('@emotion/utils/src/types').EmotionCache
