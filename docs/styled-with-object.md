## Objects With styled

`styled` can also take objects or a function that returns an object. This API was inspired by [glamorous](https://github.com/paypal/glamorous).

*The same caveats to using objects with css apply to this.*

```jsx harmony
import styled from 'react-emotion'

const H1 = styled.h1(
  {
    fontSize: 20
  },
  (props) => ({ color: props.color })
)

const H2 = styled('h2')(
  'some-other-class',
  { fontSize: '40px' }
)

```
