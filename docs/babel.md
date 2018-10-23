---
title: 'Babel Plugin'
---

`babel-plugin-emotion` is highly recommended. All of the options that can be provided to `babel-plugin-emotion` are documented in [`babel-plugin-emotion`'s README](https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion).

### Install

In `emotion` version 8 and above, installation is optional. In older versions, installation is required. See the [installation instructions](/docs/install.md).

### Features which are enabled with the babel plugin

### Minification

Any leading/trailing space between properties in your `css` and `styled` blocks is removed. This can reduce the size of your final bundle.

### Dead Code Elimination

Uglifyjs will use the injected `/*#__PURE__*/` flag comments to mark your `css` and `styled` blocks as candidates for dead code elimination.

### Source Maps

When enabled, navigate directly to the style declaration in your javascript file.

### Components as selectors

The ability to refer to another component to apply override styles depending on nesting context. Learn more in the [styled docs](/docs/styled.md#targeting-another-emotion-component).
