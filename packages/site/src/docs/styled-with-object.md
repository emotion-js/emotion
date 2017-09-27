---
title: "Objects With styled"
---

`styled` can also take objects or a function that returns an object. This API was inspired by [glamorous](https://github.com/paypal/glamorous).

```jsx
import styled from 'react-emotion'

const H1 = styled.h1(
  {
    fontSize: 20
  },
  (props) => ({ color: props.color })
)

const H2 = styled(H1)(
  { fontSize: '40px' }
)

```
