---
title: "Object Styles"
---

Writing styles with objects is a powerful pattern built directly into the core
of emotion.

### Examples

#### With `css`

```jsx live
import { css } from 'emotion'

const className = css({ color: 'darkorchid' })
render(<div className={className}>This is darkorchid.</div>)
```

#### With `styled`

`styled` is a thin wrapper around `css` and accepts the same arguments. [More ways to use `styled` can be found it it's own doc](docs/styled#)

```jsx live
import styled from 'react-emotion'

const Button = styled('button')({ color: 'darkorchid' })
render(<Button>This is a darkorchid button.</Button>)
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
    This is darkorchid.<div className="name">This is orange</div>
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
    This is orange on a big screen and darkorchid on a small screen.
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
    height: 20
  }
)

render(
  <div className={className}>
    This is darkorchid with a hotpink background and a height of 20px.
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
    height: 20
  }
])

render(
  <div className={className}>
    This is darkorchid with a hotpink background and a height of 20px.
  </div>
)
```
