# @emotion/utils

## 1.4.2

### Patch Changes

- [#3270](https://github.com/emotion-js/emotion/pull/3270) [`77d930d`](https://github.com/emotion-js/emotion/commit/77d930dc708015ff6fd34a1084bb343b02d732fa) Thanks [@emmatown](https://github.com/emmatown)! - Fix inconsistent hashes using development vs production bundles/`exports` conditions when using `@emotion/babel-plugin` with `sourceMap: true` (the default). This is particularly visible when using Emotion with the Next.js Pages router where the `development` condition is used when bundling code but not when importing external code with Node.js.

## 1.4.1

### Patch Changes

- [#3244](https://github.com/emotion-js/emotion/pull/3244) [`ad630e3`](https://github.com/emotion-js/emotion/commit/ad630e33b57afbed0207e0b41724c27b4d79176c) Thanks [@romgrk](https://github.com/romgrk)! - Minor performance improvement

## 1.4.0

### Minor Changes

- [#3198](https://github.com/emotion-js/emotion/pull/3198) [`d8ff8a5`](https://github.com/emotion-js/emotion/commit/d8ff8a5990c691017b463b3fa23a9f46ab28147b) Thanks [@Andarist](https://github.com/Andarist)! - Migrated away from relying on `process.env.NODE_ENV` checks to differentiate between production and development builds.

  Development builds (and other environment-specific builds) can be used by using proper conditions (see [here](https://nodejs.org/docs/v20.15.1/api/packages.html#resolving-user-conditions)). Most modern bundlers/frameworks already preconfigure those for the user so no action has to be taken.

  Default files should continue to work in all environments.

- [#3215](https://github.com/emotion-js/emotion/pull/3215) [`a9f6912`](https://github.com/emotion-js/emotion/commit/a9f691299844bf6837b7ad41ee17cd912496f3d5) Thanks [@Andarist](https://github.com/Andarist)! - Added `edge-light` and `workerd` conditions to `package.json` manifest to better serve users using Vercel Edge and Cloudflare Workers.

## 1.3.0

### Minor Changes

- [#2359](https://github.com/emotion-js/emotion/pull/2359) [`16d8a8c`](https://github.com/emotion-js/emotion/commit/16d8a8c2198461c4842c73048b406c346a70aa59) Thanks [@rjdestigter](https://github.com/rjdestigter)! - Source code has been migrated to TypeScript. From now on type declarations will be emitted based on that, instead of being hand-written.

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
