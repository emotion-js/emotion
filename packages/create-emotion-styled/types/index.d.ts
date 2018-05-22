// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.3

import { Emotion, Interpolation as BaseInterpolation } from 'create-emotion';
import React, { ComponentClass, ReactHTML, ReactSVG, Ref, SFC } from 'react';

export interface ArrayInterpolation<Props> extends Array<Interpolation<Props>> {}
export type FunctionInterpolation<Props> = (props: Props, context: any) => Interpolation<Props>;

export type Interpolation<Props> =
  | BaseInterpolation
  | ArrayInterpolation<Props>
  | FunctionInterpolation<Props>
  ;

export interface StyledOptions {
  e?: string;
  label?: string;
  target?: string;
  shouldForwardProp?: (name?: string) => boolean;
}

export type Themed<P extends object, T> = P & { theme: T };

export type StyledStatelessComponentProps<P extends object, T> =
  & P
  & { theme?: T }
  ;
export type StyledOtherComponentProps<P extends object, T> =
  & StyledStatelessComponentProps<P, T>
  & { innerRef?: Ref<any> }
  ;

export interface StyledComponentMethods<Props extends object, InnerProps extends object, Theme> {
  withComponent<T extends keyof ReactHTML>(
    tag: T,
    options?: StyledOptions,
  ): StyledOtherComponent<Props, ReactHTML[T], Theme>;

  withComponent<T extends keyof ReactSVG>(
    tag: T,
    options?: StyledOptions,
  ): StyledOtherComponent<Props, ReactSVG[T], Theme>;

  withComponent<IP extends object>(
    component: SFC<IP>,
    options?: StyledOptions,
  ): StyledStatelessComponent<Props, IP, Theme>;

  withComponent<IP extends object>(
    component: ComponentClass<IP>,
    options?: StyledOptions,
  ): StyledOtherComponent<Props, IP, Theme>;
}

export interface StyledStatelessComponent<Props extends object, InnerProps extends object, Theme>
  extends ComponentClass<StyledStatelessComponentProps<Props & InnerProps, Theme>>,
    StyledComponentMethods<Props, InnerProps, Theme> {}

export interface StyledOtherComponent<Props extends object, InnerProps extends object, Theme>
  extends ComponentClass<StyledOtherComponentProps<Props & InnerProps, Theme>>,
    StyledComponentMethods<Props, InnerProps, Theme> {}

export type StyledComponent<Props extends object, InnerProps extends object, Theme> =
  | StyledStatelessComponent<Props, InnerProps, Theme>
  | StyledOtherComponent<Props, InnerProps, Theme>
  ;

export type CreateStyledStatelessComponent<InnerProps extends object, Theme> =
  <Props extends object, OverridedTheme = Theme>(
    ...args: Array<Interpolation<Themed<Props, OverridedTheme>>>
  ) => StyledStatelessComponent<Props, InnerProps, OverridedTheme>;

export type CreateStyledOtherComponent<InnerProps extends object, Theme> =
  <Props extends object, OverridedTheme = Theme>(
    ...args: Array<Interpolation<Themed<Props, OverridedTheme>>>
  ) => StyledOtherComponent<Props, InnerProps, OverridedTheme>;

export interface CreateStyled<Theme = any> {
  <T extends keyof ReactHTML>(
    tag: T,
    options?: StyledOptions,
  ): CreateStyledOtherComponent<ReactHTML[T], Theme>;

  <T extends keyof ReactSVG>(
    tag: T,
    options?: StyledOptions,
  ): CreateStyledOtherComponent<ReactSVG[T], Theme>;

  <IP extends object>(
    component: SFC<IP>,
    options?: StyledOptions,
  ): CreateStyledStatelessComponent<IP, Theme>;

  <IP extends object>(
    component: ComponentClass<IP>,
    options?: StyledOptions,
  ): CreateStyledOtherComponent<IP, Theme>;
}

export default function createEmotionStyled(emotion: Emotion, view: typeof React): CreateStyled;
