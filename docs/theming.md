---
title: "Theming"
---

Themes are provided by the library [`emotion-theming`](https://github.com/emotion-js/emotion/tree/master/packages/emotion-theming).

```bash
npm install -S emotion-theming
```

Add `ThemeProvider` to the top level of your app and access the theme with `props.theme` in a styled component. The api is laid out in detail [in the documentation](/packages/emotion-theming.md).

```jsx live
import styled from 'react-emotion'
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
  </ThemeProvider>
)
```
