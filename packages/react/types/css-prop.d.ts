import {} from 'react'
import { Interpolation } from '@emotion/serialize'
import { Theme } from '.'

declare module 'react' {
  interface Attributes {
    css?: Interpolation<Theme>
  }
}
