import { css } from '@emotion/react'
import { colors, styleConstants } from '../util'

export const markdownCss = css({
  'h1, h2, h3': { marginTop: '3rem', marginBottom: '1.5rem' },

  code: {
    color: colors.body,
    backgroundColor: 'rgba(117, 63, 131, 0.07)',
    borderRadius: styleConstants.borderRadius,
    fontSize: styleConstants.fontSizeSm,
    padding: '0.25rem'
  },

  'h1 code, h2 code, h3 code, h4 code, h5 code, h6 code': {
    fontSize: 'inherit'
  },

  a: {
    display: 'inline-block',
    fontWeight: 500,
    color: colors.hightlight
    // '&.anchor': {
    //   backgroundColor: 'initial',
    //   borderBottom: 'initial'
    // },
    // code: {
    //   '&:hover': { color: colors.border }
    // }
  },

  hr: { border: `1px solid ${colors.pinkBorder}`, opacity: 1 }
})
