# @emotion/babel-plugin

## 11.9.2

### Patch Changes

- [#2721](https://github.com/emotion-js/emotion/pull/2721) [`ae0f650b`](https://github.com/emotion-js/emotion/commit/ae0f650b5ad8ef658b61edca6157fe208be23b43) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue in the minifying logic that could remove rules with the same context values as their parent rules. Like in the example below:

  ```js
  styled.div`
    > div {
      color: blue;

      > div {
        color: hotpink;
      }
    }
  `
  ```

## 11.7.2

### Patch Changes

- [#2585](https://github.com/emotion-js/emotion/pull/2585) [`b830c7dc`](https://github.com/emotion-js/emotion/commit/b830c7dc9da1c75c88e655150f04ef52b8176212) Thanks [@Andarist](https://github.com/Andarist)! - Fixed label extraction crashing in some cases involving variable declarations with array and object patterns.

* [#2585](https://github.com/emotion-js/emotion/pull/2585) [`b830c7dc`](https://github.com/emotion-js/emotion/commit/b830c7dc9da1c75c88e655150f04ef52b8176212) Thanks [@kddc](https://github.com/kddc), [@Andarist](https://github.com/Andarist)! - Improved label extraction for named function expressions and anonymous functions used as object property values.

- [#2602](https://github.com/emotion-js/emotion/pull/2602) [`b02f349d`](https://github.com/emotion-js/emotion/commit/b02f349d28df7bc77cad6d7e1b62aecef9f19405) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with styled transformer sometimes not using the used local name for the imported named export when used with `importMap`.

## 11.7.1

### Patch Changes

- [#2590](https://github.com/emotion-js/emotion/pull/2590) [`1554a7e2`](https://github.com/emotion-js/emotion/commit/1554a7e264e05780b2c5bd74ccb20a92005ba61d) Thanks [@Andarist](https://github.com/Andarist)! - Upgraded and pinned the version of Stylis - the CSS parser that Emotion uses under the hood.

## 11.3.0

### Minor Changes

- [`36a51c27`](https://github.com/emotion-js/emotion/commit/36a51c273d9dd5ab95367fbcf95cd809bb625f28) [#2340](https://github.com/emotion-js/emotion/pull/2340) Thanks [@Andarist](https://github.com/Andarist)! - Added support for label extraction from object methods.

### Patch Changes

- [`36a51c27`](https://github.com/emotion-js/emotion/commit/36a51c273d9dd5ab95367fbcf95cd809bb625f28) [#2340](https://github.com/emotion-js/emotion/pull/2340) Thanks [@Andarist](https://github.com/Andarist)! - Fixed a crash when extracting labels from object properties with string literal keys in certain situations.

- Updated dependencies [[`662f0e0f`](https://github.com/emotion-js/emotion/commit/662f0e0f888c8e80cf6b2d68b52ff1bb84cbdde5), [`830dd0e6`](https://github.com/emotion-js/emotion/commit/830dd0e6d071c98bc0b4b0ecc99dd21a93f057b9)]:
  - @emotion/serialize@1.0.2

## 11.2.0

### Patch Changes

- [`c9b57f36`](https://github.com/emotion-js/emotion/commit/c9b57f36e99f8cfe86c971ddb29c7a5d70644bc1) [#2157](https://github.com/emotion-js/emotion/pull/2157) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with `styled` transformer not respecting `autoLabel: 'dev-only'` setting.

## 11.1.2

### Patch Changes

- [`de378ab8`](https://github.com/emotion-js/emotion/commit/de378ab8693c74be5714c6c12ccc191ed2d7ac1a) [#2147](https://github.com/emotion-js/emotion/pull/2147) Thanks [@macalinao](https://github.com/macalinao)! - Fixed an issue with template strings minifier crashing on two consecutive interpolations without any meaningful string in between them.

- Updated dependencies [[`ee6a673f`](https://github.com/emotion-js/emotion/commit/ee6a673f74e934bf738d5346ddfc7982caa23827)]:
  - @emotion/memoize@0.7.5

## 11.0.0

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `babel-plugin-emotion` to `@emotion/babel-plugin`. Please replace `"plugins": ["emotion"]` with `"plugins": ["@emotion"]` in your Babel config.

* [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1) [#1220](https://github.com/emotion-js/emotion/pull/1220) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Removed support for the `instances` option, any usage of it should be replaced with the `importMap` option

* [`c65c5d88`](https://github.com/emotion-js/emotion/commit/c65c5d887002d76557eaefcb98091d795b13f9a9) [#1622](https://github.com/emotion-js/emotion/pull/1622) Thanks [@Andarist](https://github.com/Andarist)! - Drop Babel 6 support

- [`c7850e61`](https://github.com/emotion-js/emotion/commit/c7850e61211d6aa26a3388399889a6072ee2f1fe) [#1656](https://github.com/emotion-js/emotion/pull/1656) Thanks [@Andarist](https://github.com/Andarist)! - `autoLabel` option no longer is a simple boolean. Instead we accept now 3 values: `dev-only` (the default), `always` and `never`.

  Each possible value for this option produces different output code:

  - with `dev-only` we optimize the production code, so there are no labels added there, but at the same time we keep labels for development environments,
  - with `always` we always add labels when possible,
  - with `never` we disable this entirely and no labels are added.

* [`b7d21373`](https://github.com/emotion-js/emotion/commit/b7d21373d967d0f958dd59aaaa650047e23e8e8b) [#2080](https://github.com/emotion-js/emotion/pull/2080) Thanks [@Andarist](https://github.com/Andarist)! - `cssPropOptimization` defaults now to `true` regardless of the `@emotion/react` import presence.

### Minor Changes

- [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1) [#1220](https://github.com/emotion-js/emotion/pull/1220) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Added the `importMap` option which allows you to tell `@emotion/babel-plugin` what imports it should look at to determine what it should transform so if you re-export Emotion's exports, you can still use the Babel transforms

- [`c672175b`](https://github.com/emotion-js/emotion/commit/c672175b52e86de43b3d4092a8fe34b2023ceae8) [#1130](https://github.com/emotion-js/emotion/pull/1130) Thanks [@jtmthf](https://github.com/jtmthf)! - Adjust how arrays passed to css prop are transformed so function elements can be resolved at runtime.

* [`5e803106`](https://github.com/emotion-js/emotion/commit/5e803106d391b7c036bdf634318b80337a1d9b70) [#1893](https://github.com/emotion-js/emotion/pull/1893) Thanks [@Andarist](https://github.com/Andarist)! - Added support for converting assignment expressions to labels in cases like this:

  ```js
  styles = css``
  Timeline.Item = styled.li``
  Timeline.Item.Anchor = styled.a``
  ```

- [`0a4a22ff`](https://github.com/emotion-js/emotion/commit/0a4a22ffcfaa49d09a88856ef2d51e0d53e31b6d) [#1651](https://github.com/emotion-js/emotion/pull/1651) Thanks [@Andarist](https://github.com/Andarist)! - Allow `labelFormat` option to be a function.

* [`5c7ec859`](https://github.com/emotion-js/emotion/commit/5c7ec85904633a11185066fa591dc8969f3f2ff2) [#1805](https://github.com/emotion-js/emotion/pull/1805) Thanks [@Andarist](https://github.com/Andarist)! - Requirements for a label extraction have been relaxed. In certain situations it was previously required for a containing function to have a PascalCased name.

* [`828111cd`](https://github.com/emotion-js/emotion/commit/828111cd32d3fe8c984231201e518d1b6000bffd) [#1639](https://github.com/emotion-js/emotion/pull/1639) Thanks [@Andarist](https://github.com/Andarist)! - `Global` gets handled by the Babel plugin now - this gives inline css-less expressions source maps.

### Patch Changes

- [`b0ad4f0c`](https://github.com/emotion-js/emotion/commit/b0ad4f0c628813a42c4637857be9a969429db6f0) [#1602](https://github.com/emotion-js/emotion/pull/1602) Thanks [@Andarist](https://github.com/Andarist)! - Avoid transpiling vanilla emotion calls in already transpiled code to avoid double labels and such

* [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue in our tagged template expressions minifier which has caused whitespace before nested orphaned pseudo selectors being incorrectly removed. In a selector like `& :hover` the whitespace before colon has a semantic meaning and needs to be preserved.

* Updated dependencies [[`e3d7db87`](https://github.com/emotion-js/emotion/commit/e3d7db87deaac95817404760112417ac1fa1b56d), [`8a896a31`](https://github.com/emotion-js/emotion/commit/8a896a31434a1d2f69e1f1467c446c884c929387), [`5c55fd17`](https://github.com/emotion-js/emotion/commit/5c55fd17dcaec84d1f5d5d13ae90dd336d7e4403), [`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85), [`5d692a6a`](https://github.com/emotion-js/emotion/commit/5d692a6a8102b3faabefb773dd0145b123668a07), [`c6431074`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b)]:
  - @emotion/serialize@1.0.0

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

### Patch Changes

- Updated dependencies [[`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63)]:
  - @emotion/serialize@1.0.0-rc.0

## 11.0.0-next.17

### Patch Changes

- Updated dependencies [[`76e3dc4d`](https://github.com/emotion-js/emotion/commit/76e3dc4dd3e76423aa5d527b3e66fe3be1722e5a)]:
  - @emotion/serialize@1.0.0-next.5

## 11.0.0-next.16

### Patch Changes

- Updated dependencies []:
  - @emotion/serialize@0.11.15-next.4

## 11.0.0-next.15

### Patch Changes

- Updated dependencies [[`5d692a6a`](https://github.com/emotion-js/emotion/commit/5d692a6a8102b3faabefb773dd0145b123668a07)]:
  - @emotion/serialize@1.0.0-next.3

## 11.0.0-next.13

### Minor Changes

- [`5e803106`](https://github.com/emotion-js/emotion/commit/5e803106d391b7c036bdf634318b80337a1d9b70) [#1893](https://github.com/emotion-js/emotion/pull/1893) Thanks [@Andarist](https://github.com/Andarist)! - Added support for converting assignment expressions to labels in cases like this:

  ```js
  styles = css``
  Timeline.Item = styled.li``
  Timeline.Item.Anchor = styled.a``
  ```

### Patch Changes

- [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue in our tagged template expressions minifier which has caused whitespace before nested orphaned pseudo selectors being incorrectly removed. In a selector like `& :hover` the whitespace before colon has a semantic meaning and needs to be preserved.

- Updated dependencies []:
  - @emotion/serialize@0.11.15-next.2

## 11.0.0-next.12

### Minor Changes

- [`5c7ec859`](https://github.com/emotion-js/emotion/commit/5c7ec85904633a11185066fa591dc8969f3f2ff2) [#1805](https://github.com/emotion-js/emotion/pull/1805) Thanks [@Andarist](https://github.com/Andarist)! - Requirements for a label extraction have been relaxed. In certain situations it was previously required for a containing function to have a PascalCased name.

### Patch Changes

- [`e3d7db87`](https://github.com/emotion-js/emotion/commit/e3d7db87deaac95817404760112417ac1fa1b56d) [#1732](https://github.com/emotion-js/emotion/pull/1732) Thanks [@Andarist](https://github.com/Andarist)! - Fixed a regression from [a PR which has optimized Babel output](https://github.com/emotion-js/emotion/pull/1656) which has caused inserted label not being extracted correctly and also broke styles composition in certain situations.

- Updated dependencies [[`e3d7db87`](https://github.com/emotion-js/emotion/commit/e3d7db87deaac95817404760112417ac1fa1b56d)]:
  - @emotion/serialize@1.0.0-next.1

## 11.0.0-next.11

### Patch Changes

- Updated dependencies [[`f08ef5a3`](https://github.com/emotion-js/emotion/commit/f08ef5a316c1d05bff8e7f3690781e1089a263c6)]:
  - @emotion/serialize@0.11.15-next.4

## 11.0.0-next.10

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `babel-plugin-emotion` to `@emotion/babel-plugin`. Please replace `"plugins": ["emotion"]` with `"plugins": ["@emotion"]` in your Babel config.

* [`c7850e61`](https://github.com/emotion-js/emotion/commit/c7850e61211d6aa26a3388399889a6072ee2f1fe) [#1656](https://github.com/emotion-js/emotion/pull/1656) Thanks [@Andarist](https://github.com/Andarist)! - `autoLabel` option no longer is a simple boolean. Instead we accept now 3 values: `dev-only` (the default), `always` and `never`.

  Each possible value for this option produces different output code:

  - with `dev-only` we optimize the production code, so there are no labels added there, but at the same time we keep labels for development environments,
  - with `always` we always add labels when possible,
  - with `never` we disable this entirely and no labels are added.

## 11.0.0-next.6

### Major Changes

- [`843bfb11`](https://github.com/emotion-js/emotion/commit/843bfb1153ee0dbe33d005fdd5c5be185daa5c41) [#1630](https://github.com/emotion-js/emotion/pull/1630) Thanks [@Andarist](https://github.com/Andarist)! - Removed `@emotion/css` - it's main purpose was to allow `css` to be a Babel macro, but since babel-plugin-macros allows us to keep imports nowadays this is no longer needed. `@emotion/core/macro` has been added to account for this use case and appropriate changes has been made to `babel-plugin-emotion` to facilitate those changes.

  If you have used `@emotion/css` directly (it was always reexported from `@emotion/core`) or you have been using its macro then you should update your code like this:

  ```diff
  -import css from '@emotion/css'
  +import { css } from '@emotion/core'

  // or
  -import css from '@emotion/css/macro'
  +import { css } from '@emotion/core/macro'
  ```

### Minor Changes

- [`0a4a22ff`](https://github.com/emotion-js/emotion/commit/0a4a22ffcfaa49d09a88856ef2d51e0d53e31b6d) [#1651](https://github.com/emotion-js/emotion/pull/1651) Thanks [@Andarist](https://github.com/Andarist)! - Allow `labelFormat` option to be a function.

* [`828111cd`](https://github.com/emotion-js/emotion/commit/828111cd32d3fe8c984231201e518d1b6000bffd) [#1639](https://github.com/emotion-js/emotion/pull/1639) Thanks [@Andarist](https://github.com/Andarist)! - `Global` gets handled by the Babel plugin now - this gives inline css-less expressions source maps.

## 11.0.0-next.4

### Major Changes

- [`c65c5d88`](https://github.com/emotion-js/emotion/commit/c65c5d887002d76557eaefcb98091d795b13f9a9) [#973](https://github.com/emotion-js/emotion/pull/973) Thanks [@Andarist](https://github.com/Andarist)! - Drop Babel 6 support

## 11.0.0-next.3

### Major Changes

- [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1) [#1220](https://github.com/emotion-js/emotion/pull/1220) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Removed support for the `instances` option, any usage of it should be replaced with the `importMap` option

* [`f9feab1a`](https://github.com/emotion-js/emotion/commit/f9feab1a5d1ca88e53c3f7a063be5d5871cc93e8) [#1575](https://github.com/emotion-js/emotion/pull/1575) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Removed support for `@emotion/styled-base` package. It has been moved to `@emotion/styled` and is available as `@emotion/styled/base`. This simplifies how the regular and base versions relate to each other and eliminates problems with stricter package managers when `@emotion/styled-base` was not installed explicitly by a user.

### Minor Changes

- [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1) [#1220](https://github.com/emotion-js/emotion/pull/1220) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Added the `importMap` option which allows you to tell babel-plugin-emotion what imports it should look at to determine what it should transform so if you re-export Emotion's exports, you can still use the Babel transforms

### Patch Changes

- [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1) [#1220](https://github.com/emotion-js/emotion/pull/1220) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Fix issue with not updating referenced import when bailing out on already transpiled vanilla emotion nodes (a regression introduced in #1602)
- Updated dependencies [[`8a896a31`](https://github.com/emotion-js/emotion/commit/8a896a31434a1d2f69e1f1467c446c884c929387), [`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85)]:
  - @emotion/serialize@0.11.15-next.1

## 11.0.0-next.1

### Patch Changes

- Updated dependencies [[`1eaa3a38`](https://github.com/emotion-js/emotion/commit/1eaa3a389876d4a623ce66735dc6db093cb2a8e6)]:
  - @emotion/serialize@1.0.0-next.0

## 11.0.0-next.0

### Major Changes

- [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Ensure packages are major bumped so that pre-release versions of the linked packages are consistent in the major number

### Patch Changes

- [`b0ad4f0c`](https://github.com/emotion-js/emotion/commit/b0ad4f0c628813a42c4637857be9a969429db6f0) [#1602](https://github.com/emotion-js/emotion/pull/1602) Thanks [@Andarist](https://github.com/Andarist)! - Avoid transpiling vanilla emotion calls in already transpiled code to avoid double labels and such

## 10.0.33

### Patch Changes

- [`b9f8ae3`](https://github.com/emotion-js/emotion/commit/b9f8ae3f6e18b0569376b9ed62e9d09d141adff8) [#1829](https://github.com/emotion-js/emotion/pull/1829) Thanks [@Andarist](https://github.com/Andarist)! - Skip appending source maps & labels to Babel-transpiled tagged template expressions.

## 10.0.29

### Patch Changes

- Updated dependencies [[`446e756`](https://github.com/emotion-js/emotion/commit/446e75661c4aa01e51d1466472a212940c19cd82)]:
  - @emotion/hash@0.8.0
  - @emotion/serialize@0.11.16

## 10.0.28

### Patch Changes

- [`4dfe558`](https://github.com/emotion-js/emotion/commit/4dfe55811a25bf66306aee46f7f0d6c909004c42) [#1731](https://github.com/emotion-js/emotion/pull/1731) Thanks [@ndelangen](https://github.com/ndelangen)! - Fixed an issue with adding `label` & `target` options to `styled`-related calls when those properties were already set, causing those properties to be duplicated. This could have happened for example when transpiling already transpiled code or when providing those options manually (latter being less likely).

* [`af07afb`](https://github.com/emotion-js/emotion/commit/af07afbe5a887be82f72a12fd6cd1673a32f5263) [#1761](https://github.com/emotion-js/emotion/pull/1761) Thanks [@mansourkheffache](https://github.com/mansourkheffache)! - Push source maps & labels to cooked/raw arrays in TS-transpiled tagged template expressions containing interpolations. This is a case not covered previously by [#1538](https://github.com/emotion-js/emotion/pull/1538).

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file
- Updated dependencies [[`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968)]:
  - @emotion/hash@0.7.4
  - @emotion/memoize@0.7.4
  - @emotion/serialize@0.11.15

## 10.0.23

### Patch Changes

- [`3927293d`](https://github.com/emotion-js/emotion/commit/3927293d0b9d96b4a7c00196e8430728759b1161) [#1569](https://github.com/emotion-js/emotion/pull/1569) Thanks [@Andarist](https://github.com/Andarist)! - Add dev hint about css object (generated by Babel) being stringified by accident

* [`b3a0f148`](https://github.com/emotion-js/emotion/commit/b3a0f1484f2efcc78b447639ff2e0bc0f29915ae) [#1574](https://github.com/emotion-js/emotion/pull/1574) Thanks [@Andarist](https://github.com/Andarist)! - Fix babel plugin crashing when called programmatically without providing a filename

* Updated dependencies [[`a55f3d49`](https://github.com/emotion-js/emotion/commit/a55f3d49c2febdf7eb1bede3f12da13c3efa1399), [`ca95f385`](https://github.com/emotion-js/emotion/commit/ca95f385f7ce3da6d53de1a652b3b219f11434c4)]:
  - @emotion/serialize@0.11.14

## 10.0.22

### Patch Changes

- [`1bb3efe3`](https://github.com/emotion-js/emotion/commit/1bb3efe399ddf0f3332187f3c751fbba9326d02c) [#1554](https://github.com/emotion-js/emotion/pull/1554) Thanks [@Andarist](https://github.com/Andarist)! - Prepend appended label string with semicolon to avoid problems with declaration blocks without a final semicolon

- Updated dependencies [[`4fc5657a`](https://github.com/emotion-js/emotion/commit/4fc5657ac8d0002322321cfbfc254b7196d27387), [`10211951`](https://github.com/emotion-js/emotion/commit/10211951051729b149930a8646de14bae9ae1bbc), [`57a767ea`](https://github.com/emotion-js/emotion/commit/57a767ea3dd18eefbbdc7269cc13128caad65286)]:
  - @emotion/serialize@0.11.12

## 10.0.21

### Patch Changes

- [0eafebb5](https://github.com/emotion-js/emotion/commit/0eafebb5119212897f81084f63a807c02b0012fc) [#1538](https://github.com/emotion-js/emotion/pull/1538) Thanks [@Andarist](https://github.com/Andarist)! - Push source maps & labels to cooked/raw arrays in TS-transpiled tagged template expressions

## 10.0.20

### Patch Changes

- [1b3791d4](https://github.com/emotion-js/emotion/commit/1b3791d4c458838a097c815a38108c9719023b92) [#1526](https://github.com/emotion-js/emotion/pull/1526) Thanks [@ahutchings](https://github.com/ahutchings)! - Fix `autoLabel` crash on `css` used in expression assigned to an object pattern

## 10.0.19

- Updated dependencies [c81c0033]:
  - @emotion/serialize@0.11.11
  - @emotion/hash@0.7.3
  - @emotion/memoize@0.7.3

## 10.0.17

### Patch Changes

- [b22b4ca4](https://github.com/emotion-js/emotion/commit/b22b4ca460ec66ea313dd9ea9556bd7a2d04798c) [#1485](https://github.com/emotion-js/emotion/pull/1485) Thanks [@JSteunou](https://github.com/JSteunou)! - Fix `autoLabel` crash on `css` used as a computed key of an object

## 10.0.16

### Patch Changes

- [1ea9b3a6](https://github.com/emotion-js/emotion/commit/1ea9b3a6) - Fix an inconsistency with Babel config ordering in the README

## 10.0.15

### Patch Changes

- [4a3b18a2](https://github.com/emotion-js/emotion/commit/4a3b18a2) [#1451](https://github.com/emotion-js/emotion/pull/1451) Thanks [@Andarist](https://github.com/Andarist)! - Fixed issue with auto-labelling crashing on \$ at runtime
- [284f8fa](https://github.com/emotion-js/emotion/commit/284f8fa9e0d2926fa26346e63519f8db24e22cc7) [#1336](https://github.com/emotion-js/emotion/pull/1336) Thanks [@Zenwolf](https://github.com/Zenwolf)! - Keep CSS comments that include `@`

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool

## 10.0.13

### Patch Changes

- [7bad392c](https://github.com/emotion-js/emotion/commit/7bad392c) [#1387](https://github.com/emotion-js/emotion/pull/1387) Thanks [@mherodev](https://github.com/mherodev)! - Added object property auto label support for babel-plugin-emotion
