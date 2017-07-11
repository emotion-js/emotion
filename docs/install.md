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

**Browser Support** anything React supports

