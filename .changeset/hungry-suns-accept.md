---
'@emotion/react': patch
---

Improved tree-shakeability of the package. The main benefit is that bundlers should be able now to drop [`hoist-non-react-statics`](https://github.com/mridgway/hoist-non-react-statics) if you don't actually use our `withTheme` export.
