---
title: "Install"
---

Emotion can be used in many different ways. The easiest way to get started is to use the [`emotion` package](/packages/emotion).

```bash
yarn add emotion
```

or if you prefer npm

```bash
npm install --save emotion
```

To use it, import what you need, for example use [css](/docs/css.md) to create class names with styles.

```jsx live
import { css } from 'emotion'

const className = css`
  color: hotpink;
`

const SomeComponent = ({ children }) => (
  <div className={className}>
    Some hotpink text.{children}
  </div>
)

const anotherClassName = css({
  textDecoration: 'underline'
})

const AnotherComponent = () => (
  <div className={anotherClassName}>
    Some text with an underline.
  </div>
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
# assuming you already have emotion installed
# React
yarn add react-emotion
# Preact
yarn add preact-emotion
```
or if you prefer npm
```bash
# React
npm install --save react-emotion
# Preact
npm install --save preact-emotion
```

> Note:

> All APIs from `emotion` are also exported by the `react-emotion` package.

```jsx live
// change this import to preact-emotion
// if you're using Preact
import styled, { css } from 'react-emotion'

const Button = styled('button')`
  color: hotpink;
`

render(
  <Button>This is a hotpink button.</Button>
)
```

## With [`babel-plugin-emotion`](/packages/babel-plugin-emotion)

> Note:

> If you're using Create React App, you can't add custom babel plugins so you can skip this section.

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
      "plugins": [
        "emotion",
        ...otherBabelPlugins
      ]
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
        ["emotion", { "sourceMap": true, "autoLabel": true }]
      ]
    }
  }
}
```

