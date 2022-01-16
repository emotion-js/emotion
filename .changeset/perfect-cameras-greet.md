---
'@emotion/react': patch
---

Added `@emotion/babel-plugin` as a dependency - this is an actual dependency of the `@emotion/react/macro` entrypoint and it has to be explicitly declared to fix compatibility with strict package managers.
