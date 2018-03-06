---
title: "Introduction"
---
Emotion is a performant and flexible CSS-in-JS library. It's inspired by many other CSS-in-JS libraries like [glam](https://github.com/threepointone/glam/tree/e9bca3950f12503246ed7fccad5cf13e5e9c86e3), [glamor](https://github.com/threepointone/glamor), [styled-components](https://www.styled-components.com/) and [glamorous](https://glamorous.rocks/). It allows you to style applications quickly with string styles or object styles. It has predictable composition to avoid specificity issues with CSS. With source maps and labels, Emotion has a great developer experience and great performance with heavy caching and insertRule in production.

The examples in this documention use React but Emotion is not limited to React. The exceptions to this are react-emotion and preact-emotion that export [`styled`](/docs/styled.md), they require React and Preact respectively. Everything from the `emotion` package works with any library or framework.

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
