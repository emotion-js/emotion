import { css } from '@emotion/react/macro'

const thing = css`
  display: flex;
  &:hover {
    ${css`
      color: hotpink;
    `};
  }
`
