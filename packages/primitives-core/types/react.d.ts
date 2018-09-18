// Definitions by:
// Junyoung Clare Jang <https://github.com/Ailrun>
// Sam Pettersson <https://github.com/iamsamwhoami>
// TypeScript Version: 2.3

import { ComponentType, ComponentClass, Ref, SFC } from 'react';

import { Interpolation, StyledOptions, ClassInterpolation } from './common';

import {
  StyledOtherProps,
  StyledStatelessProps,
  Themed
} from 'create-emotion-styled/types/common';

export interface StyledComponentMethods<
  Props extends object,
  InnerProps extends object,
  Theme extends object
> {
  withComponent<IP extends object>(
    component: SFC<IP>,
    options?: StyledOptions
  ): StyledStatelessComponent<Props, IP, Theme>;

  withComponent<IP extends object>(
    component: ComponentClass<IP> | ComponentType<IP>,
    options?: StyledOptions
  ): StyledOtherComponent<Props, IP, Theme>;
}

export interface StyledStatelessComponent<
  Props extends object,
  InnerProps extends object,
  Theme extends object
>
  extends ComponentClass<StyledStatelessProps<Props & InnerProps, Theme>>,
    ClassInterpolation,
    StyledComponentMethods<Props, InnerProps, Theme> {}

export interface StyledOtherComponent<
  Props extends object,
  InnerProps extends object,
  Theme extends object
>
  extends ComponentClass<StyledOtherProps<Props & InnerProps, Theme, Ref<any>>>,
    ClassInterpolation,
    StyledComponentMethods<Props, InnerProps, Theme> {}

export type StyledComponent<
  Props extends object,
  InnerProps extends object,
  Theme extends object
> =
  | StyledStatelessComponent<Props, InnerProps, Theme>
  | StyledOtherComponent<Props, InnerProps, Theme>;

export type CreateStyledStatelessComponent<
  InnerProps extends object,
  Theme extends object
> = <Props extends object, OverridedTheme extends object = Theme>(
  ...args: Array<Interpolation<Themed<Props, OverridedTheme>>>
) => StyledStatelessComponent<Props, InnerProps, OverridedTheme>;

export type CreateStyledOtherComponent<
  InnerProps extends object,
  Theme extends object
> = <Props extends object, OverridedTheme extends object = Theme>(
  ...args: Array<Interpolation<Themed<Props, OverridedTheme>>>
) => StyledOtherComponent<Props, InnerProps, OverridedTheme>;

export interface CreateStyledFunction<Theme extends object> {
  <IP extends object>(
    component: SFC<IP>,
    options?: StyledOptions
  ): CreateStyledStatelessComponent<IP, Theme>;

  <IP extends object>(
    component: ComponentClass<IP> | ComponentType<IP>,
    options?: StyledOptions
  ): CreateStyledOtherComponent<IP, Theme>;
}

export interface CreateStyled<Theme extends object = any>
  extends CreateStyledFunction<Theme> {}
