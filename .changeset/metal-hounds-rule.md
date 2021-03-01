---
'@emotion/jest': patch
---

Fixed the Enzyme serializer to always print composed styles (for example using arrays), which are passed to the `css` prop, correctly.
