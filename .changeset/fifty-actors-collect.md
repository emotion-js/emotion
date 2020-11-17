---
'@emotion/react': patch
---

Fixed the latest tree-shakeability improvements by adding `"sideEffects": false` to all internal `package.json` files as well. This fixes [`hoist-non-react-statics`](https://github.com/mridgway/hoist-non-react-statics) not being dropped correctly despite of the latest improvements.
