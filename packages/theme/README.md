# @emotion/theme

> Theming but fast.... and type safe

# Why does this exist?

Most current theming solutions for css-in-js with React use React's context, this means you can access the theme anywhere in your app but it's pretty expensive to update the theme dynamically.

# What if it didn't use context?

# What if there was a way to access dynamic stuff inside of CSS?

# ......... CSS Variables

`@emotion/theme` gives you a type safe API to do theming in React which uses CSS Variables under the hood for great performance.

# That's great but I still need to support IE11.

That's what's so great about this, if this is in a browser that doesn't support CSS Variables (probably IE 11), it'll use React context so it won't be as fast as it would in a modern browser but it will still work.

# How do I use this?

```jsx
import { createTheme } from '@emotion/theme'

let Theme = createTheme({
  color: 'green',
  spacing: ['4px', '8px', '12px', '16px']
})

let Comp = Theme.consume((props, theme) => {
  return (
    <div
      css={{
        color: theme.color,
        padding: theme.spacing[0]
      }}
      {...props}
    />
  )
})

render(
  <Theme.Provider theme={someObjectThatIsTheSameShapeAsTheOriginalTheme}>
    <Comp />
  </Theme.Provider>
)
```

# API

```jsx
type ThemeType =
  | $ReadOnly<{
      [key: string]: ThemeType
    }>
  | string
  | $ReadOnlyArray<ThemeType>

type Options = {
  // changes the prefix in front of the css var name
  // this option should be used if you are using more than one theme on a page.
  prefix?: string
}

type CreateTheme = <Theme: ThemeType>(
  defaultTheme: Theme,
  options?: Options
) => {
  Consumer: React.ComponentType<{ children: Theme => React.Node }>,
  consume: <Props>(
    render: (props: Props, theme: Theme, ref: React.Ref<*>) => React.Node
  ) => React.ComponentType<Props>,
  Provider: React.ComponentType<{
    theme: Theme | (Theme => Theme),
    children: React.Node,
    // only used on the server
    supportsCSSVariables?: boolean
  }>,
  Extender: React.ComponentType<{ children: React.Node }>
}
```
