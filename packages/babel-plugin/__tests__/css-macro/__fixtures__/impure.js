import { css } from '@emotion/react/macro'

function thing() {}

function doThing() {
  return css`
    display: ${thing()};
  `
}
