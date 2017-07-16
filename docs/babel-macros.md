## Usage with babel-macros

Instead of using the emotion's babel plugin, you can use emotion with [`babel-macros`](https://github.com/kentcdodds/babel-macros). Add `babel-macros` to your babel config and import whatever you want from emotion but add `/macro` to the end. The macro is currently the same as inline mode. Currently every API except for the css prop is supported by the macro.

```jsx
import styled from 'emotion/react/macro'
import { css, keyframes, fontFace, injectGlobal, flush, hydrate } from 'emotion/macro'
import vueStyled from 'emotion/vue/macro'
```

For some context, check out this [issue](https://github.com/facebookincubator/create-react-app/issues/2730).