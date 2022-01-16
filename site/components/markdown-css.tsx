import { css } from '@emotion/react'
import React, { ReactElement, TableHTMLAttributes } from 'react'
import { colors, mediaQueries, styleConstants } from '../util'

export const markdownCss = css({
  'h2, h3, h4': { marginTop: '2rem', marginBottom: '1rem' },

  h2: {
    paddingBottom: '0.5rem',
    borderBottom: `1px solid ${colors.pinkBorder}`
  },

  'p, li, code': { lineHeight: 1.7 },

  a: {
    fontWeight: 500,
    color: colors.hightlight
  },

  hr: { border: `1px solid ${colors.pinkBorder}`, opacity: 1 },

  // This targets inline code only, not code blocks
  'code:not([class*="language-"])': {
    color: colors.body,
    backgroundColor: 'rgba(117, 63, 131, 0.07)',
    borderRadius: styleConstants.borderRadius,
    padding: '0.25rem'
  },

  // This targets code blocks and live editors
  '.remark-highlight, .emotion-live-editor': {
    margin: '1.5rem 0'
  },

  blockquote: {
    display: 'flex',
    margin: '1.5rem 0',
    borderLeft: `5px solid ${colors.hotPink}`,
    backgroundColor: colors.pinkBg,
    padding: '1rem',

    p: {
      margin: 0,

      '&:first-of-type': {
        fontWeight: 700
      },

      '&:nth-of-type(2)': {
        marginLeft: '0.5rem',
        padding: '0 1rem'
      }
    }
  },

  '.table-responsive-sm': {
    overflowX: 'auto',

    [mediaQueries.mdUp]: {
      overflowX: 'initial'
    }
  },

  table: {
    margin: '1.5rem 0',
    width: '100%'
  },

  'td, th': {
    padding: '0.75rem',
    border: `1px solid ${colors.grayBorder}`
  },

  img: {
    maxWidth: '100%'
  }
})

export function ResponsiveTable({
  children
}: React.TableHTMLAttributes<HTMLTableElement>): ReactElement {
  return (
    <div className="table-responsive-sm">
      <table>{children}</table>
    </div>
  )
}
