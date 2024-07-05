import 'react'
import { Interpolation } from '@emotion/serialize'
import { Theme } from '@emotion/react'

type WithConditionalCSSProp<P> = 'className' extends keyof P
  ? string extends P['className' & keyof P]
    ? { css?: Interpolation<Theme> }
    : {}
  : {}

// unpack all here to avoid infinite self-referencing when defining our own JSX namespace
type ReactJSXElement = React.JSX.Element
type ReactJSXElementClass = React.JSX.ElementClass
type ReactJSXElementAttributesProperty = React.JSX.ElementAttributesProperty
type ReactJSXElementChildrenAttribute = React.JSX.ElementChildrenAttribute
type ReactJSXLibraryManagedAttributes<C, P> =
  React.JSX.LibraryManagedAttributes<C, P>
type ReactJSXIntrinsicAttributes = React.JSX.IntrinsicAttributes
type ReactJSXIntrinsicClassAttributes<T> = React.JSX.IntrinsicClassAttributes<T>
type ReactJSXIntrinsicElements = React.JSX.IntrinsicElements

// based on the code from @types/react@18.2.8
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3197efc097d522c4bf02b94e1a0766d007d6cdeb/types/react/index.d.ts#LL3204C13-L3204C13
type ReactJSXElementType = string | React.JSXElementConstructor<any>

export namespace EmotionJSX {
  type ElementType = ReactJSXElementType
  interface Element extends ReactJSXElement {}
  interface ElementClass extends ReactJSXElementClass {}
  interface ElementAttributesProperty
    extends ReactJSXElementAttributesProperty {}
  interface ElementChildrenAttribute extends ReactJSXElementChildrenAttribute {}

  type LibraryManagedAttributes<C, P> = WithConditionalCSSProp<P> &
    ReactJSXLibraryManagedAttributes<C, P>

  interface IntrinsicAttributes extends ReactJSXIntrinsicAttributes {}
  interface IntrinsicClassAttributes<T>
    extends ReactJSXIntrinsicClassAttributes<T> {}

  type IntrinsicElements = {
    [K in keyof ReactJSXIntrinsicElements]: ReactJSXIntrinsicElements[K] & {
      css?: Interpolation<Theme>
    }
  }
}
