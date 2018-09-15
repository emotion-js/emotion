// Definitions by:
// Junyoung Clare Jang <https://github.com/Ailrun>
// Sam Pettersson <https://github.com/iamsamwhoami>
// TypeScript Version: 2.3

import { Emotion, Interpolation as BaseInterpolation } from 'create-emotion';
import * as React from 'react';

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
  Interpolation
} from './common';

import { StyledOptions, Themed } from 'create-emotion-styled/types/common';

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

export default function createEmotionStyled(
  emotion: Emotion,
  view: typeof React
): CreateStyled;
