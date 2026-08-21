---
'@emotion/babel-plugin': major
---

Removed the `babel-plugin-macros` dependency by inlining the tiny part of it that was actually used (`createMacro`). This drops `cosmiconfig` and the vulnerable `yaml@1.x` ([GHSA-48c2-rrv3-qjmp](https://github.com/advisories/GHSA-48c2-rrv3-qjmp)) from `@emotion/babel-plugin`'s dependency tree. The exported macros remain fully compatible with `babel-plugin-macros`-based setups (such as Create React App) — `@emotion/react/macro` and friends keep working unchanged.
