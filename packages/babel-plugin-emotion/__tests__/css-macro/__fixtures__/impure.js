import css from '@emotion/css/macro'

function thing() {}

function doThing() {
  return css`
    display: ${thing()};
  `
}
