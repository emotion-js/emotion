---
'@emotion/babel-plugin': patch
---

Keep interpolations in their source position relative to nested rules when minifying, so a nested interpolation written after a nested rule is no longer moved before it.
