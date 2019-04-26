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
`

css`
  // @noflip
  left: 4px;
`

css`
  /* @shouldberemoved */
  left: 5px;
`

css`
  // @shouldberemoved
  left: 6px;
`

css`
  left: 7px;

  /* @shouldberemoved */
  &.foo {
    left: 8px;
  }
`
