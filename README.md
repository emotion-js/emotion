<h1 align="center" style="color: #343a40">
  <img src="https://cdn.rawgit.com/tkh44/emotion/master/emotion.png" alt="emotion" width="200">
  <br>
  emotion
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">The Next Generation of CSS-in-JS</p>




[![npm version](https://badge.fury.io/js/emotion.svg)](https://badge.fury.io/js/emotion)
[![Build Status](https://travis-ci.org/tkh44/emotion.svg?branch=master)](https://travis-ci.org/tkh44/emotion)
[![codecov](https://codecov.io/gh/tkh44/emotion/branch/master/graph/badge.svg)](https://codecov.io/gh/tkh44/emotion)
![gzip size](http://img.badgesize.io/https://unpkg.com/emotion/dist/DO-NOT-USE.min.js?compression=gzip&label=gzip%20size)
![size](http://img.badgesize.io/https://unpkg.com/emotion/dist/DO-NOT-USE.min.js?label=size)
[![slack](https://emotion.now.sh/badge.svg)](https://slack.emotion.sh/)


- [Install](#install)
- Demos
  - [emotion website](https://github.com/tkh44/emotion/tree/master/example) [[Demo Here](https://emotion.sh)]
  - [next-hnpwa-guide-kit](https://github.com/tkh44/next-hnpwa-guide-kit) [[Demo Here](https://hnpwa.life)]
  - **open a PR and add yours!**
 
- [Benchmarks](https://github.com/tkh44/emotion/tree/master/docs/benchmarks.md)

- [Extract Mode](#extract-mode)
- [Inline Mode](#inline-mode)
- [API](#api)
  - [css](#css)
  - [composes property](#composes-property)
  - [keyframes](#keyframes)
  - [fontFace](#fontface)

- [Server-Side Rendering](#server-side-rendering)
  - [extractCritical](#extractcritical)
  - [hydrate](#hydrate)
  
- Vue
  - [styled](#vue-styled)


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

- Extract mode requires css variables to function. If you need ie11 support use **inline mode**.
- If you have a client side rendered app that does not need ie11 support use **extract mode**.
- If you are SSR rendering we highly suggest using **inline mode** with `extractCritical`.

This js file, `h1.js`

```jsx harmony
import styled from 'emotion/react'

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
import styled from 'emotion/react'

const H1 = styled('h1', 'css-H1-duiy4a')
```

**Browser Support** no ie11 support (css vars)

## Inline Mode

- ~~Only extracts styles **without** dynamic values.~~ (we're working on this) 
- No css var requirement
- Same speed as default mode in benchmarks
- Works with SSR

Configure babel

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
import styled from 'emotion/react'

const H1 = styled('h1')`
  color: ${props => props.color};
`
```

`h1.js` after babel compilation

```jsx
import './h1.emotion.css'
import styled from 'emotion/react'

const H1 = styled('h1', 'css-H1-duiy4a', [props => props.color], function createEmotionStyles(x0) {
  return [`.css-H1-duiy4a { color:${x0} }`]
})
```

**Browser Support** anything React supports

## API

### css

`css` takes in styles and returns a class name. It is the foundation of emotion.

```jsx
import { css } from 'emotion'

const flex = css`
  display: flex;
`
const justifyCenter = css`
  composes: ${flex};
  justifyContent: center;
`

<div className={justifyCenter}>
 Centered Content
</div>
```

#### Objects as Styles

`css` can also take an object or array of objects as a parameter. 
This allows you to use your existing object styles in the emotion ecosystem. 
Another great benefit is that you can now use [polished](https://polished.js.org/) with emotion.

*Object styles cannot be optimized as well as template literal styles at this time. Object styles are also not autoprefixed.*

```jsx harmony
import { css } from 'emotion'
import { lighten, modularScale } from 'polished'

const cssA = {
  color: lighten(0.2, '#000'),
  "font-size": modularScale(1),
  [hiDPI(1.5)]: {
    "font-size": modularScale(1.25)
  }
}

const cssB = css`
  composes: ${cssA}
  height: 64px;
`

const H1 = styled('h1')`
  composes: ${cssB}
  font-size: ${modularScale(4)};
`

const H2 = styled(H1)`font-size:32px;`

<H2 scale={2} className={'legacy__class'}>
  hello world
</H2>
```

### styled

```jsx
import styled from 'emotion/react'

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

#### Objects as styles

`styled` can also take objects or a function that returns an object. This API was inspired by [glamorous](https://github.com/paypal/glamorous).

*The same caveats to using objects with css apply to this.*

```jsx
import styled from 'emotion/react'

const H1 = styled.h1({
  fontSize: 20
}, (props) => ({ color: props.color }))

const H2 = styled('h2')('some-other-class', {
  fontSize: '40px'
})

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

### composes property

The composes property is based on [css modules' composes property](https://github.com/css-modules/css-modules#composition).

```jsx
import { css } from 'emotion'
import styled from 'emotion/react'

// Define a class
const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

// You can use compose them with the composes property
const flexCenterClass = css`
  composes: ${flexCenter};
  flex-direction: column;
`

// You can also use them in styled.* and the css prop
const FlexCenterComponent = styled.div`
  composes: ${flexCenter};
`


const flexWrap = css`
  flex-wrap: wrap;
`

// You can compose with use multiple classes
const ColumnCenteredComponent = styled.div`
  composes: ${flexCenter} ${flexWrap};
`

// You can also use composes with regular classes or classes from a css module
const CssModuleComponent = styled.h1`
  composes: ${'some-class'} ${styles.header};
`

// composes MUST be the first rule, e.g. this doesn't work
const cls = css`
  font-size: 20px;
  composes: ${flexCenter}
`

// composes also does not work in nested selectors, e.g. this doesn't work
const cls = css`
  & .flex {
      composes: ${flexCenter}
  }
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

Server-Side Rendering in emotion currently only works in **inline mode**. It's similar to [glamor's api](https://github.com/threepointone/glamor/blob/master/docs/server.md). For an example of emotion and next.js checkout the [with-emotion example in the next.js repo](https://github.com/zeit/next.js/tree/master/examples/with-emotion).

#### extractCritical
This returns an object with the properties `html`, `ids` and `css`. It removes unused rules that were created with emotion(it still includes rules that were inserted with `injectGlobal`).

```jsx
import { renderToString } from 'react-dom/server'
import { extractCritical } from 'emotion/server'
import App from './App'


const { html, ids, css } = extractCritical(renderToString(<App/>))

```

#### hydrate
`hydrate` should be called on the client with the `ids` that `extractCritical` returns. If you don't call it then emotion will reinsert all the rules.

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
// Import styled from emotion/vue instead of emotion/react
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

### Usage with CSS Modules

emotion works well with CSS Modules but it requires a bit of configuration.

1. In your webpack config add the exclude option with this regex `/emotion\.css$/` to your loader for css so that emotion's static css isn't imported as a CSS Module.
2. Add another object to your `modules.use` with your css loaders but with CSS Modules disabled and set the test field to the same regex as above `/emotion\.css$/`.


- [Example webpack config](example/webpack.config.js)
- [Example usage of CSS Modules with emotion](example/src/markdown/index.js)

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
  color: attr(color, ${colors.pink[5]});
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
