---
'@emotion/css': patch
---

Added `speedy` method to the TS type declaration of the `sheet` object available on Emotion instances. In addition to that - `StyleSheet` type is no longer exported from this package and instead `CSSStyleSheet` is available now. The `StyleSheet` type might still be imported from `@emotion/sheet`, but it has no `speedy` method and thus it's not the same as what is available in this package as `CSSStyleSheet`.
