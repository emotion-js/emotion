// Definitions by:
// Junyoung Clare Jang <https://github.com/Ailrun>
// Sam Pettersson <https://github.com/iamsamwhoami>
// TypeScript Version: 2.3

import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface StyledOptions {
  shouldForwardProp?: (name: string) => boolean;
}

export type BasePrimitivesStyle = ViewStyle | TextStyle | ImageStyle;

export interface BaseArrayInterpolation extends Array<BaseInterpolation> {}

export interface ClassInterpolation extends Function {
  __emotion_real: any;
  __emotion_styles: BaseInterpolation[];
  __emotion_base: ClassInterpolation;
  __emotion_target: string;
  __emotion_forwardProp: undefined | null | ((arg: string) => boolean);
}

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
