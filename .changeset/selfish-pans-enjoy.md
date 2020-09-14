---
'@emotion/native': major
'@emotion/primitives': major
'@emotion/primitives-core': major
---

Functions are no longer accepted as values for the `style` prop. This unifies the behavior with the web version of Emotion as `style`'s equivalent is `className` prop and functions are not resolved for it.
