---
title: "Keyframes"
---

If you need more control over an animation, you can use `keyframes` with the same JS interpolation as `css`.
The `keyframes` function takes in the css keyframes definition and returns the animation name so that you can include it in other styles. This is similar to how `css` takes in styles and returns the className that you can use to apply the styles.

```jsx
import { keyframes, css } from 'emotion'
import styled from 'react-emotion'

const bounceHeight = 30;

// This returns a animation
const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -${bounceHeight}px, 0);
  }

  70% {
    transform: translate3d(0, -${bounceHeight / 2}px, 0);
  }

  90% {
    transform: translate3d(0, -${bounceHeight / 4}px, 0);
  }
`

// You can use them in styled components or anything else
const AnimatedDiv = styled.div`
  animation: ${bounce} 1s ease infinite;
`

const slowBounce = css`
  animation: ${bounce} 5s ease 1;
`
```
