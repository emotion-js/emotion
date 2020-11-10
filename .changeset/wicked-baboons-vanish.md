---
'@emotion/babel-preset-css-prop': patch
---

Only use `'@babel/plugin-transform-react-jsx-development'` based on the `development` option when `runtime` is set to `"automatic"`. The classic runtime is not compatible with this plugin.
