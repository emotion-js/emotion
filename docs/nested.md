## Nested Selectors

Sometimes you will want to nest selectors to target only elements inside the current class or React component. Here is an example of a simple element selector nested in the class generated with `css`:

```jsx
import { css } from 'emotion';

const paragraph = css`
  color: gray;

  & a {
    border-bottom: 1px solid currentColor;
  }
`;
```

For now, the `&` before the selector is required. You can also select the current class nested in another element:

```jsx
const paragraph = css`
  color: gray;

  header & {
    color: black;
  }
`;
```

To nest a class selector using the class generated with `css`, simply interpolate it:

```jsx
const link = css`
  color: hotpink;
`;

const paragraph = css`
  color: gray;

  & .${link} {
    border-bottom: 1px solid currentColor;
  }
`;
```

The result of `css` is a class name _without_ the dot (`.`), so we prepended it.

Similarly, in React you can nest component selectors using interpolation:

```jsx
import styled from 'emotion/react';

const Link = styled.a`
  color: hotpink;
`;

const Paragraph = styled.p`
  color: gray;

  ${Link} {
    border-bottom: 1px solid currentColor;
  }
`
```

Only in the case of component selectors you should omit the `&`.
