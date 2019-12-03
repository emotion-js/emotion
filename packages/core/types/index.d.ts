// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.1

import { EmotionCache } from '@emotion/cache'
import {
  ArrayInterpolation,
  ComponentSelector,
  CSSInterpolation,
  CSSObject,
  FunctionInterpolation,
  Interpolation,
  Keyframes,
  ObjectInterpolation,
  SerializedStyles
} from '@emotion/serialize'
import {
  ClassAttributes,
  ComponentClass,
  Context,
  Provider,
  FC,
  ReactElement,
  ReactNode,
  Ref,
  createElement
} from 'react'

export {
  ArrayInterpolation,
  ComponentSelector,
  CSSObject,
  EmotionCache,
  FunctionInterpolation,
  Interpolation,
  ObjectInterpolation,
  SerializedStyles
}

export * from './theming'
export * from './helper'

// tslint:disable-next-line: no-empty-interface
export interface Theme {}

export const ThemeContext: Context<object>
export const CacheProvider: Provider<EmotionCache>
export function withEmotionCache<Props, RefType = any>(
  func: (props: Props, context: EmotionCache, ref: Ref<RefType>) => ReactNode
): FC<Props & ClassAttributes<RefType>>

export const jsx: typeof createElement

export function css(
  template: TemplateStringsArray,
  ...args: Array<CSSInterpolation>
): SerializedStyles
export function css(...args: Array<CSSInterpolation>): SerializedStyles

export interface GlobalProps {
  styles: Interpolation<Theme>
}

/**
 * @desc
 * JSX generic are supported only after TS@2.9
 */
export function Global(props: GlobalProps): ReactElement

export function keyframes(
  template: TemplateStringsArray,
  ...args: Array<Interpolation>
): Keyframes
export function keyframes(...args: Array<Interpolation>): Keyframes

export interface ArrayClassNamesArg extends Array<ClassNamesArg> {}
export type ClassNamesArg =
  | undefined
  | null
  | string
  | boolean
  | { [className: string]: boolean | null | undefined }
  | ArrayClassNamesArg

export interface ClassNamesContent {
  css(template: TemplateStringsArray, ...args: Array<Interpolation>): string
  css(...args: Array<Interpolation>): string
  cx(...args: Array<ClassNamesArg>): string
  theme: Theme
}
export interface ClassNamesProps {
  children(content: ClassNamesContent): ReactNode
}
/**
 * @desc
 * JSX generic are supported only after TS@2.9
 */
export function ClassNames(props: ClassNamesProps): ReactElement

declare module 'react' {
  interface DOMAttributes<T> {
    css?: Interpolation
  }
}

declare global {
  namespace JSX {
    /**
     * Do we need to modify `LibraryManagedAttributes` too,
     * to make `className` props optional when `css` props is specified?
     */

    interface IntrinsicAttributes {
      css?: Interpolation
    }
  }
}
