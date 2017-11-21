# create-emotion

> Create instances of emotion.

`create-emotion` allows you to create instances of emotion to use instead of the default `emotion` package. `create-emotion` is **only** needed if you are using emotion in a place where code is being embedded that could use emotion, you need to set a nonce, you need to use custom stylis plugins or you need to customize prefixing.

```jsx
import createEmotion from 'create-emotion'

const context =
  typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined' ? window : {}

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  caches
} = createEmotion(context)
```

`create-emotion` accepts a `context` and a set of options.

## Context



## Options

### nonce: string

A nonce that will be set on each style tag that emotion inserts for CSP.


### stylisPlugins: Function | Array<Function>

A Stylis plugin or plugins that will be run be stylis during preprocessing. [Read Stylis' docs to find out more](). This can for be used for many purposes such as RTL.

### prefix: boolean