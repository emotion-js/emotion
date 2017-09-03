<p align="center" style="color: #343a40">
  <img src="https://cdn.rawgit.com/tkh44/emotion/master/emotion.png" alt="emotion" height="200" width="200">
  <h1 align="center">emotion</h1>
</p>
<p align="center" style="font-size: 1.2rem;">The Next Generation of CSS-in-JS</p>

[![npm version](https://badge.fury.io/js/emotion.svg)](https://badge.fury.io/js/emotion)
[![Build Status](https://travis-ci.org/emotion-js/emotion.svg?branch=master)](https://travis-ci.org/emotion-js/emotion)
[![codecov](https://codecov.io/gh/emotion-js/emotion/branch/master/graph/badge.svg)](https://codecov.io/gh/emotion-js/emotion)
![core gzip size](http://img.badgesize.io/https://unpkg.com/emotion/dist/DO-NOT-USE.min.js?compression=gzip&label=core%20gzip%20size)
![core size](http://img.badgesize.io/https://unpkg.com/emotion/dist/DO-NOT-USE.min.js?label=core%20size)
![react gzip size](http://img.badgesize.io/https://unpkg.com/react-emotion/dist/DO-NOT-USE.min.js?compression=gzip&label=react%20gzip%20size)
![react size](http://img.badgesize.io/https://unpkg.com/react-emotion/dist/DO-NOT-USE.min.js?label=react%20size)
[![slack](https://emotion.now.sh/badge.svg)](http://slack.emotion.sh/)

emotion is a high performance, lightweight css-in-js library. 
The core idea comes from Sunil Pai’s [glam](https://github.com/threepointone/glam) library and its philosophy is laid out [here](https://gist.github.com/threepointone/0ef30b196682a69327c407124f33d69a). 
The basic idea is simple.
You shouldn’t have to sacrifice runtime performance for good developer experience when writing CSS. emotion 
minimizes the runtime cost of css-in-js dramatically by parsing your styles with PostCSS during compilation instead of at runtime. 

-- [Introduction Article](https://medium.com/@tkh44/emotion-ad1c45c6d28b)

- [Install](https://github.com/tkh44/emotion/tree/master/docs/install.md)
- Demos
  - [emotion website](https://github.com/tkh44/emotion/tree/master/example) [[Demo Here](https://emotion.sh)]
  - [next-hnpwa-guide-kit](https://github.com/tkh44/next-hnpwa-guide-kit) [[Demo Here](https://hnpwa.life)]
  - **open a PR and add yours!**

- [Benchmarks](https://github.com/tkh44/emotion/tree/master/docs/benchmarks.md)

- [Extract Static](https://github.com/tkh44/emotion/tree/master/docs/extract-static.md)

- API
  - [css](https://github.com/tkh44/emotion/tree/master/docs/css.md)
  - [styled](https://github.com/tkh44/emotion/tree/master/docs/styled.md)
  - [css prop](https://github.com/tkh44/emotion/tree/master/docs/css-prop.md)
  - [composes property](https://github.com/tkh44/emotion/tree/master/docs/composes.md)
  - [keyframes](https://github.com/tkh44/emotion/tree/master/docs/keyframes.md)
  - [fontFace](https://github.com/tkh44/emotion/tree/master/docs/font-face.md)
  - [injectGlobal](https://github.com/tkh44/emotion/tree/master/docs/inject-global.md)

- [Usage with CSS Modules](https://github.com/tkh44/emotion/tree/master/docs/css-modules.md)
- [Usage with babel-macros](https://github.com/tkh44/emotion/tree/master/docs/babel-macros.md)
- [Usage with Preact](https://github.com/tkh44/emotion/tree/master/docs/preact.md)

- Ecosystem
  - [emotion-vue](https://github.com/egoist/emotion-vue)
