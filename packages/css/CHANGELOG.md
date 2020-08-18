# emotion

## 11.0.0-next.15

### Minor Changes

- [`5d692a6a`](https://github.com/emotion-js/emotion/commit/5d692a6a8102b3faabefb773dd0145b123668a07) [#1956](https://github.com/emotion-js/emotion/pull/1956) Thanks [@eps1lon](https://github.com/eps1lon)! - Upgraded [`csstype`](https://www.npmjs.com/package/csstype) dependency to its v3. This is what we use to provide TypeScript typings for object styles. The upgrade should not affect any consuming code but it's worth mentioning if any edge case scenarios arise.

### Patch Changes

- Updated dependencies [[`dc1a0c5e`](https://github.com/emotion-js/emotion/commit/dc1a0c5ed78b27fb7ce49b6296f2ca8631654cd1), [`5d692a6a`](https://github.com/emotion-js/emotion/commit/5d692a6a8102b3faabefb773dd0145b123668a07)]:
  - @emotion/sheet@1.0.0-next.3
  - @emotion/serialize@1.0.0-next.3
  - @emotion/cache@11.0.0-next.15
  - @emotion/babel-plugin@11.0.0-next.15

## 11.0.0-next.14

### Patch Changes

- [`6d32d82b`](https://github.com/emotion-js/emotion/commit/6d32d82beb45b18e5f18a37932b862ad19b17044) [#1848](https://github.com/emotion-js/emotion/pull/1848) Thanks [@osdiab](https://github.com/osdiab)! - Added `speedy` method to the TS type declaration of the `sheet` object available on Emotion instances. In addition to that - `StyleSheet` type is no longer exported from this package and instead `CSSStyleSheet` is available now. The `StyleSheet` type might still be imported from `@emotion/sheet`, but it has no `speedy` method and thus it's not the same as what is available in this package as `CSSStyleSheet`.

## 11.0.0-next.13

### Major Changes

- [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - The parser we use ([Stylis](https://github.com/thysultan/stylis.js)) got upgraded. It fixes some long-standing parsing edge cases while being smaller and faster 🚀

  It has been completely rewritten and comes with some breaking changes. Most notable ones that might affect Emotion users are:

  - plugins written for the former Stylis v3 are not compatible with the new version. To learn more on how to write a plugin for Stylis v4 you can check out its [README](https://github.com/thysultan/stylis.js#middleware) and the source code of core plugins.
  - vendor-prefixing was previously customizable using `prefix` option. This was always limited to turning off all of some of the prefixes as all available prefixes were on by default. The `prefix` option is gone and to customize which prefixes are applied you need to fork (copy-paste) the prefixer plugin and adjust it to your needs. While this being somewhat more problematic to setup at first we believe that the vast majority of users were not customizing this anyway. By not including the possibility to customize this through an extra option the final solution is more performant because there is no extra overhead of checking if a particular property should be prefixed or not.
  - Prefixer is now just a plugin which happens to be put in default `stylisPlugins`. If you plan to use custom `stylisPlugins` and you want to have your styles prefixed automatically you must include prefixer in your custom `stylisPlugins`. You can import `prefixer` from the `stylis` module to do that.
  - `@import` rules are no longer special-cased. The responsibility to put them first has been moved to the author of the styles. They also can't be nested within other rules now. It's only possible to write them at the top level of global styles.

### Patch Changes

- Updated dependencies [[`91046a8c`](https://github.com/emotion-js/emotion/commit/91046a8c188327a65daac61583ef3c4458f30afb), [`5e803106`](https://github.com/emotion-js/emotion/commit/5e803106d391b7c036bdf634318b80337a1d9b70), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf)]:
  - @emotion/sheet@1.0.0-next.2
  - @emotion/babel-plugin@11.0.0-next.13
  - @emotion/cache@11.0.0-next.13
  - @emotion/utils@1.0.0-next.0
  - @emotion/serialize@0.11.15-next.2

## 11.0.0-next.12

### Major Changes

- [`5bea60b1`](https://github.com/emotion-js/emotion/commit/5bea60b1ffab85fbc965532006c3a94ea139f0bf) [#1807](https://github.com/emotion-js/emotion/pull/1807) Thanks [@Andarist](https://github.com/Andarist)! - Removed support for interpolating class names returned from `css`, so this will no longer be possible:

  ```js
  const cls1 = css`
    color: blue;
  `
  const cls2 = css`
    & .${cls1} {
      color: red;
    }
  `
  ```

  This has already been deprecated for the lifetime of v10.

* [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - From now on `key` option is required when creating a custom instance. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache. If multiple caches share the same key they might "fight" for each other's style elements.

### Patch Changes

- Updated dependencies [[`e3d7db87`](https://github.com/emotion-js/emotion/commit/e3d7db87deaac95817404760112417ac1fa1b56d), [`5c7ec859`](https://github.com/emotion-js/emotion/commit/5c7ec85904633a11185066fa591dc8969f3f2ff2), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d), [`e3d7db87`](https://github.com/emotion-js/emotion/commit/e3d7db87deaac95817404760112417ac1fa1b56d), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d)]:
  - @emotion/serialize@1.0.0-next.1
  - @emotion/babel-plugin@11.0.0-next.12
  - @emotion/cache@11.0.0-next.12

## 11.0.0-next.11

### Patch Changes

- Updated dependencies [[`f08ef5a3`](https://github.com/emotion-js/emotion/commit/f08ef5a316c1d05bff8e7f3690781e1089a263c6)]:
  - @emotion/serialize@0.11.15-next.4
  - @emotion/babel-plugin@11.0.0-next.11

## 11.0.0-next.10

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Move create `create-emotion` to `@emotion/css/create-instance`. Please change any imports of `create-emotion` to import `@emotion/css/create-instance` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

* [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `emotion` to `@emotion/css`. Please change any imports of `emotion` to import `@emotion/css` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

### Patch Changes

- Updated dependencies [[`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`1e4a741d`](https://github.com/emotion-js/emotion/commit/1e4a741de6424d3d9c1f3ca9695e1953bed3a194), [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71), [`c7850e61`](https://github.com/emotion-js/emotion/commit/c7850e61211d6aa26a3388399889a6072ee2f1fe), [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71)]:
  - @emotion/babel-plugin@11.0.0-next.10
  - @emotion/sheet@0.10.0-next.1
  - @emotion/cache@11.0.0-next.10

## 11.0.0-next.0

### Major Changes

- [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Ensure packages are major bumped so that pre-release versions of the linked packages are consistent in the major number

### Patch Changes

- Updated dependencies [[`b0ad4f0c`](https://github.com/emotion-js/emotion/commit/b0ad4f0c628813a42c4637857be9a969429db6f0), [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555)]:
  - babel-plugin-emotion@11.0.0-next.0
  - create-emotion@11.0.0-next.0

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file
- Updated dependencies [[`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968)]:
  - babel-plugin-emotion@10.0.27
  - create-emotion@10.0.27
  - @emotion/stylis@0.8.5

## 10.0.23

### Patch Changes

- [`1ae94891`](https://github.com/emotion-js/emotion/commit/1ae948917326e2bc2bc978c59d04cb2695c72e38) [#1583](https://github.com/emotion-js/emotion/pull/1583) Thanks [@Andarist](https://github.com/Andarist)! - Export TS & Flow types for emotion/macro

- Updated dependencies [[`3927293d`](https://github.com/emotion-js/emotion/commit/3927293d0b9d96b4a7c00196e8430728759b1161), [`b3a0f148`](https://github.com/emotion-js/emotion/commit/b3a0f1484f2efcc78b447639ff2e0bc0f29915ae)]:
  - babel-plugin-emotion@10.0.23

## 10.0.17

### Patch Changes

- [66cda641](https://github.com/emotion-js/emotion/commit/66cda64128631790b81e3c9df273a972358ea593) [#1478](https://github.com/emotion-js/emotion/pull/1478) Thanks [@Andarist](https://github.com/Andarist)! - Add warnings about using illegal escape sequences

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool
