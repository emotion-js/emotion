# create-emotion

### Create distinct instances of emotion.

The main [emotion](https://github.com/emotion-js/emotion/tree/master/packages/emotion) package can be thought of as a call to `createEmotion` with sensible defaults for most applications.

```javascript
import createEmotion from 'create-emotion'

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
  cache
} = createEmotion()
```

### Upside

- Calling it directly will allow for some low level customization.

- Create custom names for emotion APIs to help with migration from other, similar libraries.

- Could set custom `key` to something other than `css`

### Downside

- Introduces some amount of complexity to your application that can vary depending on developer experience.

- Required to keep up with changes in the repo and API at a lower level than if using `emotion` directly

### Primary use cases

- Using emotion in embedded contexts such as an `<iframe/>`

- Setting a [nonce](/packages/cache#nonce-string) on any `<style/>` tag emotion creates for security purposes

- Use emotion with a developer defined `<style/>` tag

- Using emotion with custom stylis plugins

## Multiple instances in a single app example

```jsx
import createEmotion from 'create-emotion'

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
  cache
} = createEmotion({
  // The key option is required when there will be multiple instances in a single app
  key: 'some-key'
})
```

## Options

`createEmotion` accepts the same options as [createCache](/packages/cache#options) from `@emotion/cache`.
