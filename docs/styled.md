## Styled

`styled` accepts styles as a template literal, object, or function that returns an object.

### Styling elements and components
```jsx
import styled from 'react-emotion'
// simple element
const H1 = styled('h1')`
  color: blue;
  font-size: 48px;
  transform: scale(${props => props.scale});
`

function Greeting ({ name }) {
  // blue, 48px, and scaled 2x text
  return <H1 scale={2}>Hello {name}</H1> 
}

// Component
const H2 = styled(H1)`
  font-size: ${fontSize * 2/3}px;
  color: red;
`

function Greeting ({ name }) {
  return <H2>Hello {name}</H2> // red, 32px, and scaled 2x text
}

```
### Change the rendered tag using `withComponent`

This API was inspired by [styled-components' `withComponent`](https://www.styled-components.com/docs/api#withcomponent).

```jsx
// Creates a section element
const Content = styled('section')`
  background: #333;
`
// creates an aside element with the same styles as Content
const Sidebar = Content.withComponent('aside')

```

### pass refs down using innerRef

```jsx
const H1 = styled('h1')`
  color: red;
`

function Greeting ({ name }) {
  // will turn into to <h1 className="generated-className" ref={() => console.log('hello!')}>Hello {name}</h1>
  return <H1 innerRef={() => console.log('hello!')}>Hello {name}</H1>
}

```
## Shorthand Style
###### [requires babel plugin](babel.md)
The installation documentation can be found [here](install.md).

```jsx
import styled from 'react-emotion'

const H3 = styled.h3`
  font-size: ${fontSize * 1/3}px;
  color: red;
`
function Greeting ({ name }) {
  return <H3>Hello {name}</H3>
}
```

### Object styles
```jsx harmony
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
This API was inspired by [glamorous](https://github.com/paypal/glamorous).
