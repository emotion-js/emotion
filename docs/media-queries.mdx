---
title: 'Media Queries'
---

Using media queries in emotion works just like using media queries in regular css except you don't have to specify a selector inside the block, you can put your css directly in the css block.

```jsx
// @live
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

render(
  <p
    css={css`
      font-size: 30px;
      @media (min-width: 420px) {
        font-size: 50px;
      }
    `}
  >
    Some text!
  </p>
)
```

## Reusable Media Queries

Media queries can be useful to create responsive apps but repeating them is annoying and can lead to inconsistencies. Instead of rewriting them each time you use them, you can move them into constants and refer to the variable each time you want to use them like this.

```jsx
// @live
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
)

render(
  <div>
    <div
      css={{
        color: 'green',
        [mq[0]]: {
          color: 'gray'
        },
        [mq[1]]: {
          color: 'hotpink'
        }
      }}
    >
      Some text!
    </div>
    <p
      css={css`
        color: green;
        ${mq[0]} {
          color: gray;
        }
        ${mq[1]} {
          color: hotpink;
        }
      `}
    >
      Some other text!
    </p>
  </div>
)
```

### facepaint

While defining media queries in constants is much easier than rewriting media queries each time, they're still quite verbose since you usually want to change the same property at different breakpoints. [facepaint](https://github.com/emotion-js/facepaint) makes this easier by allowing you to define what each css property should be at each media query as an array.

> Note:
>
> `facepaint` only works with object styles.

```bash
yarn add facepaint
# or if you use npm
npm install --save facepaint
```

```jsx
// @live
/** @jsx jsx */
import { jsx } from '@emotion/core'
import facepaint from 'facepaint'

const breakpoints = [576, 768, 992, 1200]

const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`)
)

render(
  <div
    css={mq({
      color: ['green', 'gray', 'hotpink']
    })}
  >
    Some text.
  </div>
)
```
