// Definitions by: Pat Sissons <https://github.com/patsissons>
// TypeScript Version: 3.4

import {
  CreateStyled as BaseCreateStyled,
  CreateStyledComponent,
  Interpolation,
  ReactNativeStyle,
  ReactNativeElements
} from './base'

export {
  ArrayInterpolation,
  FunctionInterpolation,
  Interpolation,
  ObjectInterpolation,
  StyledComponent,
  StyledOptions,
  CreateStyledComponent
} from './base'

export function css(
  template: TemplateStringsArray,
  ...args: Array<Interpolation>
): ReactNativeStyle
export function css(...args: Array<Interpolation>): ReactNativeStyle

export type StyledTags<Theme extends {} = any> = {
  [Tag in keyof ReactNativeElements]: CreateStyledComponent<
    { theme?: Theme },
    ReactNativeElements[Tag],
    { theme: Theme }
  >
}

export interface CreateStyled<Theme extends {} = any>
  extends BaseCreateStyled<Theme>,
    StyledTags<Theme> {}

declare const styled: CreateStyled
export default styled
