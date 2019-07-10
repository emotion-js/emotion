---
title: 'Global Styles'
---

Sometimes you might want to insert global css like resets or font faces. You can use the `Global` component to do this. It accepts a `styles` prop which accepts the same values as the `css` prop except it inserts styles globally. Global styles are also removed when the styles change or when the Global component unmounts.

```jsx
// @live
import { Global, css } from '@emotion/core'

const globalStyles1 = css`
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  html {
    background-color: white;
  }
`

const globalStyles2 = {
  '*,*:before,*:after': {
    boxSizing: 'inherit',
    content: '"hi"'
  },
  html: {
    backgroundColor: 'white',
  },
  'ul, li': {
    backgroundColor: 'cornflowerblue',
  },
  a: {
    backgroundColor: 'lightsalmon',
  },
}

render(
  <div>
    <Global styles={globalStyles1} />
    <Global styles={globalStyles2} />
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
