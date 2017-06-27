<h1 align="center" style="color: #343a40">
  <img src="https://cdn.rawgit.com/tkh44/emotion/master/emotion.png" alt="emotion" width="200">
  <br>
  emotion
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">high performance js for your css</p>




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

## Extract Mode

The default settings enable css extraction.

This js file, `h1.js`

```jsx harmony
import styled from 'emotion/styled'

const H1 = styled('h1')`
  color: #ffd43b;
`
```

During babel compilation emotion will create `h1.emotion.css` and add `import './h1.emotion.css'` to the top of `h1.js`

```css
.css-H1-duiy4a {
  color: blue
}
```

`h1.js` after babel compilation

```jsx
import './h1.emotion.css'
import styled from 'emotion/styled'

const H1 = styled('h1', 'css-H1-duiy4a')
```

**Browser Support** no ie11 support (css vars)

## Inline Mode

Inline mode does **not** extract css into external files.

**.babelrc**
```json
{
  "plugins": [
    ["emotion/babel", { inline: true }]
  ]
}
```

This js file, `h1.js`

```jsx
import styled from 'emotion/styled'

const H1 = styled('h1')`
  color: #ffd43b;
`
```

`h1.js` after babel compilation

```jsx
import './h1.emotion.css'
import styled from 'emotion/styled'

const H1 = styled('h1', 'css-H1-duiy4a', [], function createEmotionStyles() {
  return ['.css-H1-duiy4a {color:blue}']
})
```

**Browser Support** anything React supports

## API

### styled

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

