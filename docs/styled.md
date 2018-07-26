---
title: "Styled Components"
---

`styled` is a way to create React or Preact components that have styles attached to them. It's available from [react-emotion](/packages/react-emotion) and [preact-emotion](/packages/preact-emotion). `styled` was heavily inspired by [styled-components](https://www.styled-components.com/) and [glamorous](https://glamorous.rocks/)

### Styling elements and components

`styled` is very similar to `css` except you call it with an html tag or React/Preact component and then call that with a template literal for string styles or a regular function call for object styles.

```jsx live
import styled from 'react-emotion'

const Button = styled('button')`
  color: turquoise;
`

render(<Button>This my button component.</Button>)
```

### Changing based on props

Any interpolations or arguments that are functions in `styled` are called with `props`, this allows you to change the styles of a component based on the props.

```jsx live
import styled from 'react-emotion'

const Button = styled('button')`
  color: ${props =>
    props.primary ? 'hotpink' : 'turquoise'};
`

const Container = styled('div')(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}))

render(
  <Container column>
    <Button>
      This is a regular button.
    </Button>
    <Button primary>
      This is a primary button.
    </Button>
  </Container>
)
```

### Styling any component

`styled` can style any component as long as it accepts a `className` prop.

```jsx live
import styled from 'react-emotion'
const Basic = ({ className }) => (
  <div className={className}>Some text</div>
)

const Fancy = styled(Basic)`
  color: hotpink;
`

render(<Fancy />)
```


### Change the rendered tag using `withComponent`

Sometimes you want to create some styles with one component but then use those styles again with another component, the `withComponent` method can be used for this. This was inspired by [styled-components' `withComponent`](https://www.styled-components.com/docs/api#withcomponent).

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

Similar to [styled-components](https://www.styled-components.com/docs/faqs#can-i-refer-to-other-components), emotion allows for emotion components to be targeted like regular CSS selectors when using [babel-plugin-emotion](/packages/babel-plugin-emotion.md).

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

Component selectors can also be used with object styles.

```jsx live
const Child = styled('div')({
  color: 'red'
})

const Parent = styled('div')({
  [Child]: {
    color: 'green'
  }
})

render(
  <div>
    <Parent>
      <Child>green</Child>
    </Parent>
    <Child>red</Child>
  </div>
)
```

### Pass refs down using `innerRef`

Sometimes you need to get a [ref](https://reactjs.org/docs/refs-and-the-dom.html) but passing `ref` to a styled component will return a ref to the styled component, not the component that it renders which is generally the one you want. You can pass `innerRef` instead of `ref` to get the ref of the component that styled renders.

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
      <Button onClick={handleClick}>
        Focus the text input
      </Button>
    </div>
  )
}
render(<TextInput />)
```

### Element Shorthand

> Note:

> `babel-plugin-emotion` is required for the element shorthand

Instead of using the function call syntax(`styled('div')`), you can use create components by using a property, where the property refers to an HTML tag(`styled.div`).

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

### Object styles

```jsx live
import styled from 'react-emotion'

const H1 = styled.h1(
  {
    fontSize: 20
  },
  props => ({ color: props.color })
)

render(
  <H1 color="lightgreen">
    This is lightgreen.
  </H1>
)
```

This API was inspired by [glamorous](https://github.com/paypal/glamorous).

### withConfig is not a function error

This error is caused by using the shorthand syntax for styled such as `styled.div` without the Babel plugin. To fix this, [install `babel-plugin-emotion`](/docs/babel.md)
