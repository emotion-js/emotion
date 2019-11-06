// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.2

import '@emotion/core'
import { CreateStyled as BaseCreateStyled, CreateStyledComponent } from './base'
import { AnyIfEmpty } from '@emotion/core'

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
} from './base'

export type StyledTags<Theme extends {} = AnyIfEmpty<Emotion.Theme>> = {
  [Tag in keyof JSX.IntrinsicElements]: CreateStyledComponent<
    { theme?: Theme },
    JSX.IntrinsicElements[Tag],
    { theme: Theme }
  >
}

export interface CreateStyled<Theme extends {} = AnyIfEmpty<Emotion.Theme>>
  extends BaseCreateStyled<Theme>,
    StyledTags<Theme> {}

declare const styled: CreateStyled
export default styled
