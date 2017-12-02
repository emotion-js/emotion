# create-emotion-styled

> Create the styled API with emotion for React-like libraries

`create-emotion-styled` allows you to use the `styled` API with instances of emotion. This is **only** needed if you use a custom instance of emotion from `create-emotion` and you want to use the `styled` API.

```jsx
import { createElement, Component } from 'react'
import * as emotion from 'my-emotion-instance'
import { channel, contextTypes } from 'emotion-theming'
import createEmotionStyled from 'create-emotion-styled'

export default createEmotionStyled(emotion, {
  channel,
  contextTypes,
  createElement,
  Component
})

// Exporting emotion isn't required but generally recommended
export * from 'my-emotion-instance'
```

`create-emotion-styled` accepts an instance of emotion from `create-emotion` and a set of options.

## Options

### createElement

A React-like `createElement` function from React, Preact and other React-like UI libraries.

### Component

A React-like `Component` class from React, Preact and other React-like UI libraries.

### contextTypes

`contextTypes` created from [`prop-types`](https://github.com/facebook/prop-types), generally the `contextTypes` exported from `emotion-theming`. This is only required when using theming with React. This is not required for Preact.

### channel

The key used to get a theme for theming from React/Preact's `context`. This should generally be the `channel` exported from `emotion-theming`. 
