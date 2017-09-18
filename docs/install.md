[github](https://github.com/tkh44/emotion)
[npm](https://npm.im/emotion)

## Install

```bash
npm install --save emotion react-emotion babel-plugin-emotion
```

**.babelrc**
```json
{
  "plugins": [
    "emotion"
  ]
}
```

**Notes:**
- Make sure `"emotion"` is the first plugin.
- If you are using Babel's env option in your `.babelrc` file ensure that emotion is first in every enviorment's list of plugins.
  ```json
  {
    "env": {
      "production": {
        "plugins": ["emotion", "transform-react-constant-elements"]
      }
    },
    "plugins": ["emotion"]
  }
  ```

### Preact

If you're using [Preact](https://github.com/developit/preact) instead of [React](https://github.com/facebook/react), install [`preact-emotion`](./preact.md). The babel setup remains the same.
