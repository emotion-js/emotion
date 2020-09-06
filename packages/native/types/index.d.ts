// Definitions by: Pat Sissons <https://github.com/patsissons>, L <https://github.com/louisgv>
// TypeScript Version: 3.4

import * as ReactNative from 'react-native'
import { Theme } from '@emotion/react'

import {
  CreateStyled as BaseCreateStyled,
  CreateStyledComponent,
  CSSInterpolation,
  Interpolation,
  ReactNativeStyle,
  ReactNativeStyleType
} from './base'

export {
  ArrayCSSInterpolation,
  ArrayInterpolation,
  CreateStyledComponent,
  CSSInterpolation,
  FunctionInterpolation,
  Interpolation,
  InterpolationPrimitive,
  ObjectInterpolation,
  ReactNativeStyle,
  StyledComponent,
  StyledOptions
} from './base'

export function css<StyleType extends ReactNativeStyle = ReactNativeStyle>(
  template: TemplateStringsArray,
  ...args: Array<Interpolation>
): StyleType
export function css<StyleType extends ReactNativeStyle = ReactNativeStyle>(
  ...args: Array<StyleType>
): StyleType
export function css<StyleType extends ReactNativeStyle = ReactNativeStyle>(
  ...args: Array<CSSInterpolation>
): StyleType

// those 2 are just copies of the `BaseCreateStyled` with supplied `C` type argument
type HostClassComponent<
  C extends React.ComponentClass<any>
> = CreateStyledComponent<
  React.ComponentProps<C> & { theme?: Theme },
  {},
  { ref?: React.Ref<InstanceType<C>> },
  ReactNativeStyleType<React.ComponentProps<C>>
>

export type StyledComponents = {
  [key in ReactNative]: HostClassComponent<ReactNative[key]>
}

export interface CreateStyled extends BaseCreateStyled, StyledComponents {}

declare const styled: CreateStyled
export default styled
