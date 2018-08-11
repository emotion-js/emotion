---
title: "Theming"
---

Themes are provided by the library [`emotion-theming`](https://github.com/emotion-js/emotion/tree/master/packages/emotion-theming).

```bash
npm install -S emotion-theming
```

Add `ThemeProvider` to the top level of your app and access the theme with `props.theme` in a styled component or provide a function that accepts the theme as the css prop. The api is laid out in detail [in the documentation](https://github.com/emotion-js/emotion/tree/master/packages/emotion-theming).

```jsx
// @live
import styled from '@emotion/styled'
import ThemeProvider from '@emotion/provider'

const theme = {
  colors: {
    primaryColors: 'hotpink'
  }
}

const SomeText = styled.div`
  color: ${props => props.theme.colors.primary};
`

render(
  <ThemeProvider theme={theme}>
    <SomeText>some text</SomeText>
    <div css={theme => ({ color: theme.colors.primary })}>
      some other text
    </div>
  </ThemeProvider>
)
```
