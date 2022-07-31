# @emotion/css-prettifier

## 1.1.0

### Minor Changes

- [#2819](https://github.com/emotion-js/emotion/pull/2819) [`bbad8c79`](https://github.com/emotion-js/emotion/commit/bbad8c79937f8dfd5d93bf485c1e9ec44124d228) Thanks [@nicksrandall](https://github.com/nicksrandall)! - `exports` field has been added to the `package.json` manifest. This fixes how our default exports are treated by Node.js when using their native support for ES modules. It also limits what files can be imported from a package but we've tried our best to allow importing all the files that were considered to be a part of the public API.

### Patch Changes

- Updated dependencies [[`bbad8c79`](https://github.com/emotion-js/emotion/commit/bbad8c79937f8dfd5d93bf485c1e9ec44124d228)]:
  - @emotion/memoize@0.8.0

## 1.0.1

### Patch Changes

- [#2590](https://github.com/emotion-js/emotion/pull/2590) [`1554a7e2`](https://github.com/emotion-js/emotion/commit/1554a7e264e05780b2c5bd74ccb20a92005ba61d) Thanks [@Andarist](https://github.com/Andarist)! - Upgraded and pinned the version of Stylis - the CSS parser that Emotion uses under the hood.

## 1.0.0
