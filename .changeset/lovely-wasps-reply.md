---
'@emotion/babel-plugin': patch
---

Fixed an issue in our tagged template expressions minifier which has caused whitespace before nested orphaned pseudo selectors being incorrectly removed. In a selector like `& :hover` the whitespace before colon has a semantic meaning and needs to be preserved.
