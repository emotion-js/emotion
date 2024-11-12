---
'@emotion/serialize': patch
'@emotion/styled': patch
'@emotion/cache': patch
'@emotion/utils': patch
'@emotion/css': patch
'@emotion/react': patch
'@emotion/babel-plugin': patch
---

Fix inconsistent hashes using development vs production bundles/`exports` conditions when using `@emotion/babel-plugin` with `sourceMap: true` (the default).
