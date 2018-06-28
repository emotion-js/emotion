// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
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
  StyledStatelessComponent,
} from './react';

import {
  ArrayInterpolation,
  FunctionInterpolation,
  Interpolation,
  StyledOptions,
  Themed,
} from './common';

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
  StyledStatelessComponent,
};

export default function createEmotionStyled(emotion: Emotion, view: typeof React): CreateStyled;
