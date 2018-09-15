// Definitions by:
// Junyoung Clare Jang <https://github.com/Ailrun>
// Sam Pettersson <https://github.com/iamsamwhoami>
// TypeScript Version: 2.3

import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

import {
  Emotion,
  ArrayInterpolation as BaseArrayInterpolation,
  ClassInterpolation
} from 'create-emotion';

export type BasePrimitivesStyle = ViewStyle | TextStyle | ImageStyle;

export type BaseInterpolation =
  | undefined
  | null
  | boolean
  | string
  | number
  | TemplateStringsArray
  | BasePrimitivesStyle
  | BaseArrayInterpolation
  | ClassInterpolation;

export interface ArrayInterpolation<Props>
  extends Array<Interpolation<Props>> {}
export type FunctionInterpolation<Props> = (
  props: Props,
  context: any
) => Interpolation<Props>;

export type Interpolation<Props> =
  | BaseInterpolation
  | ArrayInterpolation<Props>
  | FunctionInterpolation<Props>;
