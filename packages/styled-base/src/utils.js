// @flow
import * as React from 'react'
import type { ElementType } from 'react'
import isPropValid from '@emotion/is-prop-valid'

export type Interpolations = Array<any>

export type StyledOptions = {
  label?: string,
  shouldForwardProp?: string => boolean,
  target?: string
}

export type StyledComponent = {
  (Interpolations): React$Node,
  withComponent: (
    nextTag: ElementType,
    nextOptions?: StyledOptions
  ) => StyledComponent,
  displayName: string,
  defaultProps: any,
  __emotion_real: StyledComponent,
  __emotion_base: any,
  __emotion_styles: any,
  __emotion_forwardProp: any,
  toString: () => string
}

const testOmitPropsOnStringTag = isPropValid
const testOmitPropsOnComponent = (key: string) =>
  key !== 'theme' && key !== 'innerRef'

export const getDefaultShouldForwardProp = (tag: React.ElementType) =>
  typeof tag === 'string' &&
  // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96
    ? testOmitPropsOnStringTag
    : testOmitPropsOnComponent

export type CreateStyledComponent = (...args: Interpolations) => StyledComponent

export type CreateStyled = {
  (tag: React.ElementType, options?: StyledOptions): CreateStyledComponent,
  [key: string]: CreateStyledComponent
}
