# @emotion/cache

### Create emotion's cache instance.

Cache factory function, which allows for some low level customization of how & what styles get inserted by emotion to the stylesheets. It's intended to be used with [`<CacheProvider/>`](https://emotion.sh/docs/cache-provider) component to override default cache which is created with sensible defaults for most applications.

```javascript
import createCache from '@emotion/cache'

export const myCache = createCache({
  key: 'my-prefix-key',
  stylisPlugins: [
    /* your plugins here */
  ]
})
```

### Primary use cases

- Using emotion in embedded contexts such as an `<iframe/>`

- Setting a [nonce](#nonce-string) on any `<style/>` tag emotion creates for security purposes

- Use emotion with a developer defined `<style/>` tag

- Using emotion with custom stylis plugins

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
