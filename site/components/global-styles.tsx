import { Global, css } from '@emotion/react'
import { ReactElement } from 'react'
import { colors, draculaPrism } from '../util'

const globalCss = css({
    ':root': {
    '--background-color': '#ffffff',
    '--text-color': '#000000',
    '--link-color': colors.pink,
    '--link-hover-color': colors.hightlight,
  },
  '.dark': {
    '--background-color': '#121212',
    '--text-color': '#ffffff',
    '--link-color': colors.pink, // Adjust if different in dark mode
    '--link-hover-color': colors.hightlight, // Adjust if different in dark mode
  },
  body: {
    backgroundColor: 'var(--background-color)',
    color: 'var(--text-color)',
  },
  a: {
    color: colors.pink,
    textDecoration: 'none'
  },
  'a:hover': {
    color: colors.hightlight,
    textDecoration: 'underline'
  }
})

export function GlobalStyles(): ReactElement {
  return <Global styles={[draculaPrism, globalCss]} />
}
