---
title: "Labels"
---

`css` accepts a css property called `label` that will be appended to the end of the class name so it's more readable. `babel-plugin-emotion`'s `autoLabel` option will add these labels automatically based on the variable name and other information so you don't need to manually specify them.

```jsx
// @live
import { css } from 'emotion'

const className = css`
  color: hotpink;
  label: some-name;
`

const anotherClassName = css({
  color: 'lightgreen',
  label: 'another-name'
})

render(
  <div>
    <div className={className}>{className}</div>
    <div className={anotherClassName}>
      {anotherClassName}
    </div>
  </div>
)
```
