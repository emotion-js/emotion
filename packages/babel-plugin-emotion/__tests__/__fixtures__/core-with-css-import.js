/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const SomeComponent = props => (
  <div
    css={css`
      color: hotpink;
    `}
    {...props}
  />
)
