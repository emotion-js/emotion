---
title: "Object Styles"
---

Writing styles with objects is a powerful pattern built directly into the core
of emotion. Instead of writing css properties in kebab-case like regular css, you write them in camelCase.

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

`styled` is a thin wrapper around `css` and accepts the same arguments. [More ways to use `styled` can be found it it's own doc](docs/styled)

```jsx live
import styled from 'react-emotion'

const Button = styled('button')({
  color: 'darkorchid'
})

render(
  <Button>
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
