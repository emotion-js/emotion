## Nested Selectors

Sometimes you will want to nest selectors to target only elements inside the current class or React component. Here is an example of a simple element selector nested in the class generated with `css`:

```jsx
import { css } from 'emotion';

const paragraph = css`
  color: gray;

  a {
    border-bottom: 1px solid currentColor;
  }
`;
```

You can use `&` to select the current class nested in another element:

```jsx
const paragraph = css`
  color: gray;

  header & {
    color: black;
  }
`;
```

To nest a class selector using the class generated with `css` you can interpolate it but be aware than emotion merges styles from `css` together when composing so that class name may not always be there:

```jsx
const link = css`
  color: hotpink;
`;

const paragraph = css`
  color: gray;

  .${link} {
    border-bottom: 1px solid currentColor;
  }
`;
```

The result of `css` is a class name _without_ the dot (`.`), so we prepended it. 

Components created with styled can be interpolated in another component's styles to target that component

```jsx
import styled from 'react-emotion';

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
