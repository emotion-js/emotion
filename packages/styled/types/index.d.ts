// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.8

import {
  CreateStyled as BaseCreateStyled,
  CreateStyledComponent
} from '@emotion/styled-base'

export {
  ArrayInterpolation,
  ComponentSelector,
  CSSObject,
  FunctionInterpolation,
  Interpolation,
  ObjectInterpolation,
  StyledComponent,
  StyledOptions,
  CreateStyledComponent
} from '@emotion/styled-base'

export type StyledTags<ExtraProps extends object = {}> = {
  [tag in keyof JSX.IntrinsicElements]: CreateStyledComponent<
    JSX.IntrinsicElements[tag],
    ExtraProps
  >
}

export interface CreateStyled extends BaseCreateStyled, StyledTags {}

declare const styled: CreateStyled
export default styled
