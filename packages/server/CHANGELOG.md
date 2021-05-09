# @emotion/server

## 11.4.0

### Minor Changes

- [#2334](https://github.com/emotion-js/emotion/pull/2334) [`7d9e74f8`](https://github.com/emotion-js/emotion/commit/7d9e74f8f0d0e0ea60573a19965eded61dc41024) Thanks [@mnajdova](https://github.com/mnajdova)! - Added `extractCriticalToChunks` that allows the Global component to remove styles on unmount unlike `extractCritical` along with `constructStyleTagsFromChunks` to render the chunks to style tags.

## 11.0.0

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `emotion-server` to `@emotion/server`. Please change any imports of `emotion-server` to import `@emotion/server` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

* [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Move `create-emotion-server` to `@emotion/server/create-instance`. Please change any imports of `create-emotion-server` to import `@emotion/server/create-instance` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

* [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - `[data-emotion]` attribute on SSRed styled has changed. You should never rely on it though.

### Patch Changes

- Updated dependencies [[`debaad9a`](https://github.com/emotion-js/emotion/commit/debaad9ab4bd6c80312092826d9146f3d29c0899), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf)]:
  - @emotion/utils@1.0.0

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

### Patch Changes

- Updated dependencies [[`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63)]:
  - @emotion/css@11.0.0-rc.0
  - @emotion/utils@1.0.0-rc.0

## 11.0.0-next.19

### Patch Changes

- Updated dependencies []:
  - @emotion/css@11.0.0-next.19

## 11.0.0-next.17

### Patch Changes

- Updated dependencies []:
  - @emotion/css@11.0.0-next.17

## 11.0.0-next.16

### Patch Changes

- Updated dependencies [[`debaad9a`](https://github.com/emotion-js/emotion/commit/debaad9ab4bd6c80312092826d9146f3d29c0899)]:
  - @emotion/utils@1.0.0-next.1
  - @emotion/css@11.0.0-next.16

## 11.0.0-next.15

### Patch Changes

- Updated dependencies [[`5d692a6a`](https://github.com/emotion-js/emotion/commit/5d692a6a8102b3faabefb773dd0145b123668a07)]:
  - @emotion/css@11.0.0-next.15

## 11.0.0-next.14

### Patch Changes

- Updated dependencies [[`6d32d82b`](https://github.com/emotion-js/emotion/commit/6d32d82beb45b18e5f18a37932b862ad19b17044)]:
  - @emotion/css@11.0.0-next.14

## 11.0.0-next.13

### Patch Changes

- Updated dependencies [[`5e803106`](https://github.com/emotion-js/emotion/commit/5e803106d391b7c036bdf634318b80337a1d9b70), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf)]:
  - @emotion/babel-plugin@11.0.0-next.13
  - @emotion/css@11.0.0-next.13
  - @emotion/utils@1.0.0-next.0

## 11.0.0-next.12

### Major Changes

- [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - `[data-emotion]` attribute on SSRed styled has changed. You should never rely on it though.

### Patch Changes

- Updated dependencies [[`5c7ec859`](https://github.com/emotion-js/emotion/commit/5c7ec85904633a11185066fa591dc8969f3f2ff2), [`5bea60b1`](https://github.com/emotion-js/emotion/commit/5bea60b1ffab85fbc965532006c3a94ea139f0bf), [`e3d7db87`](https://github.com/emotion-js/emotion/commit/e3d7db87deaac95817404760112417ac1fa1b56d), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d)]:
  - @emotion/babel-plugin@11.0.0-next.12
  - @emotion/css@11.0.0-next.12

## 11.0.0-next.10

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `emotion-server` to `@emotion/server`. Please change any imports of `emotion-server` to import `@emotion/server` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

* [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Move `create-emotion-server` to `@emotion/server/create-instance`. Please change any imports of `create-emotion-server` to import `@emotion/server/create-instance` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

### Patch Changes

- Updated dependencies [[`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`c7850e61`](https://github.com/emotion-js/emotion/commit/c7850e61211d6aa26a3388399889a6072ee2f1fe), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1)]:
  - @emotion/babel-plugin@11.0.0-next.10
  - @emotion/css@11.0.0-next.10
  - emotion@11.0.0-next.10

## 11.0.0-next.0

### Major Changes

- [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Ensure packages are major bumped so that pre-release versions of the linked packages are consistent in the major number

### Patch Changes

- Updated dependencies [[`b0ad4f0c`](https://github.com/emotion-js/emotion/commit/b0ad4f0c628813a42c4637857be9a969429db6f0), [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555)]:
  - babel-plugin-emotion@11.0.0-next.0
  - create-emotion-server@11.0.0-next.0
  - emotion@11.0.0-next.0

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file
- Updated dependencies [[`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968)]:
  - babel-plugin-emotion@10.0.27
  - create-emotion-server@10.0.27
  - emotion@10.0.27

## 10.0.17

### Patch Changes

- [16ff2330](https://github.com/emotion-js/emotion/commit/16ff233061e35fe71bfb1671da54ac12d6fc9eeb) [#1483](https://github.com/emotion-js/emotion/pull/1483) Thanks [@JakeGinnivan](https://github.com/JakeGinnivan)! - nth selector will no longer warn when using extract critical

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool
