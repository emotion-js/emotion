---
title: 'Theming'
---

Emotion 10 and above doesn’t have any explicit theming API, instead, we recommend using React’s Context and Hooks which work well together with Emotion. This has many benefits over having a built in theming API which are explained below.

We recommend creating a file which exports a ThemeProvider component and a useTheme hook.

```jsx
import { createContext, useContext } from 'react'

let defaultTheme = {
  colors: {
    primary: 'hotpink',
    secondary: 'green'
  }
}

let ThemeContext = createContext(defaultTheme)

export let ThemeProvider = ThemeContext.Provider

export let useTheme = () => useContext(ThemeContext)
```

The theme can be used with css prop like this.

```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from './theme'

let Button = props => {
  let theme = useTheme()
  return (
    <button
      css={{
        color: theme.colors.primary
      }}
      {...props}
    />
  )
}

let SecondaryButton = props => {
  let theme = useTheme()
  return (
    <button
      css={{
        color: theme.colors.secondary
      }}
      {...props}
    />
  )
}
```

Or with the styled api like this

```jsx
import styled from '@emotion/styled'
import { useTheme } from './theme'

let Button = styled.button(() => {
  let theme = useTheme()

  return {
    color: theme.colors.primary
  }
})

let SecondaryButton = styled.button`
  color: ${() => useTheme().colors.secondary};
`
```

## Why don’t we have a built in theming API?

Theming in emotion v9 and earlier was inspired by theming in styled-components which was created before React’s new Context and Hooks existed. This meant having access to a value through context was novel but with React's new features, problems with that API can be solved and having a theming API built in is unnecessary

### Type Safety

The previous theming API was extremely hard to statically type. By using context and hooks directly, a default value can be provided so type systems can guarantee that there's always a theme that can be accessed.

### Global Namespace

Since there’s was a single object which contained the theme, if a component from npm or somewhere wanted to use theming, it had to choose a unique name store it’s theme in which meant name conflicts could occur. By directly using the Context API, this problem doesn't exist.

### Testing

To test components that used the previous theming API, either a default theme has to be provided with defaultProps or a ThemeProvider has to be wrapped around every component which could get really inconvenient. By providing a default value when the theme is created, components can just be rendered.

### Over-subscription
