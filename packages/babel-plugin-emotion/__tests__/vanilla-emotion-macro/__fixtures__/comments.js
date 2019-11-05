import { css } from 'emotion/macro'

css`
  // display:flex;

  /*
wef

dfwf*/
  color: hotpink;
`

css`
  /* @noflip */
  left: 1px;
`

css`
  left: 2px;

  /* @noflip */
  &.foo {
    left: 3px;
  }

  &.zot {
    /* @noflip */
    right: 1px;
  }
`

css`
  /* @whatever */
  left: 4px;
`

css`
  left: 5px;

  /* @whatever */
  &.foo {
    left: 6px;
  }

  &.zot {
    /* @whatever */
    right: 2px;
  }
`

css`
  // @noflip should-be-removed
  left: 7px;
`

css`
  // @shouldberemoved
  left: 8px;
`
