## Theming

Themes are provided by the library [theming](https://github.com/iamstarkov/theming).


```bash
npm install -S theming
```

Add `ThemeProvider` to the top level of your app and whenever you need the theme prop wrap your component in `withTheme`. The api is laid out in detail [here](https://github.com/iamstarkov/theming/blob/master/README.md#api).

```jsx
import { ThemeProvider, withTheme } from 'theming'

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




