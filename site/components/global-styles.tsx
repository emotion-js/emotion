import { Global } from '@emotion/react'
import { ReactElement } from 'react'
import { colors } from '../util'

export function GlobalStyles(): ReactElement {
  return (
    <Global
      styles={{
        'a:hover': {
          color: colors.pink
        }
      }}
    />
  )
}
