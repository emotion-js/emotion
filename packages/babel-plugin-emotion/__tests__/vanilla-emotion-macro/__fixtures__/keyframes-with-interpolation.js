import { keyframes } from 'emotion/macro'

let endingRotation = window.whatever

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(${endingRotation});
  }
`
