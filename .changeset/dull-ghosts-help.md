---
'@emotion/core': patch
---

Fixed an issue with React giving warning about static children not having unique keys when using the classic `jsx` factory. This example illustrates the situation in which this has been incorrectly happening:

```js
<div css={{ color: 'hotpink' }}>
  <div />
  <div />
</div>
```
