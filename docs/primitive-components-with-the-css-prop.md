---
title: 'Creating Primitive Components with the css prop'
---

While the styled API exists, we recommend using the css prop to create primitive components. This has a couple advantages which are explained below.

To create a simple primitive component, you can create a React component, apply the css prop and forward all the props like this.

```jsx live
/** @jsx jsx */
import { jsx } from '@emotion/core'

let Button = props => {
  return (
    <button
      css={{
        color: 'hotpink'
      }}
      {...props}
    />
  )
}

render(<Button>Do a thing!</Button>)
```

## Overriding styles on a primitive component using the css prop

```jsx live
/** @jsx jsx */
import { jsx } from '@emotion/core'

let Button = props => {
  return (
    <button
      css={{
        color: 'hotpink'
      }}
      {...props}
    />
  )
}

render(
  <Button
    css={{
      color: 'green'
    }}
  >
    Do a thing!
  </Button>
)
```

## Changing the element that's rendered

```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'

let Button = ({ as: Tag, ...props }, ref) => {
  return (
    <Tag
      css={{
        color: 'hotpink'
      }}
      ref={ref}
      {...props}
    />
  )
}

Button.defaultProps = {
  as: 'button'
}
```

## Forwarding Refs.

```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'

let Button = React.forwardRef((props, ref) => {
  return (
    <button
      css={{
        color: 'hotpink'
      }}
      ref={ref}
      {...props}
    />
  )
})
```

## Why?

While it might seen like a lot of boilerplate to this rather than using styled, it has a few advantages over styled.

- most components don't actually use refs or change the component that's rendered
- it forces you to think about when it makes sense to abstract styles into a component so it stops premature abstraction
- makes it easier to add things like extra props or any other logic to the inner component
- easier for people who don't know styled or etc. since it's a regular React component
