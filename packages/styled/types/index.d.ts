// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.2

import { Theme } from '@emotion/react'
import { CreateStyled as BaseCreateStyled, CreateStyledComponent } from './base'
import { ReactJSX } from './jsx-namespace'

export {
  ArrayInterpolation,
  ComponentSelector,
  CSSObject,
  FunctionInterpolation,
  Interpolation,
  StyledComponent,
  StyledOptions,
  FilteringStyledOptions,
  CreateStyledComponent
} from './base'

export type StyledTags = {
  [Tag in keyof ReactJSX.IntrinsicElements]: CreateStyledComponent<
    {
      theme?: Theme
      as?: React.ElementType
    },
    ReactJSX.IntrinsicElements[Tag]
  >
}

export interface CreateStyled extends BaseCreateStyled, StyledTags {}

declare const styled: CreateStyled
export default styled
