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

Emotion is a performant and flexible CSS-in-JS library. Building on many other CSS-in-JS libraries, it allows you to style apps quickly with string or object styles. It has predictable composition to avoid specificity issues with CSS. With source maps and labels, Emotion has a great developer experience and great performance with heavy caching in production.

# [Go here to see the docs](https://emotion.sh/docs/introduction)

Frequently viewed docs:

* [Introduction](https://emotion.sh/docs/introduction)
* [Install](https://emotion.sh/docs/install)
* [CSS](https://emotion.sh/docs/css)
* [Styled Components](https://emotion.sh/docs/styled)
* [Composition](https://emotion.sh/docs/composition)
* [Nested Selectors](https://emotion.sh/docs/nested)
* [Media Queries](https://emotion.sh/docs/media-queries)

### Quick Start

Get up and running with a single import.

```bash
npm install --save emotion
```

```javascript
import { css } from 'emotion'

const app = document.getElementById('root')
const myStyle = css`
  color: rebeccapurple;
`
app.classList.add(myStyle)
```

### React with [Optional Babel Plugin](docs/babel.md)

```bash
npm install --save emotion react-emotion babel-plugin-emotion
```

_Note: use `preact-emotion` in place of `react-emotion` if using [Preact](https://github.com/developit/preact)_

```javascript
import styled, { css } from 'react-emotion'

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
)
```

[Demo Code Sandbox](https://codesandbox.io/s/pk1qjqpw67)

### Examples

* [emotion website](packages/site) [[Demo Here](https://emotion.sh)]
* [next-hnpwa-guide-kit](https://github.com/tkh44/next-hnpwa-guide-kit) [[Demo Here](https://hnpwa.life)]
* [reactivesearch](https://github.com/appbaseio/reactivesearch), a react UI library for Elasticsearch [[Website](https://opensource.appbase.io/reactivesearch/)]
* **open a PR and add yours!**

### Ecosystem

* [facepaint](https://github.com/emotion-js/facepaint)
* [emotion-vue](https://github.com/egoist/emotion-vue)
* [ember-emotion](https://github.com/alexlafroscia/ember-emotion)
* [CSS to emotion transform](https://transform.now.sh/css-to-emotion/)
* [ShevyJS](https://github.com/kyleshevlin/shevyjs)
* [design-system-utils](https://github.com/mrmartineau/design-system-utils) - Utilities to give better access to your design system.

### In the Wild

* [healthline.com](https://www.healthline.com/health/body-aches)
* [vault.crucible.gg](http://vault.crucible.gg/)
* [saldotuc.com](https://saldotuc.com)
* [gatsbythemes.com](https://gatsbythemes.com/)
* [blazity.com](https://blazity.com/)
* [postmates.com](https://postmates.com/)
* [thedisconnect.co](https://thedisconnect.co/one)

