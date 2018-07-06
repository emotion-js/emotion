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

const emotionLogo =
  'https://cdn.rawgit.com/emotion-js/emotion/master/emotion.png'

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

[![Edit n3nmq8v46j](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n3nmq8v46j)

## Supported primitives

* **Text**

* **View**

* **Image**

## Usage with `react-sketchapp`

### Installing dependencies

* [`react-sketchapp`](https://github.com/airbnb/react-sketchapp)

```
yarn add react-sketchapp
```

* `skpm` for building and publishing sketch plugins. This is required to render the components and build them to Sketch environment.

```
yarn add @skpm/builder --dev
```

### Configuring `skpm` builder

Once you've installed `skpm`,

* create a new field `skpm` in `package.json`

```json
 "skpm": {
   "main": "some-name.sketchplugin",
   "manifest": "manifest.json"
},
```

* Create `manifest.json` file with following content -

```json
{
  "compatibleVersion": 3,
  "bundleVersion": 1,
  "commands": [
    {
      "name": "react-sketchapp: some-name",
      "identifier": "main",
      "script": "./your-app-file.js"
    }
  ],
  "menu": {
    "isRoot": true,
    "items": ["main"]
  }
}
```

* add this to your `scripts` section of your `package.json`

```json
scripts: {
  "render": "skpm-build --watch --run",
}
```

and finally run `yarn render` to render the components to Sketch.

For a complete reference, checkout [this](https://github.com/airbnb/react-sketchapp/blob/master/examples/emotion/src) project setup.
