# @emotion/native

> Style and render React Native components using emotion

## Install

```
npm install @emotion/react @emotion/native
```

or if you use yarn

```
yarn add @emotion/react @emotion/native
```

This package also depends on `react`, `react-native` and `prop-types` so make sure you've them installed.

## Example

```js
import React from 'react'
import { AppRegistry } from 'react-native'
import styled, { css } from '@emotion/native'

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`

const Description = styled.Text({
  color: 'hotpink'
})

const Image = styled.Image`
  padding: 40px;
`

const emotionLogo = 'https://cdn.rawgit.com/emotion-js/emotion/main/emotion.png'

class App extends React.Component {
  render() {
    return (
      <Container
        style={css`
          border-radius: 10px;
        `}
      >
        <Description style={{ fontSize: 45, fontWeight: 'bold' }}>
          Emotion Primitives
        </Description>
        <Image
          source={{
            uri: emotionLogo,
            height: 150,
            width: 150
          }}
        />
      </Container>
    )
  }
}

AppRegistry.registerComponent('ExampleApp', () => App)
```

## Theming

Use `@emotion/react` for theming support.

```js
import React from 'react'
import styled, { css } from '@emotion/native'
import { ThemeProvider } from '@emotion/react'

const theme = {
  color: 'hotpink',
  backgroundColor: 'purple'
}

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
  border: 5px solid red;
  background-color: ${props => props.theme.backgroundColor};
`

const Description = styled.Text({
  color: 'hotpink'
})

const Image = styled.Image`
  padding: 40px;
`

const emotionLogo = 'https://cdn.rawgit.com/emotion-js/emotion/main/emotion.png'

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container
          style={css`
            border-radius: 10px;
          `}
        >
          <Description style={{ fontSize: 45, fontWeight: 'bold' }}>
            Emotion Primitives
          </Description>
          <Image
            source={{
              uri: emotionLogo,
              height: 150,
              width: 150
            }}
          />
        </Container>
      </ThemeProvider>
    )
  }
}
```

## Gotchas

- Note that the `flex` property works like CSS shorthand, and not the legacy `flex` property in React Native. Setting `flex: 1` sets `flexShrink` to `1` in addition to setting `flexGrow` to `1` and `flexBasis` to `0`.
