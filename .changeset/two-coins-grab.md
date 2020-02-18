---
'@emotion/babel-plugin-jsx-pragmatic': minor
'@emotion/babel-preset-css-prop': minor
---

Add new option, `fragment`, to automatically import React when shorthand fragments are used. Previously, using a shorthand fragment would cause `React.Fragment` to be used in the output, but this could cause a runtime error if React was not manually imported.
