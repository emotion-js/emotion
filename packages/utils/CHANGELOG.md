# @emotion/utils

## 1.3.0

### Minor Changes

- [#2359](https://github.com/emotion-js/emotion/pull/2359) [`16d8a8c2`](https://github.com/emotion-js/emotion/commit/16d8a8c2198461c4842c73048b406c346a70aa59) Thanks [@rjdestigter](https://github.com/rjdestigter)! - Source code has been migrated to TypeScript. From now on type declarations will be emitted based on that, instead of being hand-written.

## 1.2.1

### Patch Changes

- [#3029](https://github.com/emotion-js/emotion/pull/3029) [`eed5e6cf`](https://github.com/emotion-js/emotion/commit/eed5e6cf00f94f3011b93825ccce43cb2270c247) Thanks [@Andarist](https://github.com/Andarist)! - Fixed importing in Node ESM

## 1.2.0

### Minor Changes

- [#2819](https://github.com/emotion-js/emotion/pull/2819) [`bbad8c79`](https://github.com/emotion-js/emotion/commit/bbad8c79937f8dfd5d93bf485c1e9ec44124d228) Thanks [@nicksrandall](https://github.com/nicksrandall)! - `exports` field has been added to the `package.json` manifest. It limits what files can be imported from a package but we've tried our best to allow importing all the files that were considered to be a part of the public API.

* [#2819](https://github.com/emotion-js/emotion/pull/2819) [`bbad8c79`](https://github.com/emotion-js/emotion/commit/bbad8c79937f8dfd5d93bf485c1e9ec44124d228) Thanks [@nicksrandall](https://github.com/nicksrandall)! - Thanks to the added `exports` field, the package now includes a `worker` condition that can be utilized by properly configured bundlers when targeting worker-like environments. It fixes the issue with browser-specific files being prioritized by some bundlers when targeting workers.

## 1.1.0

### Minor Changes

- [#2600](https://github.com/emotion-js/emotion/pull/2600) [`2f27156a`](https://github.com/emotion-js/emotion/commit/2f27156a73f94c3aac82e4ed492cbfdc97225573) Thanks [@Andarist](https://github.com/Andarist)! - Introduced `registerStyles` helper that is shared across between other packages. This is just an internal util that shouldn't be used by packages other than `@emotion/*` packages.

## 1.0.0

### Major Changes

- [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - `insertStyles` no longer calls `cache.insert` with a scoped class name as a selector when inserting keyframes. The change is internal and has no effect on Emotion users.

### Patch Changes

- [`debaad9a`](https://github.com/emotion-js/emotion/commit/debaad9ab4bd6c80312092826d9146f3d29c0899) [#1999](https://github.com/emotion-js/emotion/pull/1999) Thanks [@RoystonS](https://github.com/RoystonS)! - Fixed TypeScript definition of the `EmotionCache` by replacing the non-existent `stylis` method with `insert` that is available at runtime.

## 1.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

## 1.0.0-next.1

### Patch Changes

- [`debaad9a`](https://github.com/emotion-js/emotion/commit/debaad9ab4bd6c80312092826d9146f3d29c0899) [#1999](https://github.com/emotion-js/emotion/pull/1999) Thanks [@RoystonS](https://github.com/RoystonS)! - Fixed TypeScript definition of the `EmotionCache` by replacing the non-existent `stylis` method with `insert` that is available at runtime.

## 1.0.0-next.0

### Major Changes

- [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - `insertStyles` no longer calls `cache.insert` with a scoped class name as a selector when inserting keyframes. The change is internal and has no effect on Emotion users.

## 0.11.3

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file

## 0.11.2

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@emmatown](https://github.com/emmatown)! - Update build tool
