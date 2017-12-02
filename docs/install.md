---
title: "Install"
---

```bash
npm install --save emotion react-emotion babel-plugin-emotion
```

> **Note:** All APIs from `emotion` are also available from the `react-emotion` package.
> ```javascript
> import styled, { css, injectGlobal } from 'react-emotion'
> ```

### .babelrc

> **Note:** `babel-plugin-emotion` is optional but highly recommended. [More information on `babel-plugin-emotion`.](docs/babel)

_`"emotion"` must be the **first plugin** in your babel config `plugins` list._

```json
{
  "plugins": ["emotion"]
}
```

If you are using Babel's env option emotion must also be first for each environment.

```json
{
  "env": {
    "production": {
      "plugins": [
        "emotion",
        [...all other babel plugins...]
      ]
    }
  },
  "plugins": ["emotion"]
}
```

### Preact

Import `preact-emotion` instead of `react-emotion` and use it the same way you
would with React.

```jsx
import styled from 'preact-emotion'

const SomeComponent = styled.div`
  display: flex;
`
```
