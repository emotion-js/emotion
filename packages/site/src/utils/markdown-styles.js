// @flow
import styled from 'react-emotion'
import { openColors, mq, colors } from './style'

export const p = styled.p(
  mq({
    fontSize: [16, 17],
    color: openColors.gray[8],
    lineHeight: '1.7',
  })
)

export const img = styled.img`
  max-height: 360px;
  margin: 0 auto;
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
