## Theming

Themes are provided by the library [`emotion-theming`](https://github.com/emotion-js/emotion/tree/master/packages/emotion-theming).


```bash
npm install -S emotion-theming
```

Add `ThemeProvider` to the top level of your app and whenever you need the theme prop wrap your component in `withTheme`. The api is laid out in detail [in the documentation](https://github.com/emotion-js/emotion/tree/master/packages/emotion-theming/README.md#api).

```jsx
import { ThemeProvider, withTheme } from 'emotion-theming'

const H1 = withTheme(styled(Heading)`
  color: ${p => p.theme.purple};
`)


const App = () => (
  <ThemeProvider theme={theme}>
    <H1 scale={2} ref={refFunction}>
      emotion
    </H1>
  </ThemeProvider>
)
```




