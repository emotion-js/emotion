# @emotion/babel-preset-css-prop

> A babel preset to automatically enable emotion's css prop

## Install

```bash
yarn add @emotion/babel-preset-css-prop
```

## Usage

**.babelrc**

```json
{
  "plugins": ["emotion"]
}
```

### Via CLI

```bash
babel --presets @emotion/babel-preset-css-prop script.js
```

### Via Node API

```javascript
require('@babel/core').transform(code, {
  plugins: ['@emotion/babel-preset-css-prop']
})
```

## Options

All options that `babel-plugin-emotion` and `@babel/plugin-transform-react-jsx` accept are accepted by `@emotion/babel-preset-css-prop` and they will be forwarded to their respective plugin.
