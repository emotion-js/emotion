/** @jsx jsx */
import { jsx, css } from '@emotion/react'

const SomeComponent = props => (
  <div
    css={css`
      color: ${window};
    `}
    {...props}
  />
)
