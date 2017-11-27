## Object Styles

Writing styles with objects is a powerful pattern built directly into the core of emotion.

### Examples

#### With `css`

```javascript
import { css } from 'emotion'

const className = css({ color: 'darkorchid' })
```


#### With `styled`

`styled` is a thin wrapper around `css` and accepts the same arguments.

```javascript
import styled from 'react-emotion'

const A = styled('a')({ color: 'darkorchid' })
```



### Child Selectors

```javascript
import { css } from 'emotion'

const className = css({
  color: 'darkorchid',
  '& .name': {
    color: 'orange'
  }
})
```

### Media Queries

```javascript
import { css } from 'emotion'

const className = css({
  color: 'darkorchid',
  '@media(min-width: 420px)': {
    color: 'orange'
  }
})
```

### Multiple Arguments

```javascript
import { css } from 'emotion'

const className = css({
  color: 'darkorchid'
}, {
  backgroundColor: 'hotpink'
}, {
  height: 20
})
```

### Arrays

Nested arrays are flattened.

```javascript
import { css } from 'emotion'

const className = css([{
  color: 'darkorchid'
}, {
  backgroundColor: 'hotpink'
}, {
  height: 20
}])
```
