---
'@emotion/serialize': patch
'@emotion/styled': patch
'@emotion/cache': patch
'@emotion/utils': patch
'@emotion/css': patch
'@emotion/react': patch
'@emotion/babel-plugin': patch
---

Fix inconsistent hashes using development vs production bundles/`exports` conditions when using `@emotion/babel-plugin` with `sourceMap: true` (the default). This is particularly visible when using Emotion with the Next.js Pages router where the `development` condition is used when bundling code but when when importing external code with Node.js.
