// Definitions by: Pat Sissons <https://github.com/patsissons>
// TypeScript Version: 3.4

import {
  CreateStyled as BaseCreateStyled,
  CreateStyledComponent,
  Interpolation,
  ReactNativeStyle,
  ReactNativeComponentNames,
  ReactNativeComponentProps,
  ReactNativeComponents
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

export function css(
  template: TemplateStringsArray,
  ...args: Array<Interpolation>
): ReactNativeStyle
export function css(...args: Array<Interpolation>): ReactNativeStyle

export type StyledComponents<Theme extends {} = any> = {
  [ComponentName in ReactNativeComponentNames]: CreateStyledComponent<
    { theme?: Theme },
    ReactNativeComponentProps<ComponentName>,
    { theme: Theme }
  >
}

export interface CreateStyled<Theme extends {} = any>
  extends BaseCreateStyled<Theme>,
    StyledComponents<Theme> {}

declare const styled: CreateStyled
export default styled
