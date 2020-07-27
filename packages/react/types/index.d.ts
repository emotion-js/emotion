// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.2

import { EmotionCache } from '@emotion/cache'
import {
  ArrayInterpolation,
  ComponentSelector,
  CSSInterpolation,
  CSSObject,
  FunctionInterpolation,
  Interpolation,
  Keyframes,
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
  ...args: Array<CSSInterpolation>
): Keyframes
export function keyframes(...args: Array<CSSInterpolation>): Keyframes

export interface ArrayClassNamesArg extends Array<ClassNamesArg> {}
export type ClassNamesArg =
  | undefined
  | null
  | string
  | boolean
  | { [className: string]: boolean | null | undefined }
  | ArrayClassNamesArg

export interface ClassNamesContent {
  css(template: TemplateStringsArray, ...args: Array<CSSInterpolation>): string
  css(...args: Array<CSSInterpolation>): string
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

type WithConditionalCssProp<P> = P extends { className?: string }
  ? P & { css?: Interpolation<Theme> }
  : P

// unpack all here to avoid infinite self-referencing when defining our own JSX namespace
type ReactJSXElement = JSX.Element
type ReactJSXElementClass = JSX.ElementClass
type ReactJSXElementAttributesProperty = JSX.ElementAttributesProperty
type ReactJSXElementChildrenAttribute = JSX.ElementChildrenAttribute
type ReactJSXLibraryManagedAttributes<C, P> = JSX.LibraryManagedAttributes<C, P>
type ReactJSXIntrinsicAttributes = JSX.IntrinsicAttributes
type ReactJSXIntrinsicClassAttributes<T> = JSX.IntrinsicClassAttributes<T>
type ReactJSXIntrinsicElements = JSX.IntrinsicElements

export const jsx: typeof createElement
export namespace jsx {
  namespace JSX {
    interface Element extends ReactJSXElement {}
    interface ElementClass extends ReactJSXElementClass {}
    interface ElementAttributesProperty
      extends ReactJSXElementAttributesProperty {}
    interface ElementChildrenAttribute
      extends ReactJSXElementChildrenAttribute {}

    type LibraryManagedAttributes<C, P> = C extends React.ComponentType<infer T>
      ? WithConditionalCssProp<T>
      : WithConditionalCssProp<ReactJSXLibraryManagedAttributes<C, P>>

    interface IntrinsicAttributes extends ReactJSXIntrinsicAttributes {}
    interface IntrinsicClassAttributes<T>
      extends ReactJSXIntrinsicClassAttributes<T> {}

    type IntrinsicElements = {
      [K in keyof ReactJSXIntrinsicElements]: ReactJSXIntrinsicElements[K] & {
        css?: Interpolation<Theme>
      }
    }
  }
}
