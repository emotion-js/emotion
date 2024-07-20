# @emotion/use-insertion-effect-with-fallbacks

## 1.1.0

### Minor Changes

- [#3198](https://github.com/emotion-js/emotion/pull/3198) [`d8ff8a5`](https://github.com/emotion-js/emotion/commit/d8ff8a5990c691017b463b3fa23a9f46ab28147b) Thanks [@Andarist](https://github.com/Andarist)! - Migrated away from relying on `process.env.NODE_ENV` checks to differentiate between production and development builds.

  Development builds (and other environment-specific builds) can be used by using proper conditions (see [here](https://nodejs.org/docs/v20.15.1/api/packages.html#resolving-user-conditions)). Most modern bundlers/frameworks already preconfigure those for the user so no action has to be taken.

  Default files should continue to work in all environments.

- [#3215](https://github.com/emotion-js/emotion/pull/3215) [`a9f6912`](https://github.com/emotion-js/emotion/commit/a9f691299844bf6837b7ad41ee17cd912496f3d5) Thanks [@Andarist](https://github.com/Andarist)! - Added `edge-light` and `workerd` conditions to `package.json` manifest to better serve users using Vercel Edge and Cloudflare Workers.

## 1.0.1

### Patch Changes

- [#3029](https://github.com/emotion-js/emotion/pull/3029) [`eed5e6cf`](https://github.com/emotion-js/emotion/commit/eed5e6cf00f94f3011b93825ccce43cb2270c247) Thanks [@Andarist](https://github.com/Andarist)! - Fixed importing in Node ESM

## 1.0.0

### Major Changes

- [#2867](https://github.com/emotion-js/emotion/pull/2867) [`89b6dbb3`](https://github.com/emotion-js/emotion/commit/89b6dbb3c13d49ef1fa3d88888672d810853f05a) Thanks [@Andarist](https://github.com/Andarist)! - A wrapper package that uses `useInsertionEffect` or a specific fallback for it. It comes with two exports: `useInsertionEffectAlwaysWithSyncFallback` and `useInsertionEffectWithLayoutFallback`.
