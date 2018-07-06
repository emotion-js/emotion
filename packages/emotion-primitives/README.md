# Emotion primitives

> Style and render primitive interfaces across multiple targets with emotion

## Introduction

Emotion primitives makes it easy to style and render primitives across multiple platforms like `Web`, `React Native` and `Sketch` using the similar `emotion` API.

## Install

```
npm install emotion-primitives
```

or if you use yarn

```
yarn add emotion-primitives
```

This package also depends on `react` and `react-primitives` so make sure you've them installed.

## Example

```js
import React from 'react'
import styled from 'emotion-primitives'

import { ThemeProvider } from 'emotion-theming'

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

const styledLogo =
  'https://cdn.rawgit.com/emotion-js/emotion/master/emotion.png'

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container style={{ borderRadius: '10px' }}>
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

[![Edit 03r1rxv7jl](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/03r1rxv7jl)

## Supported primitives

* **Text**

* **View**

* **Image**

## Usage with `react-sketchapp`

[Using emotion-primitives with react-sketchapp](https://github.com/airbnb/react-sketchapp/tree/master/examples/emotion)
