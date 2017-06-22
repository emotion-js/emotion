# emotion

## 👩‍🎤 Glam + React

[![npm version](https://badge.fury.io/js/emotion.svg)](https://badge.fury.io/js/emotion)
[![Build Status](https://travis-ci.org/tkh44/emotion.svg?branch=master)](https://travis-ci.org/tkh44/emotion)
[![codecov](https://codecov.io/gh/tkh44/emotion/branch/master/graph/badge.svg)](https://codecov.io/gh/tkh44/emotion)


-   [Install](#install)
-   [Example Project](https://github.com/tkh44/emotion/tree/master/example)

## Install

```bash
npm install -S emotion
```


**.babelrc**
```json
{
  "plugins": [
    "emotion/babel"
  ]
}
```

## API

### emotion

```jsx
import { styled } from 'emotion'

const H1 = styled('h1')`
  color: 'blue';
  font-size: 48px;
  transform: scale(${props => props.scale});
`

function Greeting ({ name }) {
  return <H1 scale={2}>Hello {name}</H1> // blue, 48px, and scaled 2x text
}


// You can also pass components in

const H2 = styled(H1)`
  font-size: ${fontSize * 2/3}px;
  color: 'red';
`

function Greeting ({ name }) {
  return <H2>Hello {name}</H2> // red, 32px, and scaled 2x text
}

// this works too

const H3 = styled.h3`
  font-size: ${fontSize * 1/3}px;
  color: 'red';
`

function Greeting ({ name }) {
  return <H3>Hello {name}</H3> // red, 16px text
}
```

#### attr

The [attr](https://developer.mozilla.org/en-US/docs/Web/CSS/attr) CSS function is supported in
a basic capacity. 

```css
/* get value from `width` prop */
width: attr(width vw);

/* specify type or unit to apply to value */
width: attr(width vw);

/* fallback value if props.width is falsey */
width: attr(width vw, 50);
```

```jsx
const H1 = styled.h1`
  font-size: attr(fontSize px);
  margin: attr(margin rem, 4);
  font-family: sans-serif;
  color: ${colors.pink[5]};
  @media (min-width: 680px) {
    color: attr(desktopColor);
  }
`

const Title = ({ title, scale }) => {
  return (
    <H1 fontSize={16 * scale} desktopColor={colors.gray[5]}>
      {title}
    </H1>
  )
}
```

##### Supported value types 
`em|ex|px|rem|vw|vh|vmin|vmax|mm|cm|in|pt|pc|%`

