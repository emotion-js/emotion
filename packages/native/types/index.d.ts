// Definitions by: Pat Sissons <https://github.com/patsissons>
// TypeScript Version: 3.4

import '@emotion/core'

import {
  CreateStyled as BaseCreateStyled,
  CreateStyledComponent,
  Interpolation,
  ReactNativeStyle,
  ReactNativeComponentNames,
  ReactNativeComponentProps,
  ReactNativeComponents,
  ReactNativeStyleType
} from './base'

export {
  ArrayInterpolation,
  CreateStyledComponent,
  FunctionInterpolation,
  Interpolation,
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
  ...args: Array<Interpolation>
): StyleType

export type StyledComponents<Theme extends {} = any> = {
  [ComponentName in ReactNativeComponentNames]: CreateStyledComponent<
    { theme?: Theme },
    ReactNativeComponentProps<ComponentName>,
    { theme: Theme },
    ReactNativeStyleType<ReactNativeComponentProps<ComponentName>>
  >
}

export interface CreateStyled<Theme extends {} = any>
  extends BaseCreateStyled<Theme>,
    StyledComponents<Theme> {}

declare const styled: CreateStyled
export default styled
