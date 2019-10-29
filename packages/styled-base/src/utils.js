// @flow
import type { ElementType, StatelessFunctionalComponent } from 'react'
import isPropValid from '@emotion/is-prop-valid'

export type Interpolations = Array<any>

export type StyledOptions = {
  label?: string,
  shouldForwardProp?: string => boolean,
  target?: string
}

export type StyledComponent<P> = StatelessFunctionalComponent<P> & {
  defaultProps: any,
  toString: () => string,
  withComponent: (
    nextTag: ElementType,
    nextOptions?: StyledOptions
  ) => StyledComponent<P>
}

export type PrivateStyledComponent<P> = StyledComponent<P> & {
  __emotion_real: StyledComponent<P>,
  __emotion_base: any,
  __emotion_styles: any,
  __emotion_forwardProp: any
}

const testOmitPropsOnStringTag = isPropValid
const testOmitPropsOnComponent = (key: string) =>
  key !== 'theme' && key !== 'innerRef'

export const getDefaultShouldForwardProp = (tag: ElementType) =>
  typeof tag === 'string' &&
  // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96
    ? testOmitPropsOnStringTag
    : testOmitPropsOnComponent

export type CreateStyledComponent = <P>(
  ...args: Interpolations
) => StyledComponent<P>

export type CreateStyled = {
  <P>(
    tag: ElementType,
    options?: StyledOptions
  ): (...args: Interpolations) => StyledComponent<P>,
  [key: string]: CreateStyledComponent,
  bind: () => CreateStyled
}
