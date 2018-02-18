---
title: "Object Styles"
---

Writing styles with objects is a powerful pattern built directly into the core of emotion. Instead of writing css properties in `kebab-case` like regular css, you write them in `camelCase`, for example `background-color` would be `backgroundColor`. Object styles work with all functions that accept string styles. (`css`, `styled`, `keyframes` and `injectGlobal`)

### Examples

#### With `css`

```jsx live
import { css } from 'emotion'

const className = css({
  color: 'darkorchid',
  backgroundColor: 'lightgray'
})

render(
  <div className={className}>
    This is darkorchid.
  </div>
)
```

#### With `styled`

`styled` is a thin wrapper around `css` and accepts the same arguments. [More ways to use `styled` can be found here](/docs/styled.md).

```jsx live
import styled from 'react-emotion'

const Button = styled('button')({
  color: 'darkorchid'
}, (props) => ({
  fontSize: props.fontSize
}))

render(
  <Button fontSize={16}>
    This is a darkorchid button.
  </Button>
)
```

### Child Selectors

```jsx live
import { css } from 'emotion'

const className = css({
  color: 'darkorchid',
  '& .name': {
    color: 'orange'
  }
})

render(
  <div className={className}>
    This is darkorchid.<div className="name">
      This is orange
    </div>
  </div>
)
```

### Media Queries

```jsx live
import { css } from 'emotion'

const className = css({
  color: 'darkorchid',
  '@media(min-width: 420px)': {
    color: 'orange'
  }
})

render(
  <div className={className}>
    This is orange on a big screen and
    darkorchid on a small screen.
  </div>
)
```

### Numbers

When numbers are the value of a css property, `px` is appended to the number unless it is a css property that is unitless.

```jsx live
import { css } from 'emotion'

const className = css({
  padding: 8,
  zIndex: 200
})

render(
  <div className={className}>
    This has 8px of padding and a
    z-index of 200.
  </div>
)
```

### Multiple Arguments

```jsx live
import { css } from 'emotion'

const className = css(
  {
    color: 'darkorchid'
  },
  {
    backgroundColor: 'hotpink'
  },
  {
    padding: 8
  }
)

render(
  <div className={className}>
    This is darkorchid with a hotpink background
    and 8px of padding.
  </div>
)
```

### Arrays

Nested arrays are flattened.

```jsx live
import { css } from 'emotion'

const className = css([
  {
    color: 'darkorchid'
  },
  {
    backgroundColor: 'hotpink'
  },
  {
    padding: 8
  }
])

render(
  <div className={className}>
    This is darkorchid with a hotpink background
    and 8px of padding.
  </div>
)
```

### Composition

[Learn more composition in Emotion](/docs/composition.md).

```jsx live
import { css } from 'emotion'

const hotpink = css({
  color: 'hotpink'
})

const hotpinkHoverOrFocus = css({
  ':hover,:focus': hotpink
})

const hotpinkWithBlackBackground = css(
  {
    backgroundColor: 'black',
    color: 'green'
  },
  hotpink,
)

render(
  <div>
    <p className={hotpink}>
      This is hotpink
    </p>
    <button
      className={hotpinkHoverOrFocus}>
      This is hotpink on hover or focus
    </button>
    <p
      className={
        hotpinkWithBlackBackground
      }>
      This has a black background and
      is hotpink. Try moving where
      hotpink is in the css call and
      see if the color changes.
    </p>
  </div>
)
```
