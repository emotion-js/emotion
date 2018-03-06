---
title: "Babel Plugin"
---

`babel-plugin-emotion` is highly recommended, but not required in version 8 and above. All of the options that can be provided to `babel-plugin-emotion` are documented in [`babel-plugin-emotion`'s README](https://github.com/emotion-js/emotion/tree/master/packages/babel-plugin-emotion). See the [installation instructions](/docs/install.md).

### Features which are enabled with the babel plugin

### styled.element Syntax

`styled('div')` will work without the plugin

### Minification

Any leading/trailing space between properties in your `css` and `styled` blocks is removed. This can reduce the size of your final bundle.

### Dead Code Elimination

Uglifyjs will use the injected `/*#__PURE__*/` flag comments to mark your `css` and `styled` blocks as candidates for dead code elimination.

### Static Extraction

Generated CSS that is eligible for extraction can be moved to an external css file.

### Source Maps

When enabled, navigate directly to the style declaration in your javascript file.

### css as Prop

Convenient helper for calling `css` and appending the generated className during compile time.

### Components as selectors

The ability to refer to another component to apply override styles depending on nesting context. Learn more in the [react-emotion docs](/docs/styled.md#targeting-another-emotion-component).

