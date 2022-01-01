import { Global, css } from '@emotion/react'
import { ReactElement } from 'react'
import { colors, draculaPrism } from '../util'

const globalCss = css({
  a: {
    color: colors.pink,
    textDecoration: 'none'
  },
  'a:hover': {
    color: colors.hightlight,
    textDecoration: 'underline'
  }
  // '.remark-highlight': { display: 'none' }
})

export function GlobalStyles(): ReactElement {
  return <Global styles={[draculaPrism, globalCss]} />
}
