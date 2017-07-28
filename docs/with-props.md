## Usage with recompose's withProps

You can pass additional props to your components using recompose's `withProps` higher-order component. The `withProps` api is laid out [here](https://github.com/acdlite/recompose/blob/master/docs/API.md#withprops).

```js
import withProps from 'recompose/withProps'

const RedPasswordInput = withProps({ type: 'password' })(styled('input')`
  background-color: red;
`);
```
