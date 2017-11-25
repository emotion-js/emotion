## Usage with Babel

The Babel Plugin is highly recommended, but not required in version 8 and above.

See the [installation instructions](install.md).

### Features which are enabled with the babel plugin

### styled.element Syntax
`styled('div')` will work without the plugin

### Minification
Any leading/trailing space between properties in your `css` and `styled` blocks is removed. This can reduce the size of your final bundle.

### Dead Code Elimination
Uglifyjs will use the injected `/*#__PURE__*/` flag comments to mark your `css` and `styled` blocks as candidates for dead code elimination.

### Static Extraction
Generated CSS that is eligible for extraction can be moved to an external css file.

### Source Maps
When enabled, navigate directly to the style declaration in your javascript file.

### css as Prop
Convenient helper for calling `css` and appending the generated className during compile time.

## Babel Macros

Instead of using emotion's babel plugin, you can use emotion with [`babel-macros`](https://github.com/kentcdodds/babel-macros). Add `babel-macros` to your babel config and import whatever you want from emotion but add `/macro` to the end. The macro is currently the same as inline mode. Currently every API except for the css prop is supported by the macro.

```jsx
import styled from 'react-emotion/macro'
import { css, keyframes, fontFace, injectGlobal, flush, hydrate } from 'emotion/macro'
```

[create-react-app issue discussing macros](https://github.com/facebookincubator/create-react-app/issues/2730).

### Components as selectors
The ability to refer to another component to apply override styles depending on nesting context. Learn more in the [react-emotion docs](./styled.md#targeting-another-emotion-component).
