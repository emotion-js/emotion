---
title: 'The css Prop'
---

The primary way to style things in emotion is with the css prop, to use the css prop you need to import `jsx` from `@emotion/core` and set it as the jsx pragma by adding a comment like this `/** @jsx jsx */`

To pass string styles, you must use `css` which is exported by `@emotion/core`, it can be used as a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) like below.

> Note:
>
> `css` from `@emotion/core` is not like `css` from `emotion`. It returns an object that can be passed to the css prop, composed in other styles, used in `styled` or etc. It does **not** return a class name.

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

You can also pass objects directly to the css prop, for more usage with objects, look at [the object styles page](/docs/object-styles.md).

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
>
> The css prop is not compatible with `babel-plugin-transform-react-inline-elements`. If you include it in your `.babelrc` your styles won't be applied.
