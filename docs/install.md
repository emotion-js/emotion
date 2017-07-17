[github](https://github.com/tkh44/emotion)
[npm](https://npm.im/emotion)

## Install

```bash
npm install -S emotion
```


**.babelrc**
```json
{
  "plugins": [
    "emotion/babel"
  ]
}
```

**webpack.config.js**

If you keep babel-loader configuration in your Webpack config, add Emotion as the first item in the plugins section:

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

If you keep babel-loader configuration in your Webpack config, add Emotion as the first item in the plugins section:

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

