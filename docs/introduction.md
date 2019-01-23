---
title: 'Introduction'
---

Emotion is a lightweight library designed for writing styles in JavaScript, enabling powerful and predictable style composition using both string and object styles. It also provides a great developer experience with features such as source maps, labels, and testing utilities.

---

There are two primary methods of using Emotion. The first is framework agnostic and the second is for use with React.

### Framework Agnostic

```bash
npm i emotion
```

**[`emotion` documentation](/docs/emotion)**

The [emotion](https://www.npmjs.com/package/emotion) package is framework agnostic and the simplest way to use Emotion.

- Requires no additional setup, babel plugin, or other config changes.

- Works in situations where configuration is restricted or not possible such as with [Create React App](https://facebook.github.io/create-react-app)

- The `css` prop is not used or needed.

- You simply prefer to use the `css` function to generate class names and `cx` to compose them.

```jsx
// @live
import { css, cx } from 'emotion'

const color = 'darkgreen'

render(
  <div
    className={css`
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

### React

```bash
npm i @emotion/core
```

The ["@emotion/core"](https://www.npmjs.com/package/@emotion/core) package requires React and is recommended for users of that framework if possible.\

- Best when using React with a build environment that can be configured.

- CSS prop support

  - Simliar to the `style` prop but adds support for nested selectors, media queries, and auto-prefixing.

  - Allows developers to skip the `styled` api abstraction and style components and elements directly.

  - The `css` prop also accepts a function that is called with your theme as an argument allowing developers easy access to common and customizable values.

  - Reduces boilerplate when composing components and styled with emotion.

- Server side rendering with zero configuration.

- Theming works out of the box.

- ESlint plugins available to ensure proper patterns and configuration are set.

**[`@emotion/core` css prop documentation](/docs/css-prop.md)**

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

```bash
npm i @emotion/styled
```

The [@emotion/styled](https://www.npmjs.com/package/@emotion/styled) package is for those who prefer to use the `styled.div` style API for creating components.

**[`@emotion/styled` documentation](/docs/styled.md)**

```jsx
// @live
import styled from '@emotion/styled'

const Button = styled.button`
  color: turquoise;
`

render(<Button>This my button component.</Button>)
```

### Libraries that Inspired Us

- [glam](https://github.com/threepointone/glam/tree/e9bca3950f12503246ed7fccad5cf13e5e9c86e3)
- [glamor](https://github.com/threepointone/glamor)
- [styled-components](https://www.styled-components.com/)
- [glamorous](https://glamorous.rocks)
