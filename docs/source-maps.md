## Source Maps

**babel plugin required**

emotion supports source maps for styles authored in javascript. 

[gif]

Required For Source Maps:
1. `babel-plugin-emotion` must be in your Babel setup. [documentation](https://github.com/emotion-js/emotion/blob/master/docs/install.md)
2. `process.env.NODE_ENV` must be any value except `"production"`


**We do not advise using sourceMaps in production. The source maps can add significant size to your bundle.**

--- 

**Babel setup**

**.babelrc**
```json
{
  "plugins": [
    ["emotion", { sourceMap: true }]
  ]
}
```

**Recommended Setup** 

Use [Babel's built in `env` property](https://babeljs.io/docs/usage/babelrc/#env-option) and only set source maps in your development environment.

**.babelrc**
```json
{
  "env": {
    "production": {
      "plugins": [["emotion", { sourceMap: false }]]
    },
    "development": {
      "plugins": [["emotion", { sourceMap: true }]]
    }
  }
}
```
