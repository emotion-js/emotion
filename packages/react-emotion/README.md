# react-emotion

> The styled API for emotion and react

`react-emotion` exports `styled` which allows you to use emotion to create React components that have styles attached to them, it also exports all of `emotion`'s exports.

For more documentation on `styled`, [read about it and try it out in the `styled` docs](https://emotion.sh/docs/styled)

```bash
npm install --save emotion react-emotion
```

```jsx live
import styled, { css } from 'react-emotion'
const SomeComponent = styled('div')`
  display: flex;
  background-color: ${props => props.color};
`

const AnotherComponent = styled('h1')(
  {
    color: 'hotpink'
  },
  props => ({ flex: props.flex })
)

render(
  <SomeComponent color="#DA70D6">
    <AnotherComponent flex={1}>
      Some text.
    </AnotherComponent>
  </SomeComponent>
)
```