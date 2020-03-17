# @emotion/cache

## 11.0.0-next.12

### Major Changes

- [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - From now on `key` option is required. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache. If multiple caches share the same key they might "fight" for each other's style elements.

### Patch Changes

- [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - Fixed issue with SSRed styles causing a React rehydration mismatch between server & client when cache was created in render.

## 11.0.0-next.10

### Patch Changes

- [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - Use sheet's `rehydrate` method for SSRed styles which inserts rehydrated styles at correct position when used in combination with `prepend` option.
- Updated dependencies [[`1e4a741d`](https://github.com/emotion-js/emotion/commit/1e4a741de6424d3d9c1f3ca9695e1953bed3a194), [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71)]:
  - @emotion/sheet@0.10.0-next.1

## 11.0.0-next.6

### Minor Changes

- [`4a891bf6`](https://github.com/emotion-js/emotion/commit/4a891bf6a30e3bb37f8f32031fa75a571c637d9c) [#1473](https://github.com/emotion-js/emotion/pull/1473) Thanks [@jcharry](https://github.com/jcharry)! - Accept new `prepend` option to allow for adding style tags at the beginning of the specified DOM container.

### Patch Changes

- Updated dependencies [[`4a891bf6`](https://github.com/emotion-js/emotion/commit/4a891bf6a30e3bb37f8f32031fa75a571c637d9c)]:
  - @emotion/sheet@0.10.0-next.0

## 11.0.0-next.0

### Major Changes

- [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Ensure packages are major bumped so that pre-release versions of the linked packages are consistent in the major number

## 10.0.29

### Patch Changes

- Updated dependencies [[`446e756`](https://github.com/emotion-js/emotion/commit/446e75661c4aa01e51d1466472a212940c19cd82)]:
  - @emotion/hash@0.8.0

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file
- Updated dependencies [[`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968)]:
  - @emotion/hash@0.7.4
  - @emotion/sheet@0.9.4
  - @emotion/stylis@0.8.5
  - @emotion/utils@0.11.3
  - @emotion/weak-memoize@0.2.5

## 10.0.19

- Updated dependencies [c81c0033]:
  - @emotion/hash@0.7.3
  - @emotion/weak-memoize@0.2.4

## 10.0.17

### Patch Changes

- [10514a86](https://github.com/emotion-js/emotion/commit/10514a8635dcaa55b85c7bff90e2a9e14d1ba61f) [#1482](https://github.com/emotion-js/emotion/pull/1482) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Remove react native bundles in favour of different isBrowser detection
  - [16ff2330](https://github.com/emotion-js/emotion/commit/16ff233061e35fe71bfb1671da54ac12d6fc9eeb) [#1483](https://github.com/emotion-js/emotion/pull/1483) Thanks [@JakeGinnivan](https://github.com/JakeGinnivan)! - nth selector will no longer warn when using extract critical

## 10.0.15

### Patch Changes

- [61e61edc](https://github.com/emotion-js/emotion/commit/61e61edc) [#1412](https://github.com/emotion-js/emotion/pull/1412) Thanks [@donysukardi](https://github.com/donysukardi)! - Add explicit entries for react-native and sketch environments

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool
