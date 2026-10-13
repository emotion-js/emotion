import { css } from '@emotion/react/macro'

const nested = css`
  .nested {
    padding: 25px;
  }
`

const cls = css`
  color: red;

  .top-level {
    .nested {
      padding: 15px;
    }

    ${nested};

    &:hover {
      color: blue;
    }
  }
`
