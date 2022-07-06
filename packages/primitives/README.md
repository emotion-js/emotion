# @emotion/primitives

> Style and render primitive interfaces across multiple targets with emotion

## Introduction

Emotion primitives makes it easy to style and render primitives across multiple platforms like the web, React Native and Sketch using the `emotion` API.

## Install

```
npm install @emotion/primitives
```

or if you use yarn

```
yarn add @emotion/primitives
```

This package also depends on `react`, `react-primitives` and `prop-types` so make sure you've them installed.

## Example

```js
import React from 'react'
import styled, { css } from '@emotion/primitives'

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

## Supported primitives

- **Text**

- **View**

- **Image**