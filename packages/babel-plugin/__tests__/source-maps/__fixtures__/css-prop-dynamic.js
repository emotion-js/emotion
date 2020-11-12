/** @jsx jsx */
import { jsx } from '@emotion/react'

const SomeComponent = props => (
  <div
    css={{
      backgroundColor: window.something
    }}
    {...props}
  />
)
