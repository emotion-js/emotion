import { css } from '@emotion/core/macro'

const thing = css`
  display: flex;
  &:hover {
    ${css`
      color: hotpink;
    `};
  }
`
