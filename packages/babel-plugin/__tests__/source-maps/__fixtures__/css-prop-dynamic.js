/** @jsx jsx */
import { jsx } from '@emotion/core'

const SomeComponent = props => (
  <div
    css={{
      backgroundColor: window.something
    }}
    {...props}
  />
)
