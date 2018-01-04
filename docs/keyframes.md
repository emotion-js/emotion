---
title: "Keyframes"
---

If you need more control over an animation, you can use `keyframes` with the same JS interpolation as `css`. The `keyframes` function takes in a css keyframe definition and returns an animation name so that you can include it in other styles. This is similar to how `css` takes in styles and returns a className that you can use to apply the styles.

```jsx live
import styled, { keyframes } from 'react-emotion'

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

const Avatar = styled('img')`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  animation: ${bounce} 1s ease infinite;
  transform-origin: center bottom;
`

render(<Avatar src={logoUrl} />)
```
