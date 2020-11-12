---
'@emotion/react': patch
---

The way in which we provide TypeScript support for the `css` prop has changed. Based on the usage of our JSX factories, we can add support for `css` prop only for components that support `className` prop (as our JSX factory functions take the provided `css` prop, resolve it and pass the generated `className` to the rendered component).

For the classic runtime this has been implemented using technique described [here](https://www.typescriptlang.org/docs/handbook/jsx.html#factory-functions). What is important - we no longer extend any global interfaces, so people shouldn't bump anymore into type conflicts for the `css` prop when using different libraries with `css` prop support, such as `styled-components`.

For the automatic runtime this has been implemented by exporting `JSX` namespace from the appropriate entries but this is only supported in **TypeScript 4.1 or higher**.

However, if you are stuck with older version of TypeScript or using the classic runtime implicitly by using our `@emotion/babel-preset-css-prop` then it's not possible to leverage leverage `css` prop support being added conditionally based on a type of rendered component. For those cases we have added a special file that can be imported once to add support for the `css` prop globally, for all components. Use it like this:

```ts
/// <reference types="@emotion/react/types/css-prop" />
```

In this particular case we are forced to extend the existing `React.Attributes` interface. Previously we've been extending both `React.DOMAttributes<T>` and `JSX.IntrinsicAttributes`. This change is really minor and shouldn't affect any consuming code.
