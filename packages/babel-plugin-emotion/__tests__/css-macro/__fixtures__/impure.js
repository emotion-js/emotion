import { css } from '@emotion/core/macro'

function thing() {}

function doThing() {
  return css`
    display: ${thing()};
  `
}
