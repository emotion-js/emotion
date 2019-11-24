import { css } from '@emotion/core/macro'

function doThing() {
  return {
    [css({ color: 'hotpink' })]: 'coldblue'
  }
}
