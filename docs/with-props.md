---
title: "Attaching Props"
---

Sometimes it's useful to create components that already have props applied, like the example below with a password input. You use recompose's `withProps`
higher-order component to do this.

**[`withProps` documentation](https://github.com/acdlite/recompose/blob/master/docs/API.md#withprops)**

```jsx live
import withProps from 'recompose/withProps'

const RedPasswordInput = withProps({ type: 'password' })(styled('input')`
  background-color: red;
`)

render(<RedPasswordInput />)
```
