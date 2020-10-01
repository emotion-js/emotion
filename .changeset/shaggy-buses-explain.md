---
'@emotion/jest': patch
---

Fixed an issue with serializing Enzyme's `ReactWrapper` (what is returned from `mount`) with props containing elements without the css prop.
