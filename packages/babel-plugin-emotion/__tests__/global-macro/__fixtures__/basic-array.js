import * as React from 'react'
import { Global } from '@emotion/core/macro'

export default () => (
  <Global styles={[{ color: 'hotpink' }, { backgroundColor: '#fff' }]} />
)
