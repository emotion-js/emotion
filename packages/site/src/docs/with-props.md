---
title: "Usage with recompose's withProps"
---

You can pass additional props to your components using recompose's `withProps` higher-order component. 

**[`withProps` documentation](https://github.com/acdlite/recompose/blob/master/docs/API.md#withprops)**

```jsx
import withProps from 'recompose/withProps'

const RedPasswordInput = withProps({ type: 'password' })(styled('input')`
  background-color: red;
`);
```
