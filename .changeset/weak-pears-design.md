---
'@emotion/babel-preset-css-prop': major
---

Removed `runtime` option that has been introduced to this preset and deprecated shortly afther that. If you want to configure `runtime: "automatic"` just replace `@emotion/babel-preset-css-prop` with `@babel/preset-react` and `@emotion/babel-plugin`. You can find out how to configure things properly here: https://emotion.sh/docs/css-prop#babel-preset
