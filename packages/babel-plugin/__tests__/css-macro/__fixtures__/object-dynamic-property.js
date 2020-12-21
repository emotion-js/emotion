import { css } from '@emotion/react/macro'

function doThing() {
  return {
    [css({ color: 'hotpink' })]: 'coldblue',
  }
}
