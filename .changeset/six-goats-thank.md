---
'@emotion/babel-preset-css-prop': minor
---

`runtime` option has been deprecated. It still works and will continue to work in Emotion 10 but we have found out that including JSX plugin twice in the Babel configuration leads to hard to debug problems and it's not always obvious that some presets include it. If you want to configure `runtime: "automatic"` just replace `@emotion/babel-preset-css-prop` with `@babel/preset-react` and `babel-plugin-emotion`. You can find out how to configure things properly here: https://emotion.sh/docs/css-prop#babel-preset
