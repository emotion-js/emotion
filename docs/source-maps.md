---
title: "Source Maps"
---

> Note:
>
> `babel-plugin-emotion` is required for source maps

emotion supports source maps for styles authored in javascript.

![source-map-demo](https://user-images.githubusercontent.com/662750/30778580-78fbeae4-a096-11e7-82e1-120b6984e875.gif)

Required For Source Maps:

1. `babel-plugin-emotion` must be in your Babel setup. [[documentation]](./install.md)
2. `process.env.NODE_ENV` must be any value except `"production"`

---

> Note:
>
> We do not advise using sourceMaps in production. The source maps can add significant size to your bundle.

## Basic Babel setup

**.babelrc**

```json
{
  "plugins": [["emotion", { "sourceMap": true }]]
}
```

## Recommended Setup

Use [Babel's `env` property](https://babeljs.io/docs/usage/babelrc/#env-option) and only use source maps in your development environment.

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
