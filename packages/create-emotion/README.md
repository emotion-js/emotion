# create-emotion

> Create instances of emotion.

`create-emotion` allows you to create instances of emotion to use instead of the default `emotion` package. `create-emotion` is **only** needed if you are using emotion in a place where code is being embedded that could use emotion, you need to set a nonce, you need to use custom stylis plugins or you need to customize prefixing.

```jsx
import createEmotion from 'create-emotion'

const context = typeof global !== 'undefined' ? global : {}

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

`emotion` requires a global object for server-side rendering to ensure that even if a module is calling an emotion instance from two paths(e.g. the same emotion instance in multiple node_modules, this can happen often with linking [#349](https://github.com/emotion-js/emotion/issues/349)) they'll still both work with SSR. If you aren't using SSR, `context` can be an empty object. This isn't required in the browser because your bundler should deduplicate modules.

<details>
<summary>Example instance if there must be multiple instances in a single app</summary>

```jsx
import createEmotion from 'create-emotion'

const context = typeof global !== 'undefined' ? global : {}

if (context.__MY_EMOTION_INSTANCE__ === undefined) {
  context.__MY_EMOTION_INSTANCE__ = {}
}

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
} = createEmotion(context.__MY_EMOTION_INSTANCE__, {
  // The key option is required when there will be multiple instances in a single app
  key: 'some-key'
})
```
</details>

**Note**: calling `createEmotion` twice with the same `context` will use the same instance, so options provided in another call of `createEmotion` with the same context will be ignored.

## Options

### nonce: string

A nonce that will be set on each style tag that emotion inserts for [Content Security Policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

### stylisPlugins: Function | Array<Function>

A Stylis plugin or plugins that will be run by stylis during preprocessing. [Read Stylis' docs to find out more](https://github.com/thysultan/stylis.js#plugins). This can for be used for many purposes such as RTL.

### prefix: boolean | Function

Allows changing Stylis' prefixing settings, this defaults to `true`. It can be a boolean or a function to dynamicly set which properties are prefixed. [More information can be found in Stylis' docs](https://github.com/thysultan/stylis.js#vendor-prefixing)

### key: string

The prefix before class names, this defaults to `css`. It will also be set as the value of the `data-emotion` attribute on the style tags that emotion inserts and it's used in the attribute name that marks style elements in `renderStylesToString` and `renderStylesToNodeStream`. This is **required if using multiple emotion instances in the same app**.

### container: HTMLElement

A DOM Node that emotion will insert all of it's style tags into, this is useful for inserting styles into iframes.
