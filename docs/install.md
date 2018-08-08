---
title: "Install"
---

Emotion can be used in many different ways. The easiest way to get started is to use the [`@emotion/core` package](/packages/@emotion/core).

```bash
# React
yarn add @emotion/core
# Preact
yarn add @emotion/preact-core
```

or if you prefer npm

```bash
# React
npm install --save @emotion/core
# Preact
npm install --save @emotion/preact-core
```

To use it, import what you need, for example use [jsx](/docs/jsx.md) to create class names with styles.

```jsx
// @live
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const style = css`
  color: hotpink;
`

const SomeComponent = ({ children }) => (
  <div css={style}>Some hotpink text.{children}</div>
)

const anotherStyle = css({
  textDecoration: 'underline'
})

const AnotherComponent = () => (
  <div css={anotherStyle}>Some text with an underline.</div>
)
render(
  <SomeComponent>
    <AnotherComponent />
  </SomeComponent>
)
```

## With [`styled`](/docs/styled.md)

`styled` is a way to create React/Preact components that have styles attached to them.

```bash
# assuming you already have @emotion/core installed
# React
yarn add @emotion/styled
# Preact
yarn add @emotion/preact-styled
```

or if you prefer npm

```bash
# React
npm install --save @emotion/styled
# Preact
npm install --save @emotion/preact-styled
```

```jsx live
// change this import to @emotion/preact-styled
// if you're using Preact
import styled from '@emotion/styled'

const Button = styled.button`
  color: hotpink;
`

render(<Button>This is a hotpink button.</Button>)
```

## With [`babel-plugin-emotion`](/packages/babel-plugin-emotion)

> Note:

> If you're using Create React App, you can't add custom babel plugins so you can skip this section.

# IF YOU'RE LOOKING AT THIS NOW, YOU SHOULD USE @emotion/babel-plugin-core BUT IT WILL PROBABLY BE babel-plugin-emotion IN THE FUTURE

Emotion has an optional [Babel](https://babeljs.io/) plugin that optimizes styles by compressing and hoisting them and creates a better developer experience with source maps and labels.

```bash
yarn add babel-plugin-emotion
```

or if you prefer npm

```bash
npm install --save babel-plugin-emotion
```

## .babelrc

_`"emotion"` must be the **first plugin** in your babel config `plugins` list._

```json
{
  "plugins": ["emotion"]
}
```

If you are using Babel's env option emotion must also be first for each environment.

```json
{
  "env": {
    "production": {
      "plugins": ["emotion", ...otherBabelPlugins]
    }
  },
  "plugins": ["emotion"]
}
```

## Recommended config

```json
{
  "env": {
    "production": {
      "plugins": [["emotion", { "hoist": true }]]
    },
    "development": {
      "plugins": [
        [
          "emotion",
          { "sourceMap": true, "autoLabel": true }
        ]
      ]
    }
  }
}
```
