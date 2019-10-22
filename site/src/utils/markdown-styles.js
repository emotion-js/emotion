// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import css from '@emotion/css'
import { mq, colors, constants, animatedUnderline } from './style'

const textStyles = mq({
  fontSize: [15, 16],
  marginTop: 20,
  color: colors.color,
  fontWeight: 400,
  lineHeight: '1.7'
})

export const p = styled.p(textStyles)

export const code = styled.code(
  textStyles,
  mq({
    backgroundColor: 'rgba(117, 63, 131, 0.07)',
    borderRadius: '0.325rem',
    fontSize: ['80%', '85%'],
    margin: 0,
    padding: '0.2rem 0.325rem'
  })
)

export const pre = styled.pre({
  '& > code': {
    padding: 0
  }
})

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

export const li = styled.li(textStyles, {
  marginTop: 10,
  p: { marginTop: 5, marginBottom: 0 },
  '& > ul, & > ol': {
    marginTop: 5,
    marginBottom: 15,
    '& > li': {
      marginTop: 5
    }
  }
})

export const img = styled.img`
  max-height: 360px;
  margin: 0 auto;
`

const baseHeadingStyles = css`
  color: ${colors.color};
  margin: 30px 0 0 0;
  font-weight: 600;
  line-height: 1.2;
`

export const h1 = styled.h1`
  margin-top: 32px;
  padding-top: 20px;
  font-size: 32px;
  ${baseHeadingStyles};
`

export const h2 = styled.h2`
  ${baseHeadingStyles};
  font-size: 24px;
  padding-top: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.lighten(0.25, colors.border)};
  & + h3 {
    margin-top: 0;
  }
`

export const h3 = styled.h3`
  font-size: 20px;
  padding-top: 20px;
  ${baseHeadingStyles};
`

export const h4 = styled.h4`
  font-size: 16px;
  margin-top: 22px;
  padding-top: 15px;
  ${baseHeadingStyles};
`

export const h5 = styled.h5`
  font-size: 14px;
`

export const h6 = styled.div`
  font-size: 12;
`

export const a = styled.a(
  {
    display: 'inline-block',
    fontSize: constants.fontSizes[2],
    fontWeight: '500',
    color: colors.hightlight,
    textDecoration: 'none',
    '&:hover': {
      color: colors.border,
      code: {
        color: colors.border
      }
    },
    '&.anchor': {
      backgroundColor: 'initial',
      borderBottom: 'initial'
    },
    code: {
      '&:hover': { color: colors.border }
    }
  },
  animatedUnderline
)

export const blockquote = styled.blockquote`
  display: flex;
  align-items: center;
  margin: 0;
  margin-top: ${constants.space[3]}px;
  border-left: 5px solid ${colors.border};
  background-color: ${colors.parentBg};
  padding: 10px;
  text-align: left;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 16px;
  padding-bottom: 16px;

  p {
    margin: 0;
    &:first-of-type {
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 0;
    }
    &:nth-of-type(2) {
      margin-top: 4px;
      margin-left: 8px;
      padding: 0 16px;
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
  margin-top: 24px;

  & tr:nth-child(2n) {
    background-color: ${colors.parentBg};
  }

  & code {
    font-size: 13px;
  }
`
export const td = styled.td`
  padding: 12px 12px;
  border: 1px solid ${colors.color};
`

export const th = styled.th`
  padding: ${constants.space[1]}px ${constants.space[2]}px;
  border: 1px solid ${colors.color};
  font-weight: bold;
`

export const tr = styled.tr`
  background-color: #fff;
  border-top: 1px solid #ccc;
`

export let hr = (props: {}) => (
  <hr
    css={{ border: `1px solid ${colors.lighten(0.25, colors.border)}` }}
    {...props}
  />
)
