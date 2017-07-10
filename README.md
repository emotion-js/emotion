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
![gzip size](http://img.badgesize.io/https://unpkg.com/emotion/dist/DO-NOT-USE.min.js?compression=gzip&label=gzip%20size)
![size](http://img.badgesize.io/https://unpkg.com/emotion/dist/DO-NOT-USE.min.js?label=size)
![slack](https://emotion.now.sh/badge.svg)


- [Install](https://github.com/tkh44/emotion/tree/master/docs/install.md)
- Demos
  - [emotion website](https://github.com/tkh44/emotion/tree/master/example) [[Demo Here](https://emotion.sh)]
  - [next-hnpwa-guide-kit](https://github.com/tkh44/next-hnpwa-guide-kit) [[Demo Here](https://hnpwa.life)]
  - **open a PR and add yours!**

- [Benchmarks](https://github.com/tkh44/emotion/tree/master/docs/benchmarks.md)

- [Extract Mode](https://github.com/tkh44/emotion/tree/master/docs/extract-mode.md)
- [Inline Mode](https://github.com/tkh44/emotion/tree/master/docs/inline-mode.md)
- [API](#api)
  - [css](https://github.com/tkh44/emotion/tree/master/docs/css.md)
  - [styled](https://github.com/tkh44/emotion/tree/master/docs/styled.md)
  - [css prop](https://github.com/tkh44/emotion/tree/master/docs/css-prop.md)
  - [composes property](https://github.com/tkh44/emotion/tree/master/docs/composes.md)
  - [keyframes](https://github.com/tkh44/emotion/tree/master/docs/keyframes.md)
  - [fontFace](https://github.com/tkh44/emotion/tree/master/docs/fontFace.md)

- Vue
  - [styled](#vue-styled)


## Install
- [Install](https://github.com/tkh44/emotion/tree/master/docs/install.md)

## Extract Mode
- [Extract Mode](https://github.com/tkh44/emotion/tree/master/docs/extract-mode.md)

## Inline Mode
- [Inline Mode](https://github.com/tkh44/emotion/tree/master/docs/inline-mode.md)

## API
- [css](https://github.com/tkh44/emotion/tree/master/docs/css.md)
- [styled](https://github.com/tkh44/emotion/tree/master/docs/styled.md)
- [css prop](https://github.com/tkh44/emotion/tree/master/docs/css-prop.md)
- [composes property](https://github.com/tkh44/emotion/tree/master/docs/composes.md)
- [keyframes](https://github.com/tkh44/emotion/tree/master/docs/keyframes.md)
- [fontFace](https://github.com/tkh44/emotion/tree/master/docs/fontFace.md)

## Server-side Rendering
- [Server-side Rendering](https://github.com/tkh44/emotion/tree/master/docs/ssr.md)
  - [extractCritical](https://github.com/tkh44/emotion/tree/master/docs/ssr#extractcritical.md)
  - [hydrate](https://github.com/tkh44/emotion/tree/master/docs/ssr#hydrate.md)

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
