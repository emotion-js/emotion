
<p align="center" style="color: #343a40">
  <img src="https://cdn.rawgit.com/tkh44/emotion/master/emotion.png" alt="emotion" height="150" width="150">
  <h1 align="center">emotion</h1>
</p>
<p align="center" style="font-size: 1.2rem;">The Next Generation of CSS-in-JS</p>

[![npm version](https://badge.fury.io/js/emotion.svg)](https://badge.fury.io/js/emotion)
[![Build Status](https://travis-ci.org/emotion-js/emotion.svg?branch=master)](https://travis-ci.org/emotion-js/emotion)
[![codecov](https://codecov.io/gh/emotion-js/emotion/branch/master/graph/badge.svg)](https://codecov.io/gh/emotion-js/emotion)
![core gzip size](http://img.badgesize.io/https://unpkg.com/emotion/dist/emotion.umd.min.js?compression=gzip&label=core%20gzip%20size)
![core size](http://img.badgesize.io/https://unpkg.com/emotion/dist/emotion.umd.min.js?label=core%20size)
![react gzip size](http://img.badgesize.io/https://unpkg.com/react-emotion/dist/emotion.umd.min.js?compression=gzip&label=react%20gzip%20size)
![react size](http://img.badgesize.io/https://unpkg.com/react-emotion/dist/emotion.umd.min.js?label=react%20size)
[![slack](https://emotion.now.sh/badge.svg)](http://emotion.now.sh/)

emotion is a high performance, lightweight css-in-js library. emotion minimizes the runtime cost of css-in-js by parsing your styles at build time and utilizing [insertRule](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule) on the client.

---
### Quick Start
Get up and running with a single import.
```bash
npm install --save emotion 
```

```javascript
import { css } from 'emotion';

const app = document.getElementById('root');
const myStyle = css`
  color: rebeccapurple;
`
app.classList.add(myStyle);
```
### React with [Optional Babel Plugin](docs/babel.md)
```bash
npm install --save emotion react-emotion babel-plugin-emotion
```
_Note: use `preact-emotion` in place of `react-emotion` if using [Preact](https://github.com/developit/preact)_

```javascript
import styled, { css } from 'react-emotion';

const Container = styled('div')`
  background: #333;
`
const myStyle = css`
  color: rebeccapurple;
`
const app = () => (
<Container>
  <p className={myStyle}>Hello World</p>
</Container>
);
```

[Demo Code Sandbox](https://codesandbox.io/s/pk1qjqpw67)

### Examples

  - [emotion website](packages/site) [[Demo Here](https://emotion.sh)]
  - [next-hnpwa-guide-kit](https://github.com/tkh44/next-hnpwa-guide-kit) [[Demo Here](https://hnpwa.life)]
  - **open a PR and add yours!**

### About

The core idea comes from Sunil Pai’s [glam](https://github.com/threepointone/glam) library and its philosophy is laid out [here](https://gist.github.com/threepointone/0ef30b196682a69327c407124f33d69a). 

-- [Introduction Article](https://medium.com/@tkh44/emotion-ad1c45c6d28b)

### Documentation
#### API
- Styling components with [`styled`](docs/styled.md)

- Create composable styles with [`css` classes and props](docs/css.md)

  - [`composition`](docs/composition.md)

- [`keyframes`](docs/keyframes.md)
- [`fontFace`](docs/font-face.md)
- [`injectGlobal`](docs/inject-global.md)

#### Doc files
- [All docs](docs/)
- [Version 7 docs](https://github.com/emotion-js/emotion/tree/v7.3.2)
### Ecosystem
  
  - [emotion-vue](https://github.com/egoist/emotion-vue)
  - [CSS to emotion transform](https://transform.now.sh/css-to-emotion/)

### In the Wild

  - [healthline.com](https://www.healthline.com/health/body-aches)
  - [vault.crucible.gg](http://vault.crucible.gg/)
  - [saldotuc.com](https://saldotuc.com)
  - [gatsbythemes.com](https://gatsbythemes.com/)

---

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/kn3vqJSkK4YSjwLR8ofSEhXn/emotion-js/emotion'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/kn3vqJSkK4YSjwLR8ofSEhXn/emotion-js/emotion.svg' /></a>
