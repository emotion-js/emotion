import { css } from '@emotion/css/macro'

// whitespace before pseudo should be preserved
css`
  & :hover {
    color: hotpink;
  }
`
