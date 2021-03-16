---
'@emotion/cache': patch
'@emotion/react': patch
'@emotion/styled': patch
---

Fixed an issue with styles containing a trailing css variable not being inserted correctly where the styled were optimized by our Babel plugin to a static opaque object.
