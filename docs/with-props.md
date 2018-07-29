---
title: "Attaching Props"
---

Sometimes it's useful to create components that already have props applied, like the example below with a password input. You use recompose's `withProps` higher-order component to do this.

**[`withProps` documentation](https://github.com/acdlite/recompose/blob/master/docs/API.md#withprops)**

```jsx live
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'

const RedPasswordInput = withProps({
  type: 'password'
})(styled('input')`
  background-color: red;
`)

render(<RedPasswordInput />)
```

Alternatively, you can use the css prop and create a regular component like this.

```jsx live
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const RedPasswordInput = props => (
  <input
    type="password"
    css={css`
      background-color: red;
    `}
    {...props}
  />
)

render(<RedPasswordInput />)
```
