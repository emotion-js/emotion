---
'@emotion/react': patch
---

Change `Global` component to use the `StyleSheet` constructor of the current `cache.sheet`. This is useful when `cache.sheet` is not the default implementation. Thanks to that the inner sheet constructed by `Global` can share the behavior with its "main" sheet that is hold by the `cache`.
