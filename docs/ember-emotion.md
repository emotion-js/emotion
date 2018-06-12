# ember-emotion

> Use emotion in Ember.js

[![Build Status](https://travis-ci.org/alexlafroscia/ember-emotion.svg?branch=master)](https://travis-ci.org/alexlafroscia/ember-emotion)
[![Ember Observer Score](https://emberobserver.com/badges/ember-emotion.svg)](https://emberobserver.com/addons/ember-emotion)
[![npm version](https://badge.fury.io/js/ember-emotion.svg)](https://www.npmjs.com/package/ember-emotion)

This addon

- 👩‍🎤 Exposes `emotion` as a module that can be imported in Ember
- 📦 Adds the ability to define styles scoped to a pod
- 🚀 Supports FastBoot out-of-the-box
- ⚡️ Allows for dynamically defining CSS values

## Installation

```bash
ember install ember-emotion
```

## Usage

To start using `ember-emotion`, add a `style.js` file within a `Component` or `Controller` pod. Each named export can be accessed through the `emotion-class` helper in the pod's template. The default export, for `Component` pods, is merged into the `classNames` property automatically

```javascript
// components/foo-bar/style.js
import { css } from 'emotion';

export default css`
  background: grey;
`;

export const paragraph = css`
  color: blue;
`;
```

```handlebars
{{! components/foo-bar/template.hbs }}
The component background will be grey.
<p class={{emotion-class 'paragraph'}}>
  Just this text will be blue.
</p>
```

For more information, check out the [project `README`][ember-emotion].

[ember-emotion]: https://github.com/alexlafroscia/ember-emotion
