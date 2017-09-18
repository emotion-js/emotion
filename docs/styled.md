## Styled

The babel plugin is required in order to use the `styled` api. The installation documentation can be found [here](https://github.com/emotion-js/emotion/blob/master/docs/install.md).

```jsx
import styled from 'react-emotion'

const H1 = styled('h1')`
  color: blue;
  font-size: 48px;
  transform: scale(${props => props.scale});
`

function Greeting ({ name }) {
  return <H1 scale={2}>Hello {name}</H1> // blue, 48px, and scaled 2x text
}


// You can also pass components in

const H2 = styled(H1)`
  font-size: ${fontSize * 2/3}px;
  color: red;
`

function Greeting ({ name }) {
  return <H2>Hello {name}</H2> // red, 32px, and scaled 2x text
}

// this works too

const H3 = styled.h3`
  font-size: ${fontSize * 1/3}px;
  color: red;
`

function Greeting ({ name }) {
  return <H3>Hello {name}</H3> // red, 16px text
}

// You can also pass refs down using innerRef
const H1 = styled('h1')`
  color: red;
`

function Greeting ({ name }) {
  // will turn into to <h1 className="generated-className" ref={() => console.log('hello!')}>Hello {name}</h1>
  return <H1 innerRef={() => console.log('hello!')}>Hello {name}</H1>
}

```

### Objects as styles

`styled` can also take objects or a function that returns an object. This API was inspired by [glamorous](https://github.com/paypal/glamorous).

*The same caveats to using objects with css apply to this.*

```jsx
import styled from 'react-emotion'

const H1 = styled.h1({
  fontSize: 20
}, (props) => ({ color: props.color }))

const H2 = styled('h2')('some-other-class', {
  fontSize: '40px'
})

```
