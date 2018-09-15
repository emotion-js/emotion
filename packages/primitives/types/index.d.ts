// Definitions by:
// Junyoung Clare Jang <https://github.com/Ailrun>
// Sam Pettersson <https://github.com/iamsamwhoami>
// TypeScript Version: 2.3

import {
  CreateStyled,
  Interpolation,
  StyledComponent,
  StyledOptions,
  Themed,
  CreateStyledOtherComponent
} from '@emotion/primitives-core';

import { BaseInterpolation } from '@emotion/primitives-core/types/common';

import { ImageProps, ViewProps, TextProps } from 'react-native';

export * from 'emotion';

export type ThemedReactEmotionInterface<Theme extends object> = CreateStyled<
  Theme
>;

declare module 'react-native' {
  interface ViewProps {
    css?: BaseInterpolation;
  }

  interface ImageProps {
    css?: BaseInterpolation;
  }

  interface TextProps {
    css?: BaseInterpolation;
  }
}

export interface CreateStyledPrimitivesShorthand<Theme extends object> {
  View: CreateStyledOtherComponent<ViewProps, Theme>;
  Image: CreateStyledOtherComponent<ImageProps, Theme>;
  Text: CreateStyledOtherComponent<TextProps, Theme>;
}

export { CreateStyled, Interpolation, StyledComponent, StyledOptions, Themed };

export interface CreateStyledPrimitives<Theme extends object = any>
  extends CreateStyled<Theme>,
    CreateStyledPrimitivesShorthand<Theme> {}

declare const styled: CreateStyledPrimitives;
export default styled;
