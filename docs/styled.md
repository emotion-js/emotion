---
title: "styled"
---
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

### Targeting another emotion component

Similar to the implementation in [styled-components](https://www.styled-components.com/docs/faqs#can-i-refer-to-other-components), emotion allows for a previously-defined emotion component to be targeted like a regular CSS selector when using the [babel plugin](./babel.md):

```jsx
const Child = styled.div`
  color: red;
`;

const Parent = styled.div`
  ${Child} {
    color: green;
  }
`;
```

This will generate a class selector something like:

```css
.css-{ParentDynamicHash} .css-{ChildStableHash}-{ChildComponentPositionInFile} { color: green; }
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
### Shorthand Style

Instead of using the function call syntax(`styled('div')`), you can use create components by using a property, where the property refers to an HTML tag(`styled.div`).

> **Note:**
> 
> `babel-plugin-emotion` is required for the styled shorthand


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

### withConfig is not a function error

This error is caused by using the shorthand syntax for styled such as `styled.div` without the Babel plugin. To fix this, [install `babel-plugin-emotion`](./babel)
