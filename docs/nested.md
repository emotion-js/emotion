---
title: "Nested Selectors"
---

Sometimes it's useful to nest selectors to target elements inside the current class or React component. Here is an example of a simple element selector nested in the class generated with `css`:

```jsx live
import { css } from 'emotion'

const paragraph = css`
  color: turquoise;

  a {
    border-bottom: 1px solid currentColor;
  }
`
render(
  <p className={paragraph}>
    Some text. <a>
      A link with a bottom border.
    </a>
  </p>
)
```

You can use `&` to select the current class nested in another element:

```jsx live
import { css } from 'emotion'

const paragraph = css`
  color: turquoise;

  header & {
    color: green;
  }
`
render(
  <div>
    <header>
      <p className={paragraph}>
        This is green since it's inside a
        header
      </p>
    </header>
    <p className={paragraph}>
      This is turquoise since it's not inside a
      header.
    </p>
  </div>
)
```

To nest a class selector using the class generated with `css` you can interpolate it but this is **strongly** recommended against and should only be used in rare circumstances because it will break when used with [composition](/docs/composition.md).

```jsx live
import { css } from 'emotion'

const link = css`
  color: hotpink;
`

const paragraph = css`
  color: gray;

  .${link} {
    border-bottom: 1px solid currentColor;
  }
`
render(
  <div>
    <p className={paragraph}>
      Some text with a
      <a className={link}> link</a>.
    </p>
  </div>
)
```
