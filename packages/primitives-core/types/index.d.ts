// Definitions by:
// Junyoung Clare Jang <https://github.com/Ailrun>
// Sam Pettersson <https://github.com/iamsamwhoami>
// TypeScript Version: 2.3

import { StyleSheet } from 'react-primitives';
import { Emotion } from 'create-emotion';

import {
  CreateStyled,
  CreateStyledOtherComponent,
  CreateStyledStatelessComponent,
  StyledComponent,
  StyledComponentMethods,
  StyledOtherComponent,
  StyledStatelessComponent
} from './react';

import {
  ArrayInterpolation,
  FunctionInterpolation,
  BaseInterpolation,
  Interpolation,
  StyledOptions
} from './common';

import { Themed } from 'create-emotion-styled/types/common';

export {
  ArrayInterpolation,
  FunctionInterpolation,
  Interpolation,
  StyledOptions,
  Themed,
  CreateStyled,
  CreateStyledOtherComponent,
  CreateStyledStatelessComponent,
  StyledComponent,
  StyledComponentMethods,
  StyledOtherComponent,
  StyledStatelessComponent
};

type CreatePrimitivesStyled = (
  styleSheet: typeof StyleSheet,
  options: StyledOptions
) => CreateStyled;

export const createStyled: CreatePrimitivesStyled;

type CreatePrimitivesCss = (
  styleSheet: typeof StyleSheet
) => (...args: BaseInterpolation[]) => string;

export const createCss: CreatePrimitivesCss;
