// @flow
import * as React from 'react'
import isPropValid from '@emotion/is-prop-valid'

export type Interpolations = Array<any>

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

export type StyledOptions = {
  label?: string,
  shouldForwardProp?: string => boolean,
  target?: string
}

type CreateStyledComponent = (...args: Interpolations) => *

type BaseCreateStyled = (
  tag: React.ElementType,
  options?: StyledOptions
) => CreateStyledComponent

export type CreateStyled = BaseCreateStyled & {
  [key: string]: CreateStyledComponent
}
