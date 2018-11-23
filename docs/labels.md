---
title: 'Labels'
---

Emotion adds a css property called `label`, the value of it is appended to the end of the class name, so it's more readable than a hash. `babel-plugin-emotion` adds these labels automatically based on the variable name and other information, so they don't need to be manually specified.

```jsx
// @live
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

let style = css`
  color: hotpink;
  label: some-name;
`

let anotherStyle = css({
  color: 'lightgreen',
  label: 'another-name'
})

let ShowClassName = ({ className }) => (
  <div className={className}>{className}</div>
)

render(
  <div>
    <ShowClassName css={style} />
    <ShowClassName css={anotherStyle} />
  </div>
)
```
