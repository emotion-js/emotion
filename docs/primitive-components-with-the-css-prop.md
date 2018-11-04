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

While this might seem like a lot of boilerplate to this rather than using styled, it has a few advantages over styled.

- It forces you to think about when it makes sense to abstract styles into a component and when it doesn't make sense. This also means that you're less likely to have to make up names for things when they can just be inline.
- There aren't any problems with prop filtering. styled uses a list of props that can be passed to the native DOM elements which causes some unnecessary props to be forwarded to the DOM which can bloat SSR payloads. By creating components yourself, you can use the object rest syntax to choose which props to forward.
- It's easier for people who don't know how styled or etc. works since it's a regular React component.
