// Definitions by: Pat Sissons <https://github.com/patsissons>
// TypeScript Version: 3.4

import { Theme } from '@emotion/react'

import {
  CreateStyled as BaseCreateStyled,
  CreateStyledComponent,
  CSSInterpolation,
  Interpolation,
  ReactNativeStyle,
  ReactNativeComponentNames,
  ReactNativeComponentProps,
  ReactNativeComponents,
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

export type StyledComponents = {
  [ComponentName in ReactNativeComponentNames]: CreateStyledComponent<
    ReactNativeComponentProps<ComponentName> & { theme?: Theme },
    {},
    { ref?: React.Ref<InstanceType<ReactNativeComponents[ComponentName]>> },
    ReactNativeStyleType<ReactNativeComponentProps<ComponentName>>
  >
}

export interface CreateStyled extends BaseCreateStyled, StyledComponents {}

declare const styled: CreateStyled
export default styled
