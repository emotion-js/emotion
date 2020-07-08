<p align="center" style="color: #343a40">
  <img src="https://cdn.rawgit.com/tkh44/emotion/master/emotion.png" alt="emotion" height="150" width="150">
  <h1 align="center">emotion</h1>
</p>
<p align="center" style="font-size: 1.2rem;">The Next Generation of CSS-in-JS</p>

> **Need support upgrading to Emotion 10? [See the migration guide](https://emotion.sh/docs/migrating-to-emotion-10)**

[![Backers on Open Collective](https://opencollective.com/emotion/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/emotion/sponsors/badge.svg)](#sponsors) [![npm version](https://badge.fury.io/js/emotion.svg)](https://badge.fury.io/js/emotion)
[![Build Status](https://img.shields.io/circleci/project/github/emotion-js/emotion/master.svg)](https://circleci.com/gh/emotion-js/emotion)
[![codecov](https://codecov.io/gh/emotion-js/emotion/branch/master/graph/badge.svg)](https://codecov.io/gh/emotion-js/emotion)
![core size](https://img.shields.io/bundlephobia/min/emotion.svg?label=core%20size)
![core gzip size](https://img.shields.io/bundlephobia/minzip/emotion.svg?label=core%20gzip%20size)
![react size](https://img.shields.io/bundlephobia/min/@emotion/styled-base.svg?label=react%20size)
![react gzip size](https://img.shields.io/bundlephobia/minzip/@emotion/styled-base.svg?label=react%20gzip%20size)
[![slack](https://emotion-slack.now.sh/badge.svg)](https://emotion-slack.now.sh/)
[![spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/emotion)

Emotion is a performant and flexible CSS-in-JS library. Building on many other CSS-in-JS libraries, it allows you to style apps quickly with string or object styles. It has predictable composition to avoid specificity issues with CSS. With source maps and labels, Emotion has a great developer experience and great performance with heavy caching in production.

# [👀 Demo Sandbox](https://codesandbox.io/s/pk1qjqpw67)

# [📖 Docs](https://emotion.sh/docs/introduction)

Frequently viewed docs:

- [Introduction](https://emotion.sh/docs/introduction)
- [Install](https://emotion.sh/docs/install)
- [CSS Prop](https://emotion.sh/docs/css-prop)
- [Styled Components](https://emotion.sh/docs/styled)
- [Composition](https://emotion.sh/docs/composition)
- [Nested Selectors](https://emotion.sh/docs/nested)
- [Media Queries](https://emotion.sh/docs/media-queries)

### Quick Start

Get up and running with a single import.

```bash
npm install --save @emotion/core
```

```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'

let SomeComponent = props => {
  return (
    <div
      css={{
        color: 'hotpink'
      }}
      {...props}
    />
  )
}
```

### Do I Need To Use the Babel Plugin?

The babel plugin is not required, but enables some optimizations and customizations that could be beneficial for your project.

Look here 👉 _[emotion babel plugin feature table and documentation](https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion)_

### Demo Sandbox

[Demo Code Sandbox](https://codesandbox.io/s/pk1qjqpw67)

### Examples

- [emotion website](site) [[Demo Here](https://emotion.sh)]
- [next-hnpwa-guide-kit](https://github.com/tkh44/next-hnpwa-guide-kit) [[Demo Here](https://hnpwa.life)]
- [reactivesearch](https://github.com/appbaseio/reactivesearch), a react UI library for Elasticsearch [[Website](https://opensource.appbase.io/reactivesearch/)]
- [circuit-ui](https://github.com/sumup-oss/circuit-ui), a react component library built at SumUp [[Storybook](https://circuit.sumup.com/?path=/story/introduction-welcome--page)]
- **open a PR and add yours!**

### Ecosystem

- [stylelint](https://github.com/stylelint/stylelint) - A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
- [facepaint](https://github.com/emotion-js/facepaint)
- [emotion-vue](https://github.com/egoist/emotion-vue)
- [nuxt-community/emotion-module](https://github.com/nuxt-community/emotion-module) - Emotion module for Nuxt.js
- [ember-emotion](https://github.com/alexlafroscia/ember-emotion)
- [CSS to emotion transform](https://transform.now.sh/css-to-emotion/)
- [ShevyJS](https://github.com/kyleshevlin/shevyjs)
- [design-system-utils](https://github.com/mrmartineau/design-system-utils) - Utilities to give better access to your design system.
- [polished](https://github.com/styled-components/polished) - Lightweight set of Sass/Compass-style mixins/helpers for writing styles in JavaScript.
- [monad-ui](https://github.com/muhajirdev/monad-ui/) - Utility First CSS-In-JS
- [css-in-js-media](https://github.com/zx6658/css-in-js-media) - you can deal with responsive design using css-in-js easily with this `css-in-js-media` which is similar with include-media
- [emotion-native-extended](https://github.com/ItsWendell/emotion-native-extended) - Better styling support for Emotion Native with [React Native Extended Stylesheet](https://github.com/vitalets/react-native-extended-stylesheet)

### In the Wild

- [abacusfi.com](https://abacusfi.com)
- [healthline.com](https://www.healthline.com)
- [nytimes.com](https://www.nytimes.com)
- [vault.crucible.gg](http://vault.crucible.gg/)
- [render.com](https://render.com)
- [gatsbythemes.com](https://gatsbythemes.com/)
- [blazity.com](https://blazity.com/)
- [postmates.com](https://postmates.com/)
- [thedisconnect.co](https://thedisconnect.co/one)
- [zefenify.com](https://zefenify.com/about.html)
- [sentry.io](https://sentry.io)
- [comparett.com](https://comparett.com)
- [Domain.com.au](https://www.domain.com.au)
- [cyberhaven.com](https://cyberhaven.com)
- [CommercialRealEstate.com.au](https://www.commercialrealestate.com.au)

## Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/emotion-js/emotion/graphs/contributors"><img src="https://opencollective.com/emotion/contributors.svg?width=890&button=false" /></a>

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/emotion#backer)]

<a href="https://opencollective.com/emotion#backers" target="_blank"><img src="https://opencollective.com/emotion/backers.svg?width=890"></a>

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/emotion#sponsor)]

<a href="https://thinkmill.com.au" target="_blank"><img height="64" alt="Thinkmill" src="https://thinkmill.github.io/badge/wide-logo.svg"></a>
<a href="https://opencollective.com/emotion/sponsor/0/website" target="_blank"><img src="https://opencollective.com/emotion/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/emotion/sponsor/1/website" target="_blank"><img src="https://opencollective.com/emotion/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/emotion/sponsor/2/website" target="_blank"><img src="https://opencollective.com/emotion/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/emotion/sponsor/3/website" target="_blank"><img src="https://opencollective.com/emotion/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/emotion/sponsor/4/website" target="_blank"><img src="https://opencollective.com/emotion/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/emotion/sponsor/5/website" target="_blank"><img src="https://opencollective.com/emotion/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/emotion/sponsor/6/website" target="_blank"><img src="https://opencollective.com/emotion/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/emotion/sponsor/7/website" target="_blank"><img src="https://opencollective.com/emotion/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/emotion/sponsor/8/website" target="_blank"><img src="https://opencollective.com/emotion/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/emotion/sponsor/9/website" target="_blank"><img src="https://opencollective.com/emotion/sponsor/9/avatar.svg"></a>
