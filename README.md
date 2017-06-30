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
    ["emotion/babel", { "inline": true }]
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
import styled from 'emotion/styled'

const H1 = styled('h1')`
  color: blue;
  font-size: 48px;
  transform: scale(${props => props.scale});
`

function Greeting ({ name }) {
  return <H1 scale={2}>Hello {name}</H1> // blue, 48px, and scaled 2x text
}


// You can also pass components in

const H2 = styled(H1)`
  font-size: ${fontSize * 2/3}px;
  color: red;
`

function Greeting ({ name }) {
  return <H2>Hello {name}</H2> // red, 32px, and scaled 2x text
}

// this works too

const H3 = styled.h3`
  font-size: ${fontSize * 1/3}px;
  color: red;
`

function Greeting ({ name }) {
  return <H3>Hello {name}</H3> // red, 16px text
}

// You can also pass refs down using innerRef
const H1 = styled('h1')`
  color: red;
`

function Greeting ({ name }) {
  // will turn into to <h1 className="generated-className" ref={() => console.log('hello!')}>Hello {name}</h1>
  return <H1 innerRef={() => console.log('hello!')}>Hello {name}</H1> 
}

```

### css prop

```jsx
// To use the css prop you have to import css just like importing React for jsx
import { css } from 'emotion'


function SomeComponent (props) {
  // Create styles as if you're calling css and the class will be applied to the component
  return (<div css={`
    color: blue;
    font-size: ${props.fontSize}px;

    &:hover {
      color: green;
    }

    & .some-class {
      font-size: 20px;
    }
  `}>
    This will be blue until hovered.
    <div className="some-class">
      This font size will be 20px
    </div>
  </div>)
}

```

### fragment

```jsx
import { fragment, css } from 'emotion'
import styled from 'emotion/styled'

// You can define fragments which can be reused anywhere
const flexCenter = fragment`
  display: flex;
  justify-content: center;
  align-items: center;
`

// You can use them with @apply
const flexCenterClass = css`
  @apply ${flexCenter};
  flex-direction: column;
`

// You can use them with all of emotion's apis like styled

const FlexCenterComponent = styled.div`
  @apply ${flexCenter}
`

```

### keyframes

```jsx
import { keyframes } from 'emotion'
import styled from 'emotion'

// This returns a animation
const bounce = keyframes`
  from {
    transform: scale(1.01);
  }
  to {
    transform: scale(0.99);
  }
`

// You can use them in styled components or anything else
const AnimatedDiv = styled.div`
  animation: ${bounce} 0.2s infinite ease-in-out alternate;
`


```

### fontFace

```jsx
import { fontFace } from 'emotion'

fontFace`
  font-family: 'Patrick Hand SC';
  font-style: normal;
  font-weight: 400;
  src: local('Patrick Hand SC'), local('PatrickHandSC-Regular'), url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2) format('woff2');
  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
`

```


### Server-Side Rendering

Server-Side Rendering in emotion currently only works in inline mode. It's based on [glamor's api](https://github.com/threepointone/glamor/blob/master/docs/server.md). For an example of emotion and next.js checkout the [with-emotion example in the next.js repo](https://github.com/zeit/next.js/tree/master/examples/with-emotion).

#### renderStatic
This returns an object with the properties `html`, `ids` and `css`.

```jsx
import { renderToString } from 'react-dom/server'
import { renderStatic } from 'emotion/server'
import App from './App'


const { html, ids, css } = renderStatic(() => renderToString(<App/>))

```

#### renderStatic
This returns an object with the properties `html`, `ids` and `css` just like `renderStatic` but it remove unused rules that were created with emotion(it still includes rules that were inserted with `injectGlobal`).

```jsx
import { renderToString } from 'react-dom/server'
import { renderStaticOptimized } from 'emotion/server'
import App from './App'


const { html, ids, css } = renderStaticOptimized(() => renderToString(<App/>))

```

#### hydrate
`hydrate` should be called on the client with the `ids` that `renderStatic` and `renderStaticOptimized` return. If you don't call it then emotion will reinsert all the rules.

```jsx
import { hydrate } from 'emotion'

hydrate(ids)

```



### vue styled

```html
<template>
  <div id="app">
    <styled-div>This should have a blue background.</styled-div>
    <styled-component></styled-component>
  </div>
</template>

<script>
import BoringComponent from './components/BoringComponent'
// Import styled from emotion/vue instead of emotion/styled
import styled from 'emotion/vue'

// You can use styled.* just like with React
const StyledDiv = styled.div`
  background: blue;
`

// You can also pass components in
const StyledComponent = styled(BoringComponent)`
  display: flex;
  justify-content: center;
`

export default {
  name: 'app',
  components: {
    'styled-div': StyledDiv,
    'styled-component': StyledComponent
  }
}
</script>
```

### attr

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

