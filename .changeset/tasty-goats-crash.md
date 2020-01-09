---
'@emotion/styled': patch
---

Fix `props.theme` type in styled component interpolation, this was `Theme | undefined` instead of `Theme`.
