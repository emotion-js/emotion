---
title: "Composition"
---

Composition is one of the most powerful and useful patterns in Emotion. You can compose styles together by interpolating the class name returned from `css` in another style block.

```jsx live
import { css } from 'emotion'

const base = css`
  color: hotpink;
`

render(
  <div
    className={css`
      ${base};
      background-color: #eee;
    `}
  >
    This is hotpink.
  </div>
)
```

With regular css, you can compose styles together using multiple class names but this is very limited because the order that they're defined is the order they'll be applied. This can lead to hacks with `!important` and such to apply the correct styles.

For example, we have some base styles and a danger style, we want the danger styles to have precedence over the base styles but because `base` is in the stylesheet after `danger` it has higher [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity). In regular CSS, you might do something to make `danger` have a higher specificity than `base` like move the `danger` class so it's more specific than `base`, use `!important` or abandon composition and rewrite the styles each time you need them.

```jsx live
import { css } from 'emotion'

const danger = css`
  color: red;
`

const base = css`
  background-color: lightgray;
  color: turquoise;
`

render(
  <div className={`${base} ${danger}`}>
    What color will this be?
  </div>
)
```

With Emotion though, it's much easier, all we have to change is add `css` before the template literal where we combine the classes and Emotion will use the styles that were passed to danger and base and merge them in the order that they're interpolated.

```jsx live
import { css } from 'emotion'

const danger = css`
  color: red;
`

const base = css`
  background-color: lightgray;
  color: turquoise;
`

render(
  <div className={css`${base} ${danger}`}>
    What color will this be?
  </div>
)
```

> Note:
> 
> This is just an example to demonstrate composition, for class name merging with emotion you should use [cx](/docs/cx.md).

## Composing dynamic styles

You can also do dynamic composition based on props and use it in `styled`.

```jsx live
import styled, { css } from 'react-emotion'

const dynamicStyle = props =>
  css`
    color: ${props.color};
  `

const Container = styled('div')`
  ${dynamicStyle};
`
render(
  <Container color="lightgreen">
    This is lightgreen.
  </Container>
)
```

If you're composing lots of other styles and aren't using any string styles directly in the `styled` call, you can use the function call syntax to make it smaller.

```jsx live
import styled, { css } from 'react-emotion'

const dynamicStyle = props =>
  css`
    color: ${props.color};
  `

const Container = styled('div')(dynamicStyle)

render(
  <Container color="lightgreen">
    This is lightgreen.
  </Container>
)
```
