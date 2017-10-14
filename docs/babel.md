## Usage with Babel

The Babel Plugin is highly recommended, but not required in version 8 and above.

## Install
```bash
npm install --save-dev babel-plugin-emotion
```
**.babelrc** _note: add emotion as the first plugin in the list_
```json
{
  "plugins": [
    "emotion"
  ]
}
```

The following features are enabled when using the babel plugin.

### `styled.div` syntax
styled('div') will work without the plugin

### Minification
Any leading/trailing space between properties in your css and styled blocks is removed. This can reduce the size of - your final bundle.

### `/*#__PURE__*/` flag injection
Uglifyjs will use these special comments to mark your css - and styled as candidates for dead code elimination.

### Static Extraction
Static extraction can only work with the babel plugin.

### Source Maps
When enabled, source-maps allow you to navigate directly to - the location of your styles in Javascript files.

### `css` prop
The css prop is just a shortcut for calling the css function and appending the result to the className prop. We do this - all at compile time.

## Usage with babel-macros

Instead of using the emotion's babel plugin, you can use emotion with [`babel-macros`](https://github.com/kentcdodds/babel-macros). Add `babel-macros` to your babel config and import whatever you want from emotion but add `/macro` to the end. The macro is currently the same as inline mode. Currently every API except for the css prop is supported by the macro.

```jsx
import styled from 'react-emotion/macro'
import { css, keyframes, fontFace, injectGlobal, flush, hydrate } from 'emotion/macro'
```

For some context, check out this [issue](https://github.com/facebookincubator/create-react-app/issues/2730).
