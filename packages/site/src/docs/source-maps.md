---
title: "Source Maps"
---

**babel plugin required**

emotion supports source maps for styles authored in javascript. 

<div style='max-height: 480px;'>

![source-map-demo](https://user-images.githubusercontent.com/662750/30778580-78fbeae4-a096-11e7-82e1-120b6984e875.gif)

</div>

Required For Source Maps:
1. `babel-plugin-emotion` must be in your Babel setup. [[documentation]](https://github.com/emotion-js/emotion/blob/master/docs/install.md)
2. `process.env.NODE_ENV` must be any value except `"production"`

--- 

**We do not advise using sourceMaps in production. The source maps can add significant size to your bundle.**

**Babel setup**

**.babelrc**
```json
{
  "plugins": [
    ["emotion", { "sourceMap": true }]
  ]
}
```

**Recommended Setup** 

Use [Babel's `env` property](https://babeljs.io/docs/usage/babelrc/#env-option) and only set source maps in your development environment.

**.babelrc**
```json
{
  "env": {
    "production": {
      "plugins": [["emotion", { "sourceMap": false }]]
    },
    "development": {
      "plugins": [["emotion", { "sourceMap": true }]]
    }
  }
}
```
