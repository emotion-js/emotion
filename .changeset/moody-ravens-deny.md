---
'@emotion/react': patch
---

The way in which we provide TypeScript support for `css` prop has changed. Based on usage of our JSX pragma we are able to add support for `css` prop only for components that support `className` prop (as our `jsx` factory function takes provided `css` prop, resolves it and pass the generated `className` to the rendered component). This has been implemented using technique described [here](https://www.typescriptlang.org/docs/handbook/jsx.html#factory-functions). What is important - we no longer extend any global interfaces, so people shouldn't bump anymore into type conflicts for the `css` prop when using different libraries with the `css` prop support, such as `styled-components`.

However, it's not possible to leverage `css` prop support being added conditionally based on a type of rendered component when one is not using our JSX pragma. For those cases when people use our pragma implicitly (for example when using our `@emotion/babel-preset-css-prop`) we have added special file that can be imported once to add support for the `css` prop globally, for all components. Use it like this:

```ts
import {} from '@emotion/react/types/css-prop'
```

In this particular case we are forced to extend the existing `React.Attributes` interface. Previously we've been extending both `React.DOMAttributes<T>` and `JSX.IntrinsicAttributes`. This change is really minor and shouldn't affect any consuming code.
