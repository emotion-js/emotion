// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.1

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

import { ComponentSelector, Interpolation } from '@emotion/serialize'
import * as React from 'react'
import { PropsOf } from './helper'

export {
  ArrayInterpolation,
  CSSObject,
  FunctionInterpolation,
  ObjectInterpolation
} from '@emotion/serialize'

export { ComponentSelector, Interpolation, PropsOf }

export interface StyledOptions {
  label?: string
  shouldForwardProp?(propName: string): boolean
  target?: string
}

export interface StyledComponent<ComponentProps, StyleProps>
  extends React.FC<ComponentProps & StyleProps>,
    ComponentSelector {
  /**
   * @desc this method is type-unsafe
   */
  withComponent<NewTag extends keyof JSX.IntrinsicElements>(
    tag: NewTag
  ): StyledComponent<JSX.IntrinsicElements[NewTag], StyleProps>
  withComponent<Props extends object>(
    tag: React.ComponentType<Props>
  ): StyledComponent<Props, StyleProps>
}

export interface CreateStyledComponent<Props, ExtraProps> {
  <StyleProps extends object>(
    ...styles: Array<Interpolation<Props & StyleProps & ExtraProps>>
  ): StyledComponent<Props, StyleProps>
  <StyleProps extends object>(
    template: TemplateStringsArray,
    ...styles: Array<Interpolation<Props & StyleProps & ExtraProps>>
  ): StyledComponent<Props, StyleProps>
}

// We have opted to using the props as the generic parameter because it improves
// inference and allows us to put contraints on the Props.

/**
 * @desc
 * This function accepts a React component or tag ('div', 'a' etc).
 *
 * This function does not support React default props defaultProps, use the following syntax to fix
 * styled<PropsOf<MyComponent>>(MyComponent)({ width: 100 })
 *
 * @example styled(MyComponent)({ width: 100 })
 * @example styled(MyComponent)(myComponentProps => ({ width: myComponentProps.width })
 * @example styled('div')({ width: 100 })
 * @example styled('div')<Props>(props => ({ width: props.width })
 */
export interface CreateStyled {
  <P extends {}, ExtraProps = { theme: any }>(
    component: React.ReactType<P>,
    options?: StyledOptions
  ): CreateStyledComponent<P, ExtraProps>

  <Tag extends keyof JSX.IntrinsicElements, ExtraProps = { theme: any }>(
    tag: Tag,
    options?: StyledOptions
  ): CreateStyledComponent<JSX.IntrinsicElements[Tag], ExtraProps>
}

declare const styled: CreateStyled
export default styled
