---
'@emotion/jest': minor
---

`createEnzymeSerializer` export has been removed from the root entrypoint and moved to a dedicated `@emotion/jest/enzyme` entrypoint. This is unfortunate because it could be considered a breaking change but it has been decided to treat this as a bug fix. It was never the intention to export this from the root entrypoint - `enzyme-to-json` has been marked as an optional peer dependency of `@emotion/jest` since the release and it was the package structure that did not match this expectation by mistake.
