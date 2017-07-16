## Theming

```jsx
import { ThemeProvider, withTheme } from 'emotion/react/theming'
```

Theming is provided by the theming library. 
The api is laid out in detail [here](https://github.com/iamstarkov/theming/blob/master/README.md#api).
Whenever you provide a theme to `ThemeProvider` any styled component has access to those styles via `props.theme`. It does not matter how nested your component is inside `ThemeProvider`, you still have access to `props.theme`.
