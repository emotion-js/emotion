### Extract Mode

The default settings enable css extraction.

- Extract mode requires css variables to function. If you need ie11 support use **inline mode**.
- If you have a client side rendered app that does not need ie11 support use **extract mode**.
- If you are SSR rendering we highly suggest using **inline mode** with `extractCritical`.

This js file, `h1.js`

```jsx harmony
import styled from 'emotion/react'

const H1 = styled('h1')`
  color: #ffd43b;
`
```

During babel compilation emotion will create `h1.emotion.css` and add `import './h1.emotion.css'` to the top of `h1.js`

```css
.css-H1-duiy4a {
  color: blue
}
```

`h1.js` after babel compilation

```jsx
import './h1.emotion.css'
import styled from 'emotion/react'

const H1 = styled('h1', 'css-H1-duiy4a')
```

**Browser Support** no ie11 support (css vars)