import { css } from '@emotion/react/macro'

const obj = {
  FooBar() {
    return (
      <div
        css={css`
          background-color: hotpink;
        `}
      />
    )
  }
}
