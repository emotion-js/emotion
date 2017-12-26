---
title: "Install"
---

Emotion can be used in many different ways. The easiest way to get started is to use the [`emotion` package](https://emotion.sh/docs/emotion).

```bash
yarn add emotion
```

or if you prefer npm

```bash
npm install --save emotion
```

To use it, import what you need, for example use [css](https://emotion.sh/docs/css) to create class names with styles.

```jsx
import { css } from 'emotion'

const className = css`
  color: hotpink;
`(<div className={className}>Some hotpink text.</div>)

const anotherClassName = css({
  textDecoration: 'underline'
})(<div className={anotherClassName}>Some text with an underline.</div>)
```

```bash
npm install --save emotion react-emotion babel-plugin-emotion
```

> **Note:** All APIs from `emotion` are also available from the `react-emotion` package.
>
> ```javascript
> import styled, { css, injectGlobal } from 'react-emotion'
> ```

### .babelrc

> **Note:** `babel-plugin-emotion` is optional but highly recommended. [More information on `babel-plugin-emotion`.](docs/babel)

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
        [...all other babel plugins...]
      ]
    }
  },
  "plugins": ["emotion"]
}
```

### Preact

Import `preact-emotion` instead of `react-emotion` and use it the same way you would with React.

```jsx
import styled from 'preact-emotion'

const SomeComponent = styled.div`
  display: flex;
`
```
