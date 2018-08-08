---
title: "The css Prop"
---

The primary way to style things in emotion is with the css prop, to use the css prop you need to ...jsx comment

To pass string styles, you must use `css` which is exported by `@emotion/core`, it can be used as a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) like below.

```jsx
// @live
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const color = 'darkgreen'

render(
  <div
    css={css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `}
  >
    This has a hotpink background.
  </div>
)
```

You can also pass objects directly to the css prop, for more usage with objects, go [here](/docs/object-styles.md).

```jsx
// @live
/** @jsx jsx */
import { jsx } from '@emotion/core'

render(
  <div
    css={{
      backgroundColor: 'hotpink',
      '&:hover': {
        color: 'lightgreen'
      }
    }}
  >
    This has a hotpink background.
  </div>
)
```

> Note:

> The css prop is not compatible with `babel-plugin-transform-react-inline-elements`. If you include it in your `.babelrc` your styles won't be applied.
