---
title: "Introduction"
---

Emotion is a performant and flexible css-in-js library. It's inspired by many other css-in-js libraries like [glam](https://github.com/threepointone/glam/tree/e9bca3950f12503246ed7fccad5cf13e5e9c86e3), [glamor](https://github.com/threepointone/glamor), [styled-components](https://www.styled-components.com/) and [glamorous](https://glamorous.rocks/)

The examples in this documention use React but Emotion is not limited to React. The exceptions to this are react-emotion and preact-emotion that export the [styled API](https://emotion.sh/docs/styled), they require React and Preact respectively. Everything from the `emotion` package works with any other library or framework.

This documentation has lots of live examples that look like this, they're all editable so you can try emotion without installing it. Try changing the color below.

```jsx live
import { css } from 'emotion'

render(
  <div
    className={css`
      color: hotpink;
    `}
  >
    Some text.
  </div>
)
```
