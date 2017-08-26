[github](https://github.com/tkh44/emotion)
[npm](https://npm.im/emotion)

## Install

```bash
npm install -S emotion
```

**Note:** when configuring babel to use emotion (below), add it as the first plugin in the list, so that other plugins do not transform the template literals before emotion has a chance to parse them.

**.babelrc**
```json
{
  "plugins": [
    "emotion/babel"
  ]
}
```

**webpack.config.js**

If you keep babel-loader configuration in your Webpack config, add emotion to the plugins section there:

```js
use: [
  {
    loader: "babel-loader",
    options: {
      plugins: [
        "emotion/babel",
        ...
      ]
    }
  }
]
```

### Extract Mode

The default settings enable css extraction.

**Browser Support** no ie11 support (css vars)

### Inline Mode

Inline mode does **not** extract css into external files.

**.babelrc**
```json
{
  "plugins": [
    ["emotion/babel", { inline: true }]
  ]
}
```

**webpack.config.js**

If you keep babel-loader configuration in your Webpack config, add emotion to the plugins section there:

```js
use: [
  {
    loader: "babel-loader",
    options: {
      plugins: [
        ["emotion/babel", {inline: true}],
        ...
      ]
    }
  }
]
```

**Browser Support** anything React supports

