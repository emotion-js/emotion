// @flow
import styled from '@emotion/styled'
import css from '@emotion/css'
import { openColors, mq, colors, constants } from './style'

const textStyles = mq({
  fontSize: [16, 17],
  marginTop: 16,
  color: openColors.gray[8],
  lineHeight: '1.7'
})

export const p = styled.p(textStyles)

export const li = styled.li(textStyles)

export const ul = styled.ul({
  marginTop: 20,
  paddingLeft: 20,

  '& li': {
    marginTop: 10
  },

  '& ol, & ul': {
    marginLeft: 20,
    marginTop: 10
  }
})

export const img = styled.img`
  max-height: 360px;
  margin: 0 auto;
`

const baseHeadingStyles = css`
  margin: 0.75rem 0 0.5rem;
  font-weight: 600;
  line-height: 1.2;
`

export const h1 = styled.h1`
  margin-top: 44px;
  padding-top: 30px;
  font-size: 3.157rem;
  ${baseHeadingStyles};
`

export const h2 = styled.h2`
  font-size: 2.369rem;
  margin-top: 44px;
  padding-top: 30px;
  ${baseHeadingStyles};
`

export const h3 = styled.h3`
  font-size: 1.777rem;
  margin-top: 44px;
  padding-top: 30px;
  ${baseHeadingStyles};
`

export const h4 = styled.h4`
  font-size: 1.414rem;
  margin-top: 22px;
  padding-top: 15px;
  ${baseHeadingStyles};
`

export const h5 = styled.h5`
  font-size: 1.333rem;
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

export const table = styled.table`
  display: block;
  width: 100%;
  overflow: auto;
  word-break: normal;
  word-break: keep-all;
  border-collapse: collapse;
  border-spacing: 0;

  & tr:nth-child(2n) {
    background-color: #f8f8f8;
  }
`
export const td = styled.td`
  padding: ${constants.space[1]}px ${constants.space[2]}px;
  border: 1px solid #ddd;
`

export const th = styled.th`
  padding: ${constants.space[1]}px ${constants.space[2]}px;
  border: 1px solid #ddd;
  font-weight: bold;
`

export const tr = styled.tr`
  background-color: #fff;
  border-top: 1px solid #ccc;
`
