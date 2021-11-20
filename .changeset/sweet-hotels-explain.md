---
'@emotion/react': patch
---

Changed the implementation of the runtime label extraction in elements using the css prop (that only happens in development) to one that should yield more consistent results across browsers. This fixes some minor issues with React reporting hydration mismatches that wouldn't happen in production.
