---
title: 'Global Styles'
---

Sometimes it's useful to insert global css like resets or font faces. The `Global` component can be used for this. It accepts a `styles` prop which accepts the same values as the `css` prop except it inserts styles globally. Global styles are also removed when the styles change or when the Global component unmounts.

```jsx
// @live
import { Global, css } from '@emotion/core'

render(
  <div>
    <Global
      styles={css`
        * {
          color: hotpink !important;
        }
      `}
    />
    <Global
      styles={{
        '.some-class': {
          fontSize: 50,
          textAlign: 'center'
        }
      }}
    />
    <div className="some-class">
      Everything is hotpink now!
    </div>
  </div>
)
```
