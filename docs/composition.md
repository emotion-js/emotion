---
title: 'Composition'
---

Composition is one of the most powerful and useful patterns in Emotion. You can compose styles together by interpolating value returned from `css` in another style block.

```jsx
// @live
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const base = css`
  color: hotpink;
`

render(
  <div
    css={css`
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

```jsx
// @live
render(
  <div>
    <style>
      {`
        .danger {
          color: red;
        }
        .base {
          background-color: lightgray;
          color: turquoise;
        }
      `}
      >
    </style>
    <p className="base danger">What color will this be?</p>
  </div>
)
```

With Emotion though, we can create styles and combine them

```jsx
// @live
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const danger = css`
  color: red;
`

const base = css`
  background-color: darkgreen;
  color: turquoise;
`

render(
  <div>
    <div css={base}>This will be turquoise</div>
    <div css={[danger, base]}>
      This will be also be turquoise since the base styles
      overwrite the danger styles.
    </div>
    <div css={[base, danger]}>This will be red</div>
  </div>
)
```

## Composing dynamic styles

## I FEEL LIKE THIS IS A REALLY SPECIFIC THING AND MORE NEEDS TO BE SAID ABOUT THE STUFF ABOVE

## ALSO, WE PROBABLY NEED A PLACE TO TALK ABOUT PATTERNS

You can also do dynamic composition based on props and use it in `styled`.

```jsx
// @live
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const dynamicStyle = props =>
  css`
    color: ${props.color};
  `

const Container = styled.div`
  ${dynamicStyle};
`
render(
  <Container color="lightgreen">
    This is lightgreen.
  </Container>
)
```

If you're composing lots of other styles and aren't using any string styles directly in the `styled` call, you can use the function call syntax to make it smaller.

```jsx
// @live
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const dynamicStyle = props =>
  css`
    color: ${props.color};
  `

const Container = styled.div(dynamicStyle)

render(
  <Container color="lightgreen">
    This is lightgreen.
  </Container>
)
```
