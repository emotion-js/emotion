---
title: "Install"
---

```bash
npm install --save emotion react-emotion babel-plugin-emotion
```

All `emotion` APIs are available from the `react-emotion` package.

```javascript
import styled, { css, injectGlobal } from 'react-emotion';
```

### .babelrc

[More information on the babel plugin](babel.md)

_`"emotion"` must be the **first plugin** in your babel config `plugins` list._

Takes optional configs:
- [extractStatic](babel.md#Static-Extraction) _{boolean}_
- [sourceMap](babel.md#Static-Extraction) _{boolean}_
```json
{
  "plugins": [
    ["emotion"]
  ]
}
```
If using Babel's env option emotion must also be first for each environment.
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
###  Preact

Import `preact-emotion` instead of `react-emotion` and use it the same way you would with React.

```jsx
import styled from 'preact-emotion'

const SomeComponent = styled.div`
  display: flex;
`
```
