// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.8

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

import { Overwrapped, PropsOf } from './helper'

export { Interpolation }

export type WithTheme<P, T> = P extends { theme: infer Theme }
  ? P & { theme: Exclude<Theme, undefined> }
  : P & { theme: T }

export interface StyledOptions {
  label?: string
  shouldForwardProp?(propName: string): boolean
  target?: string
}

export interface StyledComponent<InnerProps, StyleProps, Theme extends object>
  extends React.SFC<InnerProps & StyleProps & { theme?: Theme }>,
    ComponentSelector {
  /**
   * @desc
   * `Overwrapped` part checks the compatibility between `StyleProps` and `NewInnerProps`.
   */
  withComponent<NewInnerProps extends Overwrapped<StyleProps, NewInnerProps>>(
    tag: React.ComponentType<NewInnerProps>
  ): StyledComponent<NewInnerProps, StyleProps, Theme>

  /**
   * @desc this function overloading is unsafe
   */
  withComponent<NewTag extends keyof JSX.IntrinsicElements>(
    tag: NewTag
  ): StyledComponent<JSX.IntrinsicElements[NewTag], StyleProps, Theme>
}

export interface CreateStyledComponentBase<
  InnerProps,
  ExtraProps,
  Theme extends object
> {
  <
    StyleProps extends Overwrapped<InnerProps, StyleProps> = InnerProps &
      ExtraProps
  >(
    ...styles: Array<Interpolation<WithTheme<StyleProps, Theme>>>
  ): StyledComponent<InnerProps, StyleProps, Theme>
  <
    StyleProps extends Overwrapped<InnerProps, StyleProps> = InnerProps &
      ExtraProps
  >(
    template: TemplateStringsArray,
    ...styles: Array<Interpolation<WithTheme<StyleProps, Theme>>>
  ): StyledComponent<InnerProps, StyleProps, Theme>
}
export interface CreateStyledComponentIntrinsic<
  Tag extends keyof JSX.IntrinsicElements,
  ExtraProps,
  Theme extends object
>
  extends CreateStyledComponentBase<
      JSX.IntrinsicElements[Tag],
      ExtraProps,
      Theme
    > {}
export interface CreateStyledComponentExtrinsic<
  Tag extends React.ComponentType<any>,
  ExtraProps,
  Theme extends object
> extends CreateStyledComponentBase<PropsOf<Tag>, ExtraProps, Theme> {}

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
export interface CreateStyled<Theme extends object = any> {
  <InnerProps, ExtraProps = {}>(
    tag: React.ComponentClass<InnerProps>,
    options?: StyledOptions
  ): CreateStyledComponentExtrinsic<
    React.ComponentClass<InnerProps>,
    ExtraProps,
    Theme
  >
  <InnerProps, ExtraProps = {}>(
    tag: React.SFC<InnerProps>,
    options?: StyledOptions
  ): CreateStyledComponentExtrinsic<React.SFC<InnerProps>, ExtraProps, Theme>

  <Tag extends keyof JSX.IntrinsicElements, ExtraProps = {}>(
    tag: Tag,
    options?: StyledOptions
  ): CreateStyledComponentIntrinsic<Tag, ExtraProps, Theme>
}

declare const styled: CreateStyled
export default styled
