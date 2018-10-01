---
title: 'Keyframes'
---

If you need more control over an animation, you can use `keyframes` with the same JS interpolation as `css`. The `keyframes` function takes in a css keyframe definition and an object which can be interpolated in styles.

```jsx
// @live
/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'

const bounce = keyframes`
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

render(
  <div
    css={css`
      animation: ${bounce} 1s ease infinite;
    `}
  >
    some bouncing text!
  </div>
)
```
