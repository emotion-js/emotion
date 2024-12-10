import React from 'react'
import { Theme } from '@emotion/react'
import styled from './base'
import { tags } from './tags'
import {
  CreateStyledComponent,
  CreateStyled as BaseCreateStyled
} from './types'
export type {
  ArrayInterpolation,
  ComponentSelector,
  CSSObject,
  FunctionInterpolation,
  Interpolation
} from '@emotion/serialize'
export type {
  CreateStyledComponent,
  FilteringStyledOptions,
  StyledComponent,
  StyledOptions
} from './types'

export type StyledTags = {
  [Tag in keyof React.JSX.IntrinsicElements]: CreateStyledComponent<
    {
      theme?: Theme
      as?: React.ElementType
    },
    React.JSX.IntrinsicElements[Tag]
  >
}

export interface CreateStyled extends BaseCreateStyled, StyledTags {}

// bind it to avoid mutating the original function
const newStyled = styled.bind(null) as CreateStyled

tags.forEach(tagName => {
  ;(newStyled as any)[tagName] = newStyled(tagName as keyof typeof newStyled)
})

export default newStyled
