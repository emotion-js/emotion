import { css } from '@emotion/react'
import { colors, styleConstants } from '../util'

export const markdownCss = css({
  'h2, h3, h4': { marginTop: '3rem', marginBottom: '1.5rem' },

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

  '.remark-highlight': {
    margin: '1.5rem 0'
  },

  blockquote: {
    display: 'flex',
    alignItems: 'center',
    margin: '2rem 0 0',
    borderLeft: `5px solid ${colors.hotPink}`,
    backgroundColor: colors.pinkBg,
    padding: '1rem',

    p: {
      margin: 0,

      '&:first-of-type': {
        fontWeight: 700,
        marginTop: 0
      },

      '&:nth-of-type(2)': {
        marginTop: '0.25rem',
        marginLeft: '0.5rem',
        padding: '0 1rem'
      }
    }
  }
})
