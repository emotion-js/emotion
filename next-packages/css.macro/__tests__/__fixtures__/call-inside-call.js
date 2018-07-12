import css from '@emotion/css.macro'

const thing = css`
  display: flex;
  &:hover {
    ${css`
      color: hotpink;
    `};
  }
`
