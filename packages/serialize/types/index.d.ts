// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.8

import '@emotion/core'
import { RegisteredCache, SerializedStyles } from '@emotion/utils'
import * as CSS from 'csstype'

export { RegisteredCache, SerializedStyles }

export type CSSProperties = CSS.PropertiesFallback<number | string>
export type CSSPropertiesWithMultiValues = {
  [K in keyof CSSProperties]:
    | CSSProperties[K]
    | Array<Extract<CSSProperties[K], string>>
}
/**
 * @desc Following type exists for autocompletion of key.
 */
export type CSSPseudos<MP = { theme: Emotion.Theme }> = {
  [K in CSS.Pseudos]?: ObjectInterpolation<MP>
}
export interface CSSOthersObject<MP = { theme: Emotion.Theme }> {
  [propertiesName: string]: Interpolation<MP>
}

export type CSSPseudosForCSSObject = { [K in CSS.Pseudos]?: CSSObject }

export interface ArrayCSSInterpolation extends Array<CSSInterpolation> {}

export type CSSInterpolation =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | CSSObject
  | ArrayCSSInterpolation

export interface CSSOthersObjectForCSSObject {
  [propertiesName: string]: CSSInterpolation
}

export interface CSSObject
  extends CSSPropertiesWithMultiValues,
    CSSPseudosForCSSObject,
    CSSOthersObjectForCSSObject {}

export interface ComponentSelector {
  __emotion_styles: any
}

export type Keyframes = {
  name: string
  styles: string
  anim: number
  toString: () => string
} & string

export interface ArrayInterpolation<MP = { theme: Emotion.Theme }>
  extends Array<Interpolation<MP>> {}
export interface ObjectInterpolation<MP = { theme: Emotion.Theme }>
  extends CSSPropertiesWithMultiValues,
    CSSPseudos<MP>,
    CSSOthersObject<MP> {}

export interface FunctionInterpolation<MergedProps = { theme: Emotion.Theme }> {
  (mergedProps: MergedProps): Interpolation<MergedProps>
}

export type Interpolation<MergedProps = { theme: Emotion.Theme }> =
  | null
  | undefined
  | boolean
  | number
  | string
  | ComponentSelector
  | Keyframes
  | SerializedStyles
  | ArrayInterpolation<MergedProps>
  | ObjectInterpolation<MergedProps>
  | FunctionInterpolation<MergedProps>

export function serializeStyles<MP = { theme: Emotion.Theme }>(
  args: Array<TemplateStringsArray | Interpolation<MP>>,
  registered: RegisteredCache,
  mergedProps?: MP
): SerializedStyles
