// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.2

/**
 * @desc
 * In following types,
 * `InnerProps` is type parameter that represents props type of
 * internal component (target of styling)
 * `ExtraProps` is type parameter that represents extra props type of
 * styled component.
 * `StyleProps` is type parameter that represents props used in
 * a style of that component.
 */

import * as React from 'react'
import { ComponentSelector, Interpolation } from '@emotion/serialize'
import { PropsOf, DistributiveOmit } from './helper'

export {
  ArrayInterpolation,
  CSSObject,
  FunctionInterpolation,
  ObjectInterpolation
} from '@emotion/serialize'

export { ComponentSelector, Interpolation, PropsOf, DistributiveOmit }

export interface StyledOptions {
  label?: string
  shouldForwardProp?(propName: string): boolean
  target?: string
}

/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
export interface StyledComponent<ComponentProps, SpecificComponentProps = {}>
  extends React.FC<ComponentProps & SpecificComponentProps>,
    ComponentSelector {
  withComponent<C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C
  ): StyledComponent<ComponentProps & PropsOf<C>>
  withComponent<Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag
  ): StyledComponent<ComponentProps, JSX.IntrinsicElements[Tag]>
}

/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 * @typeparam StyleProps  Params passed to styles but not exposed as React props. These are normally library provided props
 */
export interface CreateStyledComponent<
  ComponentProps,
  SpecificComponentProps,
  StyleProps
> {
  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends object>(
    ...styles: Array<
      Interpolation<
        ComponentProps & SpecificComponentProps & StyleProps & AdditionalProps
      >
    >
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps>
  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends object>(
    template: TemplateStringsArray,
    ...styles: Array<
      Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps>
    >
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps>
}

/**
 * @desc
 * This function accepts a React component or tag ('div', 'a' etc).
 *
 * @example styled(MyComponent)({ width: 100 })
 * @example styled(MyComponent)(myComponentProps => ({ width: myComponentProps.width })
 * @example styled('div')({ width: 100 })
 * @example styled('div')<Props>(props => ({ width: props.width })
 */
export interface CreateStyled<Theme = any> {
  <C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions
  ): CreateStyledComponent<PropsOf<C> & { theme?: Theme }, {}, { theme: Theme }>

  <Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag,
    options?: StyledOptions
  ): CreateStyledComponent<
    { theme?: Theme },
    JSX.IntrinsicElements[Tag],
    { theme: Theme }
  >
}

declare const styled: CreateStyled
export default styled
