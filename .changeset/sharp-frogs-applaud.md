---
'@emotion/css': major
---

Removed support for interpolating class names returned from `css`, so this will no longer be possible:

```js
const cls1 = css`
  color: blue;
`
const cls2 = css`
  & .${cls1} {
    color: red;
  }
`
```

This has already been deprecated for the lifetime of v10.
