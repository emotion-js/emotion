---
title: 'Attaching Props'
---

Some css-in-js libraries offer APIs to attach props to components, instead of having our own API to do that, we recommend creating a regular react component, using the css prop and attaching props like you would with any other React component.

```jsx
// @live
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
