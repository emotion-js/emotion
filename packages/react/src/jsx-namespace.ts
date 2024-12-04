import 'react'
import { Interpolation } from '@emotion/serialize'
import { Theme } from './theming'

type IsPreReact19 = 2 extends Parameters<React.FunctionComponent<any>>['length']
  ? true
  : false

type WithConditionalCSSProp<P> = 'className' extends keyof P
  ? string extends P['className' & keyof P]
    ? { css?: Interpolation<Theme> }
    : {}
  : {}

// unpack all here to avoid infinite self-referencing when defining our own JSX namespace for the pre-React 19 case
type ReactJSXElement = true extends IsPreReact19
  ? /** @ts-ignore */
    JSX.Element
  : /** @ts-ignore */
    React.JSX.Element
type ReactJSXElementClass = true extends IsPreReact19
  ? /** @ts-ignore */
    JSX.ElementClass
  : /** @ts-ignore */
    React.JSX.ElementClass
type ReactJSXElementAttributesProperty = true extends IsPreReact19
  ? /** @ts-ignore */
    JSX.ElementAttributesProperty
  : /** @ts-ignore */
    React.JSX.ElementAttributesProperty
type ReactJSXElementChildrenAttribute = true extends IsPreReact19
  ? /** @ts-ignore */
    JSX.ElementChildrenAttribute
  : /** @ts-ignore */
    React.JSX.ElementChildrenAttribute
type ReactJSXLibraryManagedAttributes<C, P> = true extends IsPreReact19
  ? /** @ts-ignore */
    JSX.LibraryManagedAttributes<C, P>
  : /** @ts-ignore */
    React.JSX.LibraryManagedAttributes<C, P>
type ReactJSXIntrinsicAttributes = true extends IsPreReact19
  ? /** @ts-ignore */
    JSX.IntrinsicAttributes
  : /** @ts-ignore */
    React.JSX.IntrinsicAttributes
type ReactJSXIntrinsicClassAttributes<T> = true extends IsPreReact19
  ? /** @ts-ignore */
    JSX.IntrinsicClassAttributes<T>
  : /** @ts-ignore */
    React.JSX.IntrinsicClassAttributes<T>
type ReactJSXIntrinsicElements = true extends IsPreReact19
  ? /** @ts-ignore */
    JSX.IntrinsicElements
  : /** @ts-ignore */
    React.JSX.IntrinsicElements

type ReactJSXElementType = true extends IsPreReact19
  ? // based on the code from @types/react@18.2.8
    // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3197efc097d522c4bf02b94e1a0766d007d6cdeb/types/react/index.d.ts#LL3204C13-L3204C13
    string | React.JSXElementConstructor<any>
  : /** @ts-ignore */
    React.JSX.ElementType

export namespace ReactJSX {
  export type ElementType = ReactJSXElementType
  export interface Element extends ReactJSXElement {}
  export interface ElementClass extends ReactJSXElementClass {}
  export interface ElementAttributesProperty
    extends ReactJSXElementAttributesProperty {}
  export interface ElementChildrenAttribute
    extends ReactJSXElementChildrenAttribute {}

  export type LibraryManagedAttributes<C, P> = ReactJSXLibraryManagedAttributes<
    C,
    P
  >

  export interface IntrinsicAttributes extends ReactJSXIntrinsicAttributes {}
  export interface IntrinsicClassAttributes<T>
    extends ReactJSXIntrinsicClassAttributes<T> {}

  export type IntrinsicElements = ReactJSXIntrinsicElements
}

export namespace EmotionJSX {
  export type ElementType = ReactJSXElementType
  export interface Element extends ReactJSXElement {}
  export interface ElementClass extends ReactJSXElementClass {}
  export interface ElementAttributesProperty
    extends ReactJSXElementAttributesProperty {}
  export interface ElementChildrenAttribute
    extends ReactJSXElementChildrenAttribute {}

  export type LibraryManagedAttributes<C, P> = P extends unknown
    ? WithConditionalCSSProp<P> & ReactJSXLibraryManagedAttributes<C, P>
    : never

  export interface IntrinsicAttributes extends ReactJSXIntrinsicAttributes {}
  export interface IntrinsicClassAttributes<T>
    extends ReactJSXIntrinsicClassAttributes<T> {}

  export type IntrinsicElements = {
    [K in keyof ReactJSXIntrinsicElements]: ReactJSXIntrinsicElements[K] & {
      css?: Interpolation<Theme>
    }
  }
}
