# jest-emotion

## 11.0.0

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `jest-emotion` to `@emotion/jest`. Please replace `"snapshotSerializers": ["jest-emotion"]` with `"snapshotSerializers": ["@emotion/jest/serializer"]` if you're using the snapshot serializer. Also replace any imports of `jest-emotion` with `@emotion/jest` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

## 11.0.0-next.10

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `jest-emotion` to `@emotion/jest`. Please replace `"snapshotSerializers": ["jest-emotion"]` with `"snapshotSerializers": ["@emotion/jest"]` if you're using the snapshot serializer. Also replace any imports of `jest-emotion` with `@emotion/jest` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

## 11.0.0-next.7

### Patch Changes

- Updated dependencies [[`5c55fd17`](https://github.com/emotion-js/emotion/commit/5c55fd17dcaec84d1f5d5d13ae90dd336d7e4403)]:
  - @emotion/core@11.0.0-next.7

## 11.0.0-next.4

### Major Changes

- [`702f3fd2`](https://github.com/emotion-js/emotion/commit/702f3fd22aab8f3cb09dd547c07b9045ca5c3d9c) [#973](https://github.com/emotion-js/emotion/pull/973) Thanks [@spudly](https://github.com/spudly)! - Added the `T` parameter to the `Matchers` interface in the TypeScript definitions to make this module compatible with `@types/jest@^24.0.20`.

### Patch Changes

- Updated dependencies []:
  - @emotion/core@11.0.0-next.4

## 11.0.0-next.3

### Patch Changes

- Updated dependencies [[`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85)]:
  - @emotion/core@11.0.0-next.3

## 11.0.0-next.1

### Patch Changes

- [`e67a5be9`](https://github.com/emotion-js/emotion/commit/e67a5be9bffaa12f9ae0e366983dced4c3716f84) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@Andarist](https://github.com/Andarist)! - Take specificity into account when matching styles

* [`e67a5be9`](https://github.com/emotion-js/emotion/commit/e67a5be9bffaa12f9ae0e366983dced4c3716f84) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@Andarist](https://github.com/Andarist)! - Match rules in declarations with component used as a selector
* Updated dependencies []:
  - @emotion/core@11.0.0-next.1

## 11.0.0-next.0

### Major Changes

- [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Ensure packages are major bumped so that pre-release versions of the linked packages are consistent in the major number

### Patch Changes

- Updated dependencies [[`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555)]:
  - @emotion/core@11.0.0-next.0
  - emotion@11.0.0-next.0

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file
- Updated dependencies [[`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968)]:
  - @emotion/core@10.0.27
  - emotion@10.0.27

## 10.0.25

### Patch Changes

- [`858c6e70`](https://github.com/emotion-js/emotion/commit/858c6e70e2aa83d159dba00af16f1e34a6d93fd0) [#1648](https://github.com/emotion-js/emotion/pull/1648) Thanks [@ajs139](https://github.com/ajs139)! - Improve support for Enzyme's shallow rendering.

## 10.0.17

### Patch Changes

- [fa5ffa80](https://github.com/emotion-js/emotion/commit/fa5ffa80890a079a3f333a463284bdb683cc2e0c) [#1477](https://github.com/emotion-js/emotion/pull/1477) Thanks [@liamcmitchell-sc](https://github.com/liamcmitchell-sc)! - Fixed snapshots when using Enzyme serializer and its deep mode in combination with fragments
  - [c8de890b](https://github.com/emotion-js/emotion/commit/c8de890b5aeeaafdcc5742aab310a61aebd666bf) [#1486](https://github.com/emotion-js/emotion/pull/1486) Thanks [@Andarist](https://github.com/Andarist)! - Fix printing speedy (usually this means production) styles
  - [66cda641](https://github.com/emotion-js/emotion/commit/66cda64128631790b81e3c9df273a972358ea593) [#1478](https://github.com/emotion-js/emotion/pull/1478) Thanks [@Andarist](https://github.com/Andarist)! - Update Babel dependencies

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool

## 10.0.11

### Patch Changes

- [3705706](https://github.com/emotion-js/emotion/commit/3705706) [#1344](https://github.com/emotion-js/emotion/pull/1292) Thanks [@alanctkc](https://github.com/alanctkc)! - Allow jest-emotion matcher to match target by RegExp
