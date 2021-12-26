import { Global } from '@emotion/react'
import { ReactElement } from 'react'
import { colors } from '../util'

export function GlobalStyles(): ReactElement {
  return (
    <Global
      styles={{
        a: {
          color: colors.pink,
          textDecoration: 'none'
        },
        'a:hover': {
          color: colors.hightlight,
          textDecoration: 'underline'
        }
      }}
    />
  )
}
