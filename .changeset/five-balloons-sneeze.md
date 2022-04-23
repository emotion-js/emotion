---
'@emotion/cache': patch
'@emotion/sheet': patch
---

`@emotion/cache` and `@emotion/sheet` now allow `container` to be a `ShadowRoot`, or any other kind of `Node`. This change only affects the TypeScript types.
