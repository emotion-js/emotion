---
'@emotion/jest': patch
---

Added support for handling regular React **elements** (objects returned from `React.createElement`) in the serializer and `toHaveStyleRule` matcher. It's possible to get those elements when traversing Enzyme's trees.
