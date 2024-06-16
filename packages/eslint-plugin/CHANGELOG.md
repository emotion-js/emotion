# @emotion/eslint-plugin

## 11.12.0

### Minor Changes

- [#2568](https://github.com/emotion-js/emotion/pull/2568) [`304f7e3d`](https://github.com/emotion-js/emotion/commit/304f7e3da4fb7a4c38eff0fa27cc6db417bfe10c) Thanks [@G-Rath](https://github.com/G-Rath)! - Source code has been migrated to TypeScript. From now on type declarations will be emitted based on that, instead of being hand-written.

### Patch Changes

- [#2568](https://github.com/emotion-js/emotion/pull/2568) [`304f7e3d`](https://github.com/emotion-js/emotion/commit/304f7e3da4fb7a4c38eff0fa27cc6db417bfe10c) Thanks [@G-Rath](https://github.com/G-Rath)! - An empty css prop (`<div css />`) will now raise an error in the `@emotion/syntax-preference` rule instead of crashing on this case.

* [#2568](https://github.com/emotion-js/emotion/pull/2568) [`304f7e3d`](https://github.com/emotion-js/emotion/commit/304f7e3da4fb7a4c38eff0fa27cc6db417bfe10c) Thanks [@G-Rath](https://github.com/G-Rath)! - Fixed a crash on empty css prop (`<div css />`) in the `@emotion/jsx-import` rule.

## 11.11.0

### Patch Changes

- [#3029](https://github.com/emotion-js/emotion/pull/3029) [`eed5e6cf`](https://github.com/emotion-js/emotion/commit/eed5e6cf00f94f3011b93825ccce43cb2270c247) Thanks [@Andarist](https://github.com/Andarist)! - Fixed importing in Node ESM

## 11.10.0

### Minor Changes

- [#2819](https://github.com/emotion-js/emotion/pull/2819) [`bbad8c79`](https://github.com/emotion-js/emotion/commit/bbad8c79937f8dfd5d93bf485c1e9ec44124d228) Thanks [@nicksrandall](https://github.com/nicksrandall)! - `exports` field has been added to the `package.json` manifest. It limits what files can be imported from a package but we've tried our best to allow importing all the files that were considered to be a part of the public API.

## 11.7.0

### Minor Changes

- [#2562](https://github.com/emotion-js/emotion/pull/2562) [`f046ae40`](https://github.com/emotion-js/emotion/commit/f046ae40bcae24400068311690a94ba2dbf20344) Thanks [@G-Rath](https://github.com/G-Rath)! - ESLint 8 has been added to the peer dependency range (ESLint 6 and ESLint 7 are still being supported).

## 11.5.0

### Patch Changes

- [#2353](https://github.com/emotion-js/emotion/pull/2353) [`d7d768e0`](https://github.com/emotion-js/emotion/commit/d7d768e056e6cd7a10c2de6ecb2b564e6444dac3) Thanks [@iChenLei](https://github.com/iChenLei)! - implement automatic adding of jsxImportSource pragma definition

## 11.2.0

### Patch Changes

- [`bfaa1b51`](https://github.com/emotion-js/emotion/commit/bfaa1b51684c6883c311cc20a7bf260f1af183e3) [#2246](https://github.com/emotion-js/emotion/pull/2246) Thanks [@G-Rath](https://github.com/G-Rath)! - Improved `syntax-preference` rule to support `css` function and check style types for arguments of `css` & styled calls.

## 11.0.0

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@emmatown](https://github.com/emmatown)! - Rename `eslint-plugin-emotion` to `@emotion/eslint-plugin`. Please replace `"plugins": ["emotion"]` with `"plugins": ["@emotion"]` and `emotion/` with `@emotion/` in your rules config in your ESLint config.

### Minor Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@emmatown](https://github.com/emmatown)! - Added `@emotion/pkg-renaming` rule for Emotion 11 migration.

* [`8b59959f`](https://github.com/emotion-js/emotion/commit/8b59959f0929799f050089b05cafb39ca2c57d2d) [#1659](https://github.com/emotion-js/emotion/pull/1659) Thanks [@Andarist](https://github.com/Andarist)! - Respect `syntax-preference` rule when using css prop.

* [`58e8c110`](https://github.com/emotion-js/emotion/commit/58e8c110a6d307ef89513015476d6c50d19e77b1) [#2034](https://github.com/emotion-js/emotion/pull/2034) Thanks [@Andarist](https://github.com/Andarist)! - ESLint 7 has been added to the peer dependency range (ESLint 6 keeps being supported).

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

### Minor Changes

- [`58e8c110`](https://github.com/emotion-js/emotion/commit/58e8c110a6d307ef89513015476d6c50d19e77b1) [#2034](https://github.com/emotion-js/emotion/pull/2034) Thanks [@Andarist](https://github.com/Andarist)! - ESLint 7 has been added to the peer dependency range (ESLint 6 keeps being supported).

## 11.0.0-next.10

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@emmatown](https://github.com/emmatown)! - Rename `eslint-plugin-emotion` to `@emotion/eslint-plugin`. Please replace `"plugins": ["emotion"]` with `"plugins": ["@emotion"]` and `emotion/` with `@emotion/` in your rules config in your ESLint config.

### Minor Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@emmatown](https://github.com/emmatown)! - Add @emotion/pkg-renaming rule for Emotion 11 migration

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@emmatown](https://github.com/emmatown)! - Update build tool
  - [4ae88942](https://github.com/emotion-js/emotion/commit/4ae88942) [#1402](https://github.com/emotion-js/emotion/pull/1402) Thanks [@ahutchings](https://github.com/ahutchings)! - jsx-import rule: Add jsx specifier to existing import from @emotion/core when auto-fixing
