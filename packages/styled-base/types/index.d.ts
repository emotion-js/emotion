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
import { PropsOf, Omit } from './helper'

export {
  ArrayInterpolation,
  CSSObject,
  FunctionInterpolation,
  ObjectInterpolation
} from '@emotion/serialize'

export { ComponentSelector, Interpolation, PropsOf, Omit }

export interface StyledOptions {
  label?: string
  shouldForwardProp?(propName: string): boolean
  target?: string
}

export interface StyledComponent<ComponentProps, StyleProps>
  extends React.FC<ComponentProps & StyleProps>,
    ComponentSelector {
  withComponent<C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C
  ): StyledComponent<ComponentProps & PropsOf<C>, StyleProps>
  withComponent<Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag
  ): StyledComponent<ComponentProps & JSX.IntrinsicElements[Tag], StyleProps>
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
  <C extends React.ComponentType<React.ComponentProps<C>>, ExtraProps = {}>(
    component: C,
    options?: StyledOptions
  ): CreateStyledComponent<
    PropsOf<C> & { theme?: Theme },
    ExtraProps & { theme: Theme }
  >

  <Tag extends keyof JSX.IntrinsicElements, ExtraProps = {}>(
    tag: Tag,
    options?: StyledOptions
  ): CreateStyledComponent<
    JSX.IntrinsicElements[Tag] & { theme?: Theme },
    ExtraProps & { theme: Theme }
  >
}

declare const styled: CreateStyled
export default styled
