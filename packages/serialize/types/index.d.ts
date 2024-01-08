// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.8

import { RegisteredCache, SerializedStyles } from '@emotion/utils'
import * as CSS from 'csstype'

export { RegisteredCache, SerializedStyles }

export type CSSProperties = CSS.PropertiesFallback<number | string>
export type CSSPropertiesWithMultiValues<Props> = {
  [K in keyof CSSProperties]:
    | CSSProperties[K]
    | ReadonlyArray<Extract<CSSProperties[K], string>>
    | ((props: Props) => number | string)
}

export type CSSPseudos<Props> = { [K in CSS.Pseudos]?: CSSObject<Props> }

export interface ArrayCSSInterpolation<Props>
  extends ReadonlyArray<CSSInterpolation<Props>> {}

export type InterpolationPrimitive<Props> =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSObject<Props>

export type CSSInterpolation<Props> =
  | InterpolationPrimitive<Props>
  | ArrayCSSInterpolation<Props>

export interface CSSOthersObject<Props> {
  [propertiesName: string]:
    | CSSInterpolation<Props>
    | ((props: Props) => string | number)
}

export interface CSSObject<Props = unknown>
  extends CSSPropertiesWithMultiValues<Props>,
    CSSPseudos<Props>,
    CSSOthersObject<Props> {}

export interface ComponentSelector {
  __emotion_styles: any
}

export type Keyframes = {
  name: string
  styles: string
  anim: number
  toString: () => string
} & string

export interface ArrayInterpolation<Props>
  extends Array<Interpolation<Props>> {}

export interface FunctionInterpolation<Props> {
  (props: Props): Interpolation<Props>
}

export type Interpolation<Props> =
  | InterpolationPrimitive<Props>
  | ArrayInterpolation<Props>
  | FunctionInterpolation<Props>

export function serializeStyles<Props>(
  args: Array<TemplateStringsArray | Interpolation<Props>>,
  registered?: RegisteredCache,
  props?: Props
): SerializedStyles
