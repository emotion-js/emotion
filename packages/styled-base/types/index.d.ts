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

export {
  ArrayInterpolation,
  CSSObject,
  FunctionInterpolation,
  ObjectInterpolation
} from '@emotion/serialize'

export { ComponentSelector, Interpolation }

export interface StyledOptions {
  label?: string
  shouldForwardProp?(propName: string): boolean
  target?: string
}

export interface StyledComponent<InnerProps, StyleProps>
  extends React.SFC<InnerProps & StyleProps>,
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

type ReactClassPropKeys = keyof React.ClassAttributes<any>

export interface CreateStyledComponent<InnerProps, ExtraProps> {
  <StyleProps extends object>(
    ...styles: Array<Interpolation<InnerProps & StyleProps & ExtraProps>>
  ): StyledComponent<InnerProps, StyleProps>
  <StyleProps extends object>(
    template: TemplateStringsArray,
    ...styles: Array<Interpolation<InnerProps & StyleProps & ExtraProps>>
  ): StyledComponent<InnerProps, StyleProps>
}

/**
 * @desc
 * This function accepts `InnerProps`/`Tag` to infer the type of `tag`,
 * and accepts `ExtraProps` for user who use string style
 * to be able to declare extra props without using
 * `` styled('button')<ExtraProps>`...` ``, which does not supported in
 * styled-component VSCode extension.
 * If your tool support syntax highlighting for `` styled('button')<ExtraProps>`...` ``
 * it could be more efficient.
 */
export interface CreateStyled {
  <Props extends object, ExtraProps = {}>(
    component: React.ComponentType<Props>,
    options?: StyledOptions
  ): CreateStyledComponent<Props, ExtraProps>

  <Tag extends keyof JSX.IntrinsicElements, ExtraProps = {}>(
    tag: Tag,
    options?: StyledOptions
  ): CreateStyledComponent<JSX.IntrinsicElements[Tag], ExtraProps>
}

declare const styled: CreateStyled
export default styled
