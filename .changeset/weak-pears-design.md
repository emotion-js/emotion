---
'@emotion/babel-preset-css-prop': major
---

Removed `runtime` option that was introduced to this preset and deprecated shortly after that. If you want to configure `runtime: "automatic"`, replace `@emotion/babel-preset-css-prop` with `@babel/preset-react` and `@emotion/babel-plugin`. You can find out how to configure things properly here: https://emotion.sh/docs/css-prop#babel-preset
