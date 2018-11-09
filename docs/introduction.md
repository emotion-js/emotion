---
title: 'Introduction'
---

Emotion is a performant and flexible CSS-in-JS library. It's inspired by many other CSS-in-JS libraries like [glam](https://github.com/threepointone/glam/tree/e9bca3950f12503246ed7fccad5cf13e5e9c86e3), [glamor](https://github.com/threepointone/glamor), [styled-components](https://www.styled-components.com/) and [glamorous](https://glamorous.rocks/). It allows you to style applications quickly with string styles or object styles. It has predictable composition to avoid specificity issues with CSS. With source maps and labels, Emotion has a great developer experience and great performance with heavy caching and insertRule in production.

Emotion has two main versions, a version specific to React and a vanilla version that is usable without React. Most of the documentation focuses on the React-specific version but most of the concepts taught in the React-specific version also apply to the vanilla version. The vanilla version of Emotion also works with React but the React-specific version has many extra useful features that aren't possible in the vanilla version such as zero-config server-side-rendering and theming so it's recommended to use the React-specific version if you're using React.

This documentation has lots of live examples that look like this, they're all editable so you can try emotion without installing it. Try changing the color below!

```jsx
// @live
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

render(
  <div
    css={css`
      color: hotpink;
    `}
  >
    Some text.
  </div>
)
```
