# emotion

## 11.7.1

### Patch Changes

- [#2590](https://github.com/emotion-js/emotion/pull/2590) [`1554a7e2`](https://github.com/emotion-js/emotion/commit/1554a7e264e05780b2c5bd74ccb20a92005ba61d) Thanks [@Andarist](https://github.com/Andarist)! - Upgraded and pinned the version of Stylis - the CSS parser that Emotion uses under the hood.

- Updated dependencies [[`1554a7e2`](https://github.com/emotion-js/emotion/commit/1554a7e264e05780b2c5bd74ccb20a92005ba61d)]:
  - @emotion/babel-plugin@11.7.1
  - @emotion/cache@11.7.1

## 11.5.0

### Patch Changes

- [#2498](https://github.com/emotion-js/emotion/pull/2498) [`e5beae8e`](https://github.com/emotion-js/emotion/commit/e5beae8e320f3d1455e45efecdfeb7d757687a43) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an edge case issue with incorrect rules being generated. When a context selector (`&`) was used not at the beginning of a selector (which is not valid SCSS but is allowed by the Stylis parser that we are using) within a group of selectors containing a pseudoclass then it was not replaced correctly with the current context selector.

- Updated dependencies [[`e5beae8e`](https://github.com/emotion-js/emotion/commit/e5beae8e320f3d1455e45efecdfeb7d757687a43), [`9ae4a91a`](https://github.com/emotion-js/emotion/commit/9ae4a91a08a6f7c5ca26a585f1c271a179db4623), [`f2eda829`](https://github.com/emotion-js/emotion/commit/f2eda8295429dd1892a06cbc9496321f2a55c10a)]:
  - @emotion/cache@11.5.0
  - @emotion/sheet@1.0.3

## 11.1.3

### Patch Changes

- [`704b0092`](https://github.com/emotion-js/emotion/commit/704b0092ebba648c3937cc281e4d549565968201) [#2180](https://github.com/emotion-js/emotion/pull/2180) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with global styles containing pseudo selectors in at-rules not being able to be inserted.

- Updated dependencies [[`704b0092`](https://github.com/emotion-js/emotion/commit/704b0092ebba648c3937cc281e4d549565968201)]:
  - @emotion/cache@11.1.3

## 11.0.0

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `emotion` to `@emotion/css`. Please change any imports of `emotion` to import `@emotion/css` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

* [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Move create `create-emotion` to `@emotion/css/create-instance`. Please change any imports of `create-emotion` to import `@emotion/css/create-instance` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

- [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - The `key` option is now required when creating a custom instance of a cache. Please make sure it's unique (and not equal to `'css'`) as it's used for linking styles to your cache. If multiple caches share the same key they might "fight" for each other's style elements.

* [`5bea60b1`](https://github.com/emotion-js/emotion/commit/5bea60b1ffab85fbc965532006c3a94ea139f0bf) [#1807](https://github.com/emotion-js/emotion/pull/1807) Thanks [@Andarist](https://github.com/Andarist)! - Removed support for interpolating class names returned from `css`, so this will no longer be possible:

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

* [`843bfb11`](https://github.com/emotion-js/emotion/commit/843bfb1153ee0dbe33d005fdd5c5be185daa5c41) [#1630](https://github.com/emotion-js/emotion/pull/1630) Thanks [@Andarist](https://github.com/Andarist)! - Removed default export from `@emotion/css` - it's main purpose was to allow `css` to be a Babel macro, but since babel-plugin-macros allows us to keep imports nowadays this is no longer needed. `@emotion/react/macro` has been added to account for this use case and appropriate changes has been made to `@emotion/babel-plugin` to facilitate those changes.

  If you have used `@emotion/css` directly (it was always reexported from `@emotion/react`) or you have been using its macro then you should update your code like this:

  ```diff
  -import css from '@emotion/css'
  +import { css } from '@emotion/react'

  // or
  -import css from '@emotion/css/macro'
  +import { css } from '@emotion/react/macro'
  ```

  You can also use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin` to do this for you.

* [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - The parser we use ([Stylis](https://github.com/thysultan/stylis.js)) got upgraded. It fixes some long-standing parsing edge cases while being smaller and faster 🚀

  It has been completely rewritten and comes with some breaking changes. The most notable ones that might affect Emotion users are:

  - plugins written for the former Stylis v3 are not compatible with the new version. To learn more on how to write a plugin for Stylis v4 you can check out its [README](https://github.com/thysultan/stylis.js#middleware) and the source code of core plugins.
  - vendor-prefixing was previously customizable using `prefix` option. This was always limited to turning off all of some of the prefixes as all available prefixes were on by default. The `prefix` option is gone and to customize which prefixes are applied you need to fork (copy-paste) the prefixer plugin and adjust it to your needs. While this being somewhat more problematic to setup at first we believe that the vast majority of users were not customizing this anyway. By not including the possibility to customize this through an extra option the final solution is more performant because there is no extra overhead of checking if a particular property should be prefixed or not.
  - the prefixer is now just a plugin which happens to be included in the default `stylisPlugins`. If you plan to use custom `stylisPlugins` and you want to have your styles prefixed automatically you must include prefixer in your custom `stylisPlugins`. You can import `prefixer` from the `stylis` module to do that.
  - `@import` rules are no longer special-cased. The responsibility to put them first has been moved to the author of the styles. They also can't be nested within other rules now. It's only possible to write them at the top level of global styles.

- [`cf56694`](https://github.com/emotion-js/emotion/commit/cf56694d54d0b2bd6208f561d8ce829da4918952) [#2088](https://github.com/emotion-js/emotion/pull/2088) Thanks [@Andarist](https://github.com/Andarist)! - UMD filenames have been changed.

### Minor Changes

- [`5d692a6a`](https://github.com/emotion-js/emotion/commit/5d692a6a8102b3faabefb773dd0145b123668a07) [#1956](https://github.com/emotion-js/emotion/pull/1956) Thanks [@eps1lon](https://github.com/eps1lon)! - Upgraded [`csstype`](https://www.npmjs.com/package/csstype) dependency to its v3. This is what we use to provide TypeScript typings for object styles. The upgrade should not affect any consuming code but it's worth mentioning if any edge case scenarios arise.

### Patch Changes

- [`6d32d82b`](https://github.com/emotion-js/emotion/commit/6d32d82beb45b18e5f18a37932b862ad19b17044) [#1848](https://github.com/emotion-js/emotion/pull/1848) Thanks [@osdiab](https://github.com/osdiab)! - Added `speedy` method to the TS type declaration of the `sheet` object available on Emotion instances. In addition to that - `StyleSheet` type is no longer exported from this package and instead `CSSStyleSheet` is available now. The `StyleSheet` type might still be imported from `@emotion/sheet`, but it has no `speedy` method and thus it's not the same as what is available in this package as `CSSStyleSheet`.

- Updated dependencies [[`c672175b`](https://github.com/emotion-js/emotion/commit/c672175b52e86de43b3d4092a8fe34b2023ceae8), [`a8eb4e75`](https://github.com/emotion-js/emotion/commit/a8eb4e75eed26763dc4f82ddd9bb49af4552768b), [`e3d7db87`](https://github.com/emotion-js/emotion/commit/e3d7db87deaac95817404760112417ac1fa1b56d), [`8a896a31`](https://github.com/emotion-js/emotion/commit/8a896a31434a1d2f69e1f1467c446c884c929387), [`42df3f3b`](https://github.com/emotion-js/emotion/commit/42df3f3bc01526eed61cedba106d86b9e3807f9d), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1), [`4a891bf6`](https://github.com/emotion-js/emotion/commit/4a891bf6a30e3bb37f8f32031fa75a571c637d9c), [`5e803106`](https://github.com/emotion-js/emotion/commit/5e803106d391b7c036bdf634318b80337a1d9b70), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`1e4a741d`](https://github.com/emotion-js/emotion/commit/1e4a741de6424d3d9c1f3ca9695e1953bed3a194), [`debaad9a`](https://github.com/emotion-js/emotion/commit/debaad9ab4bd6c80312092826d9146f3d29c0899), [`0a4a22ff`](https://github.com/emotion-js/emotion/commit/0a4a22ffcfaa49d09a88856ef2d51e0d53e31b6d), [`5c55fd17`](https://github.com/emotion-js/emotion/commit/5c55fd17dcaec84d1f5d5d13ae90dd336d7e4403), [`b0ad4f0c`](https://github.com/emotion-js/emotion/commit/b0ad4f0c628813a42c4637857be9a969429db6f0), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`c65c5d88`](https://github.com/emotion-js/emotion/commit/c65c5d887002d76557eaefcb98091d795b13f9a9), [`5c7ec859`](https://github.com/emotion-js/emotion/commit/5c7ec85904633a11185066fa591dc8969f3f2ff2), [`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85), [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71), [`c7850e61`](https://github.com/emotion-js/emotion/commit/c7850e61211d6aa26a3388399889a6072ee2f1fe), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d), [`39be057b`](https://github.com/emotion-js/emotion/commit/39be057b1a0c6b76f2cb7a455cb8bc35fe875ba0), [`b7d21373`](https://github.com/emotion-js/emotion/commit/b7d21373d967d0f958dd59aaaa650047e23e8e8b), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d), [`5d692a6a`](https://github.com/emotion-js/emotion/commit/5d692a6a8102b3faabefb773dd0145b123668a07), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`c6431074`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b), [`828111cd`](https://github.com/emotion-js/emotion/commit/828111cd32d3fe8c984231201e518d1b6000bffd), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf)]:
  - @emotion/babel-plugin@11.0.0
  - @emotion/cache@11.0.0
  - @emotion/serialize@1.0.0
  - @emotion/sheet@1.0.0
  - @emotion/utils@1.0.0

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

### Patch Changes

- Updated dependencies [[`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63)]:
  - @emotion/babel-plugin@11.0.0-rc.0
  - @emotion/cache@11.0.0-rc.0
  - @emotion/serialize@1.0.0-rc.0
  - @emotion/sheet@1.0.0-rc.0
  - @emotion/utils@1.0.0-rc.0

## 11.0.0-next.19

### Patch Changes

- Updated dependencies [[`42df3f3b`](https://github.com/emotion-js/emotion/commit/42df3f3bc01526eed61cedba106d86b9e3807f9d), [`42df3f3b`](https://github.com/emotion-js/emotion/commit/42df3f3bc01526eed61cedba106d86b9e3807f9d)]:
  - @emotion/sheet@1.0.0-next.5
  - @emotion/cache@11.0.0-next.19

## 11.0.0-next.17

### Patch Changes

- Updated dependencies [[`76e3dc4d`](https://github.com/emotion-js/emotion/commit/76e3dc4dd3e76423aa5d527b3e66fe3be1722e5a)]:
  - @emotion/serialize@1.0.0-next.5
  - @emotion/babel-plugin@11.0.0-next.17

## 11.0.0-next.16

### Patch Changes

- Updated dependencies [[`a8eb4e75`](https://github.com/emotion-js/emotion/commit/a8eb4e75eed26763dc4f82ddd9bb49af4552768b), [`dfe98028`](https://github.com/emotion-js/emotion/commit/dfe98028451a27c5190fa1ba138e51ef3d6d9be1), [`debaad9a`](https://github.com/emotion-js/emotion/commit/debaad9ab4bd6c80312092826d9146f3d29c0899), [`39be057b`](https://github.com/emotion-js/emotion/commit/39be057b1a0c6b76f2cb7a455cb8bc35fe875ba0), [`39be057b`](https://github.com/emotion-js/emotion/commit/39be057b1a0c6b76f2cb7a455cb8bc35fe875ba0)]:
  - @emotion/cache@11.0.0-next.16
  - @emotion/utils@1.0.0-next.1
  - @emotion/sheet@1.0.0-next.4
  - @emotion/serialize@0.11.15-next.4
  - @emotion/babel-plugin@11.0.0-next.16

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

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Move create `create-emotion` to `@emotion/css/create-instance`. Please change any imports of `create-emotion` to import `@emotion/css/create-instance` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

* [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `emotion` to `@emotion/css`. Please change any imports of `emotion` to import `@emotion/css` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

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
