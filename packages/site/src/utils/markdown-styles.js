// @flow
import styled from 'react-emotion'
import { openColors, constants } from './style'

export const p = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1.3rem;
  color: ${openColors.gray[8]};
  line-height: 1.7;
  font-size: ${constants.fontSizes[4]};
`

export const img = styled.img`
  max-height: 360px;
  margin: 0 auto;
`

export const a = styled.a`
  background-color: #faebf8;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  :hover,
  :focus,
  :active {
    background-color: #f5d0f0;
  }
  &.anchor {
    background-color: initial;
  }
`

export const blockquote = styled.blockquote`
  margin: 0;
  border-left: 5px solid ${openColors.gray[5]};
  font-style: italic;
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
`
