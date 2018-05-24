---
title: "Attaching Props"
---

Sometimes it's useful to create components that already have props applied, like the example below with a checkbox. You can use `.withProps` to do this. `this.props` is merged with and overwrites any overlapping keys from `withProps` except for classNames from withProps which are merged.

```jsx live
import styled from 'react-emotion'

const MyCheckbox = styled('input')`
  height: 40px;
  width: 40px;
  color: green;
`.withProps({
  type: 'checkbox'
})

render(<MyCheckbox />)
```

`withProps` also accepts a function that recieves props.

```jsx live
import styled from 'react-emotion'

const Input = styled('input')`
  background-color: ${props => props.password && 'red'};
`.withProps(
  props => (props.password ? { type: 'password' } : {})
)

render(<RedPasswordInput />)
```
