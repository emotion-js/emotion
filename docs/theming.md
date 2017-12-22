## Theming

Theming functionality is provided by `emotion-theming`, and readily available as named exports in `react-emotion` and `preact-emotion`.

Add `ThemeProvider` to the top level of your app and access the theme with `props.theme` in a styled component. The api is laid out in detail [in the documentation](https://github.com/emotion-js/emotion/tree/master/packages/emotion-theming/README.md#api).

```jsx
import React from 'react'
import styled, { ThemeProvider } from 'react-emotion'

const theme = {
  purple: '#9042F0'
}

const H1 = styled(Heading)`
  color: ${p => p.theme.purple};
`

const App = () => (
  <ThemeProvider theme={theme}>
    <H1>
      emotion
    </H1>
  </ThemeProvider>
)
```

To access the theme within a normal component, use the `withTheme` higher order component:

```jsx
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider, withTheme } from 'react-emotion'

const theme = {
  title: 'Foo'
}

class Header extends React.Component {
  static propTypes = {
    theme: PropTypes.shape({
      title: PropTypes.string,
    })
  }

  render() {
    return (
      <h1>
        {this.props.theme.title}
      </h1>
    )
  }
}

const ThemedHeader = withTheme(Header)

const App = () => (
  <ThemeProvider theme={theme}>
    <ThemedHeader />
  </ThemeProvider>
)
```
