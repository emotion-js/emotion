// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.3

import { Emotion, Interpolation as BaseInterpolation } from 'create-emotion';

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
  shouldForwardProp?: (name: string) => boolean;
}

export type Themed<P extends object, T extends object> = P & { theme: T };

export type StyledStatelessProps<P extends object, T extends object> =
  & P
  & { theme?: T }
  ;
export type StyledOtherProps<P extends object, T extends object, R> =
  & StyledStatelessProps<P, T>
  & { innerRef?: R }
  ;
