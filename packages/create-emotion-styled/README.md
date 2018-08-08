# create-emotion-styled

> Create the styled API with emotion for React-like libraries

`create-emotion-styled` allows you to use the `styled` API with instances of emotion. This is **only** needed if you use a custom instance of emotion from `create-emotion` and you want to use the `styled` API. `create-emotion-styled` accepts an instance of emotion from `create-emotion` and a React-like view library.

```jsx
import React from 'react'
import * as emotion from 'my-emotion-instance'
import createEmotionStyled from 'create-emotion-styled'

export default createEmotionStyled(emotion, React)

// Exporting emotion isn't required but generally recommended
export * from 'my-emotion-instance'
```
