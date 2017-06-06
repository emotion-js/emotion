# emotion

## 👩‍🎤 Glam + React

[![npm version](https://badge.fury.io/js/emotion.svg)](https://badge.fury.io/js/emotion)
[![Build Status](https://travis-ci.org/tkh44/emotion.svg?branch=master)](https://travis-ci.org/tkh44/emotion)
[![codecov](https://codecov.io/gh/tkh44/emotion/branch/master/graph/badge.svg)](https://codecov.io/gh/tkh44/emotion)


-   [Install](#install)
-   [Example Project](https://github.com/tkh44/emotion/tree/master/example)

## Install

```bash
npm install -S emotion glam
```


**.babelrc**
```json
{
  "plugins": [
    "emotion/babel",
    "glam/babel"
  ]
}
```

## API

### emotion

```jsx
import { emotion } from 'emotion'

const H1 = emotion('h1')`
  color: 'blue';
  font-size: 48px;
  transform: scale(${props => props.scale});
`

function Greeting ({ name }) {
  return <H1 scale={2}>Hello {name}</H1> // blue, 48px, and scaled 2x text
}


// You can also pass components in

const H2 = emotion(H1)`
  font-size: ${fontSize * 2/3}px;
  color: 'red';
`

function Greeting ({ name }) {
  return <H2>Hello {name}</H2> // red, 32px, and scaled 2x text
}

// this works too

const H3 = emotion.h3`
  font-size: ${fontSize * 1/3}px;
  color: 'red';
`

function Greeting ({ name }) {
  return <H3>Hello {name}</H3> // red, 16px text
}
```

#### attr

[MDN - attr](https://developer.mozilla.org/en-US/docs/Web/CSS/attr)



### css prop

When using the emotion babel plugin, any `css` prop is converted to a class name via glam and appended to any existing class names.

**Similar to importing React when using jsx, `import css from 'glam'` must be at the top of your source files.**


```jsx harmony
const Name = ({ color, name }) => <h1 css={`color: ${color};`}>{name}</h1>

// is converted to

const Name = ({ color, name }) => <h1 className={css`color: ${color};`}>{name}</h1>
```

