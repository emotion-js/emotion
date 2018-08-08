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
import { ThemeProvider } from 'emotion-theming'

const theme = {
  borderRadius: '50%',
  borderColor: '#BF67AD'
}

const Avatar = styled('img')`
  width: 96px;
  height: 96px;
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.borderColor};
`

render(
  <ThemeProvider theme={theme}>
    <Avatar src={logoUrl} />
    <div
  </ThemeProvider>
)
```
