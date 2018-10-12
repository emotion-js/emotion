---
title: 'Styled Components'
---

`styled` is a way to create React components that have styles attached to them. It's available from [@emotion/styled](/packages/@emotion/styled). `styled` was heavily inspired by [styled-components](https://www.styled-components.com/) and [glamorous](https://glamorous.rocks/)

### Styling elements and components

`styled` is very similar to `css` except you call it with an html tag or React component and then call that with a template literal for string styles or a regular function call for object styles.

```jsx
// @live
import styled from '@emotion/styled'

const Button = styled.button`
  color: turquoise;
`

render(<Button>This my button component.</Button>)
```

### Changing based on props

Any interpolations or arguments that are functions in `styled` are called with `props`, this allows you to change the styles of a component based on the props.

```jsx
// @live
import styled from '@emotion/styled'

const Button = styled.button`
  color: ${props =>
    props.primary ? 'hotpink' : 'turquoise'};
`

const Container = styled.div(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}))

render(
  <Container column>
    <Button>This is a regular button.</Button>
    <Button primary>This is a primary button.</Button>
  </Container>
)
```

### Styling any component

`styled` can style any component as long as it accepts a `className` prop.

```jsx
// @live
import styled from '@emotion/styled'
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

```jsx
// @live
import styled from '@emotion/styled'

const Section = styled.section`
  background: #333;
`
// this component has the same styles as Section but it renders an aside
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

```jsx
// @live
import styled from '@emotion/styled'

const Child = styled.div`
  color: red;
`

const Parent = styled.div`
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

```jsx
// @live
import styled from '@emotion/styled'

const Child = styled.div({
  color: 'red'
})

const Parent = styled.div({
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

### Object styles

```jsx
// @live
import styled from '@emotion/styled'

const H1 = styled.h1(
  {
    fontSize: 20
  },
  props => ({ color: props.color })
)

render(<H1 color="lightgreen">This is lightgreen.</H1>)
```

This API was inspired by [glamorous](https://github.com/paypal/glamorous). ❤️

### Customizing prop forwarding

By default, Emotion will pass all props to custom components and only props that are valid html attributes for string tags. This is can be customized by passing a custom `shouldForwardProp` function. You can also use `@emotion/is-prop-valid` to filter out props that are not valid as html attributes, it is what emotion uses internally.

```jsx
// @live
import isPropValid from '@emotion/is-prop-valid'
import styled from '@emotion/styled'

const H1 = styled('h1', {
  shouldForwardProp: prop =>
    isPropValid(prop) && prop !== 'color'
})(props => ({
  color: 'hotpink'
}))

render(<H1 color="lightgreen">This is lightgreen.</H1>)
```
