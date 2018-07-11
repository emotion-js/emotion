// @flow
import styled from '@emotion/styled'
import css from '@emotion/css'
import { openColors, mq, colors } from './style'

export const p = styled.p(
  mq({
    fontSize: [16, 17],
    color: openColors.gray[8],
    lineHeight: '1.7'
  })
)

export const img = styled.img`
  max-height: 360px;
  margin: 0 auto;
`

const baseHeadingStyles = css`
  margin: 0.75rem 0 0.5rem;
  font-weight: inherit;
  line-height: 1.42;
`

export const h1 = styled.h1`
  margin-top: 0;
  font-size: 3.998rem;
  ${baseHeadingStyles};
`

export const h2 = styled.h2`
  font-size: 2.827rem;
  ${baseHeadingStyles};
`

export const h3 = styled.h3`
  font-size: 1.999rem;
  ${baseHeadingStyles};
`

export const h4 = styled.h4`
  font-size: 1.414rem;
  ${baseHeadingStyles};
`

export const h5 = styled.h5`
  font-size: 1.121rem;
`

export const h6 = styled.div`
  font-size: 0.88rem;
`

export const a = styled.a`
  background-color: #faebf8;
  border-bottom: 1px solid currentColor;
  color: inherit;
  text-decoration: none;
  :hover,
  :focus,
  :active {
    background-color: #f5d0f0;
  }
  &.anchor {
    background-color: initial;
    border-bottom: initial;
  }
  code {
    background-color: inherit;
  }
`

const blockquoteColor = '#fe7ce5'

export const blockquote = styled.blockquote`
  margin: 0;
  border-left: 5px solid ${blockquoteColor};
  background-color: ${colors.lighten(0.24, blockquoteColor)};
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  margin-right: -32px;
  margin-left: -32px;
  padding-right: 32px;
  padding-left: 32px;
  padding-top: 16px;
  padding-bottom: 16px;
  p {
    margin-top: 15px;
    &:first-of-type {
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 0;
    }
    &:nth-of-type(2) {
      margin-top: 4px;
    }
  }
`
