---
'@emotion/styled': patch
---

`as` prop has been removed from TypeScript declarations for composite components. This prop has not actually been handled by default by `styled` for those components - to make `styled` handle it you need to provide a custom `shouldForwardProp` that doesn't forward the `as` prop.
