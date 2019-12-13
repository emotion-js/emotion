import { keyframes } from '@emotion/css/macro'

let endingRotation = window.whatever

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(${endingRotation});
  }
`
