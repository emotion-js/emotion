/** @jsx jsx */
import { jsx } from '@emotion/core'

const SomeComponent = props => (
  <div
    css={{
      color: 'hotpink'
    }}
    {...props}
  />
)
