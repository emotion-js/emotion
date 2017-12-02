---
title: "styled"
---

`styled` accepts styles as a template literal, object, or function that returns
an object.

### Styling elements and components

```jsx
import styled from 'react-emotion'
// simple element
const H1 = styled('h1')`
  color: blue;
  font-size: 48px;
  transform: scale(${props => props.scale});
`

function Greeting({ name }) {
  // blue, 48px, and scaled 2x text
  return <H1 scale={2}>Hello {name}</H1>
}

// Component
const H2 = styled(H1)`
  font-size: ${fontSize * 2 / 3}px;
  color: red;
`

function Greeting({ name }) {
  return <H2>Hello {name}</H2> // red, 32px, and scaled 2x text
}
```

### Change the rendered tag using `withComponent`

Sometimes you want to create some styles with one component but then use those
styles again with another component, the `withComponent` method can be used for
this. This API was inspired by
[styled-components' `withComponent`](https://www.styled-components.com/docs/api#withcomponent).

```jsx live
// Create a section element
const Section = styled('section')`
  background: #333;
`
// Create an aside element with the same styles as Section
const Aside = Section.withComponent('aside')
render(
  <div>
    <Section>This is a section</Section>
    <Aside>This is an an aside</Aside>
  </div>
)
```

### Targeting another emotion component

Similar to
[styled-components](https://www.styled-components.com/docs/faqs#can-i-refer-to-other-components),emotion
allows for previously-defined emotion components to be targeted like regular CSS
selectors when using [babel-plugin-emotion](./babel):

```jsx live
const Child = styled('div')`
  color: red;
`

const Parent = styled('div')`
  ${Child} {
    color: green;
  }
`
render(
  <div>
    <Parent>
      <Child>green</Child>
    </Parent>
    <Child>red</Child>
  </div>
)
```

This will generate a css rule something like this:

```css
.css-{ParentDynamicHash} .css-{ChildStableHash} { color: green; }
```

### Pass refs down using `innerRef`

Sometimes you need to get a
[ref](https://reactjs.org/docs/refs-and-the-dom.html) but passing `ref` to a
styled component will return a ref to the styled component, not the component
that it renders which is generally the one you want. You can pass `innerRef`
instead of `ref` to get the ref of the component that styled renders.

```jsx live
const Input = styled('input')`
  color: hotpink;
`

const Button = styled('button')`
  color: green;
`

function TextInput(props) {
  let textInput = null
  function handleClick() {
    textInput.focus()
  }
  return (
    <div>
      <Input
        innerRef={input => {
          textInput = input
        }}
      />
      <Button onClick={handleClick}>Focus the text input</Button>
    </div>
  )
}
render(<TextInput />)
```

### Shorthand Style

Instead of using the function call syntax(`styled('div')`), you can use create
components by using a property, where the property refers to an HTML
tag(`styled.div`).

```jsx live
const DivWithoutShorthand = styled('div')`
  color: green;
`

const DivWithShorthand = styled.div`
  color: hotpink;
`

render(
  <DivWithoutShorthand>
    This is green. <DivWithShorthand>This is hotpink.</DivWithShorthand>
  </DivWithoutShorthand>
)
```

> **Note:**
>
> `babel-plugin-emotion` is required for the styled shorthand

```jsx
import styled from 'react-emotion'

const H3 = styled.h3`
  font-size: ${fontSize * 1 / 3}px;
  color: red;
`
function Greeting({ name }) {
  return <H3>Hello {name}</H3>
}
```

### Object styles

```jsx
import styled from 'react-emotion'

const H1 = styled.h1(
  {
    fontSize: 20
  },
  props => ({ color: props.color })
)

const H2 = styled(H1)({ fontSize: '40px' })
```

This API was inspired by [glamorous](https://github.com/paypal/glamorous).

### withConfig is not a function error

This error is caused by using the shorthand syntax for styled such as
`styled.div` without the Babel plugin. To fix this,
[install `babel-plugin-emotion`](./babel)
