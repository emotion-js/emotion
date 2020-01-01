---
'babel-plugin-emotion': major
'@emotion/babel-preset-css-prop': major
---

`autoLabel` option no longer is a simple boolean. Instead we accept now 3 values: `dev-only` (the default), `always` and `never`.

Each possible value for this option produces different output code:

- with `dev-only` we optimize the production code, so there are no labels added there, but at the same time we keep labels for development environments,
- with `always` we always add labels when possible,
- with `never` we disable this entirely and no labels are added.
