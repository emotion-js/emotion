import { keyframes } from '@emotion/core/macro'

const animationStyle = keyframes`
  from {background-color: red;}
  to {background-color: yellow;}
`

const animation = keyframes`
    from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
    }
    40%, 43% {
    transform: translate3d(0, -30px, 0);
    }
    70% {
    transform: translate3d(0, -15px, 0);
    }
    90% {
    transform: translate3d(0,-4px,0);
    }
`
