---
'@emotion/serialize': patch
---

Make `ArrayInterpolation` to extend `ReadonlyArray` to match a similar recent change to `ArrayCSSInterpolation`. It fixes some compatibility issues when those 2 get mixed together.
