## Keyframes

```jsx
import { keyframes } from 'emotion'
import styled from 'emotion'

// This returns a animation
const bounce = keyframes`
  from {
    transform: scale(1.01);
  }
  to {
    transform: scale(0.99);
  }
`

// You can use them in styled components or anything else
const AnimatedDiv = styled.div`
  animation: ${bounce} 0.2s infinite ease-in-out alternate;
`
```
