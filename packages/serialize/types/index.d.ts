// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.8

import { RegisteredCache, SerializedStyles } from '@emotion/utils'
import * as CSS from 'csstype'

export { RegisteredCache, SerializedStyles }

export type CSSProperties = CSS.PropertiesFallback<number | string>
export type CSSPropertiesWithMultiValues<Props = unknown> = {
  [K in keyof CSSProperties]:
    | CSSProperties[K]
    | ReadonlyArray<CSSProperties[K] & string>
    | ((
        props: Props
      ) => CSSProperties[K] | ReadonlyArray<CSSProperties[K] & string>)
}

export type CSSPseudos<Props = unknown> = {
  [K in CSS.Pseudos]?: CSSObject<Props>
}

export interface ArrayCSSInterpolation
  extends ReadonlyArray<CSSInterpolation> {}

export type InterpolationPrimitive<Props = unknown> =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSObject<Props>

export type CSSInterpolation = InterpolationPrimitive | ArrayCSSInterpolation

export interface CSSOthersObject<Props = unknown> {
  [propertiesName: string]:
    | InterpolationPrimitive<Props>
    | ReadonlyArray<InterpolationPrimitive<Props>>
    | ((
        props: Props
      ) =>
        | InterpolationPrimitive<Props>
        | ReadonlyArray<InterpolationPrimitive<Props>>)
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
