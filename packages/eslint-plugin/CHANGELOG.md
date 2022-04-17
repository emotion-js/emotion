# @emotion/eslint-plugin

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

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `eslint-plugin-emotion` to `@emotion/eslint-plugin`. Please replace `"plugins": ["emotion"]` with `"plugins": ["@emotion"]` and `emotion/` with `@emotion/` in your rules config in your ESLint config.

### Minor Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Added `@emotion/pkg-renaming` rule for Emotion 11 migration.

* [`8b59959f`](https://github.com/emotion-js/emotion/commit/8b59959f0929799f050089b05cafb39ca2c57d2d) [#1659](https://github.com/emotion-js/emotion/pull/1659) Thanks [@Andarist](https://github.com/Andarist)! - Respect `syntax-preference` rule when using css prop.

* [`58e8c110`](https://github.com/emotion-js/emotion/commit/58e8c110a6d307ef89513015476d6c50d19e77b1) [#2034](https://github.com/emotion-js/emotion/pull/2034) Thanks [@Andarist](https://github.com/Andarist)! - ESLint 7 has been added to the peer dependency range (ESLint 6 keeps being supported).

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

### Minor Changes

- [`58e8c110`](https://github.com/emotion-js/emotion/commit/58e8c110a6d307ef89513015476d6c50d19e77b1) [#2034](https://github.com/emotion-js/emotion/pull/2034) Thanks [@Andarist](https://github.com/Andarist)! - ESLint 7 has been added to the peer dependency range (ESLint 6 keeps being supported).

## 11.0.0-next.10

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `eslint-plugin-emotion` to `@emotion/eslint-plugin`. Please replace `"plugins": ["emotion"]` with `"plugins": ["@emotion"]` and `emotion/` with `@emotion/` in your rules config in your ESLint config.

### Minor Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Add @emotion/pkg-renaming rule for Emotion 11 migration

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool
  - [4ae88942](https://github.com/emotion-js/emotion/commit/4ae88942) [#1402](https://github.com/emotion-js/emotion/pull/1402) Thanks [@ahutchings](https://github.com/ahutchings)! - jsx-import rule: Add jsx specifier to existing import from @emotion/core when auto-fixing
