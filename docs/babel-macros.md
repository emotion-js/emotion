---
title: 'Babel Macros'
---

[Create React App recently added support for Babel Macros](https://reactjs.org/blog/2018/10/01/create-react-app-v2.html) which makes it possible to run Babel transforms without changing a Babel config.

Most of Emotion's Babel Macros are available by adding `/macro` to the end of the import you'd normally use. (assuming you're using Create React App v2 or you've added babel-plugin-macros to your .babelrc) For example, to use the macro for styled, use `@emotion/styled/macro`. The one exception to this is `@emotion/core`, `@emotion/core` doesn't have a Babel Macro because Babel Macros doesn't support macros for custom JSX pragmas. There is a Babel macro available for `css` from `@emotion/core` if you import it from `@emotion/css/macro` though.

```jsx
import styled from '@emotion/styled/macro'
import css from '@emotion/css/macro'
import { css, keyframes, injectGlobal } from 'emotion/macro'
```

> Note
>
> There are some optimisations which aren't possible with Babel Macros, so if it's possible, we still recommend using babel-plugin-emotion
