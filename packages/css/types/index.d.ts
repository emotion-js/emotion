// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.8
import {
  Interpolation,
  SerializedStyles,
  CSSInterpolation
} from '@emotion/serialize'

export {
  ArrayInterpolation,
  ComponentSelector,
  CSSObject,
  FunctionInterpolation,
  ObjectInterpolation
} from '@emotion/serialize'

export { Interpolation, SerializedStyles }

export default function css(
  template: TemplateStringsArray,
  ...args: Array<CSSInterpolation>
): SerializedStyles
export default function css(...args: Array<CSSInterpolation>): SerializedStyles
