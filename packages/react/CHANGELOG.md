# @emotion/react

## 11.0.0-next.13

### Major Changes

- [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - The parser we use ([Stylis](https://github.com/thysultan/stylis.js)) got upgraded. It fixes some long-standing parsing edge cases while being smaller and faster 🚀

  It has been completely rewritten and comes with some breaking changes. Most notable ones that might affect Emotion users are:

  - plugins written for the former Stylis v3 are not compatible with the new version. To learn more on how to write a plugin for Stylis v4 you can check out its [README](https://github.com/thysultan/stylis.js#middleware) and the source code of core plugins.
  - vendor-prefixing was previously customizable using `prefix` option. This was always limited to turning off all of some of the prefixes as all available prefixes were on by default. The `prefix` option is gone and to customize which prefixes are applied you need to fork (copy-paste) the prefixer plugin and adjust it to your needs. While this being somewhat more problematic to setup at first we believe that the vast majority of users were not customizing this anyway. By not including the possibility to customize this through an extra option the final solution is more performant because there is no extra overhead of checking if a particular property should be prefixed or not.
  - Prefixer is now just a plugin which happens to be put in default `stylisPlugins`. If you plan to use custom `stylisPlugins` and you want to have your styles prefixed automatically you must include prefixer in your custom `stylisPlugins`. You can import `prefixer` from the `stylis` module to do that.
  - `@import` rules are no longer special-cased. The responsibility to put them first has been moved to the author of the styles. They also can't be nested within other rules now. It's only possible to write them at the top level of global styles.

### Patch Changes

- Updated dependencies [[`91046a8c`](https://github.com/emotion-js/emotion/commit/91046a8c188327a65daac61583ef3c4458f30afb), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf)]:
  - @emotion/sheet@1.0.0-next.2
  - @emotion/cache@11.0.0-next.13
  - @emotion/css@11.0.0-next.13
  - @emotion/styled@11.0.0-next.13
  - @emotion/utils@1.0.0-next.0
  - @emotion/server@11.0.0-next.13
  - @emotion/serialize@0.11.15-next.2

## 11.0.0-next.12

### Major Changes

- [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - `[data-emotion]` attribute on SSRed styled has changed. You should never rely on it though.

### Patch Changes

- [`7dea6d7a`](https://github.com/emotion-js/emotion/commit/7dea6d7a9a87f00cf9b695b58a2f65b67e17fabd) [#1734](https://github.com/emotion-js/emotion/pull/1734) Thanks [@Andarist](https://github.com/Andarist)! - Fixed styles inserted by `<Global/>` component not inheriting `speedy` option from a cache passed to a wrapping `<CacheProvider/>`.

* [`be2eb614`](https://github.com/emotion-js/emotion/commit/be2eb614d2bc369a382dbc6aa347f66801605f3b) [#1806](https://github.com/emotion-js/emotion/pull/1806) Thanks [@Andarist](https://github.com/Andarist)! - Do not warn about `@emotion/react` being loaded twice in Jest. For some reason Jest sometimes evaluates modules twice when `jest.mock` is being called.

- [`75e2f9e1`](https://github.com/emotion-js/emotion/commit/75e2f9e1848bc0161f8db3c663438ada3042ae66) [#1810](https://github.com/emotion-js/emotion/pull/1810) Thanks [@Andarist](https://github.com/Andarist)! - Add a dev-only warning about styles created with `css` from `@emotion/react` being passed to `cx` from `<ClassNames/>`.

- Updated dependencies [[`e3d7db87`](https://github.com/emotion-js/emotion/commit/e3d7db87deaac95817404760112417ac1fa1b56d), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d), [`5bea60b1`](https://github.com/emotion-js/emotion/commit/5bea60b1ffab85fbc965532006c3a94ea139f0bf), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d)]:
  - @emotion/serialize@1.0.0-next.1
  - @emotion/server@11.0.0-next.12
  - @emotion/styled@11.0.0-next.12
  - @emotion/cache@11.0.0-next.12
  - @emotion/css@11.0.0-next.12

## 11.0.0-next.11

### Patch Changes

- Updated dependencies [[`f08ef5a3`](https://github.com/emotion-js/emotion/commit/f08ef5a316c1d05bff8e7f3690781e1089a263c6), [`b79781f8`](https://github.com/emotion-js/emotion/commit/b79781f81ccf100e83f533e2edb641816f85e5e1)]:
  - @emotion/serialize@0.11.15-next.4
  - @emotion/styled@11.0.0-next.11
  - @emotion/css@11.0.0-next.11

## 11.0.0-next.10

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `@emotion/core` to `@emotion/react`. Please change any imports of `@emotion/core` to import `@emotion/react` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

### Patch Changes

- [`affed3dd`](https://github.com/emotion-js/emotion/commit/affed3ddf03671835356632f26a064f59811852f) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@Andarist](https://github.com/Andarist)! - Fix issue with published TypeScript test files augmenting Theme interface.

* [`d62d9101`](https://github.com/emotion-js/emotion/commit/d62d9101bc75e6bc9644ae588d2a6e4bf4d69285) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@ajs139](https://github.com/ajs139)! - Warn if @emotion/react is initialized more than once in the same development environment.
* Updated dependencies [[`1e4a741d`](https://github.com/emotion-js/emotion/commit/1e4a741de6424d3d9c1f3ca9695e1953bed3a194), [`2fa7a213`](https://github.com/emotion-js/emotion/commit/2fa7a213222fc2bb99ca0a01078148f1a1c6458d), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71)]:
  - @emotion/sheet@0.10.0-next.1
  - @emotion/styled@11.0.0-next.10
  - @emotion/css@11.0.0-next.10
  - @emotion/server@11.0.0-next.10
  - @emotion/cache@11.0.0-next.10

## 11.0.0-next.7

### Patch Changes

- [`5c55fd17`](https://github.com/emotion-js/emotion/commit/5c55fd17dcaec84d1f5d5d13ae90dd336d7e4403) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@Andarist](https://github.com/Andarist)! - Fix to what location generated source maps are pointing in case of composed styles.
- Updated dependencies [[`5c55fd17`](https://github.com/emotion-js/emotion/commit/5c55fd17dcaec84d1f5d5d13ae90dd336d7e4403), [`729ef9d8`](https://github.com/emotion-js/emotion/commit/729ef9d8408af82c7a63effc1b8728f79c66bed1)]:
  - @emotion/serialize@0.11.15-next.2
  - @emotion/styled@11.0.0-next.7

## 11.0.0-next.6

### Major Changes

- [`843bfb11`](https://github.com/emotion-js/emotion/commit/843bfb1153ee0dbe33d005fdd5c5be185daa5c41) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@Andarist](https://github.com/Andarist)! - Removed `@emotion/css` - it's main purpose was to allow `css` to be a Babel macro, but since babel-plugin-macros allows us to keep imports nowadays this is no longer needed. `@emotion/core/macro` has been added to account for this use case and appropriate changes has been made to `babel-plugin-emotion` to facilitate those changes.

  If you have used `@emotion/css` directly (it was always reexported from `@emotion/core`) or you have been using its macro then you should update your code like this:

  ```diff
  -import css from '@emotion/css'
  +import { css } from '@emotion/core'

  // or
  -import css from '@emotion/css/macro'
  +import { css } from '@emotion/core/macro'
  ```

- [`cbb8b796`](https://github.com/emotion-js/emotion/commit/cbb8b7965c2923cf1922d724de556374323bff61) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@Andarist](https://github.com/Andarist)! - `emotion-theming` has been removed and all its exports were moved to `@emotion/core` package. Please import them like this `import { useTheme, ThemeProvider, withTheme } from '@emotion/core'` from now on.

### Minor Changes

- [`828111cd`](https://github.com/emotion-js/emotion/commit/828111cd32d3fe8c984231201e518d1b6000bffd) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@Andarist](https://github.com/Andarist)! - `Global` imported from macro entry (`@emotion/core/macro`) gets source maps generated now when inline css-less expression is used as value of the `styles` prop.

### Patch Changes

- Updated dependencies [[`923ded01`](https://github.com/emotion-js/emotion/commit/923ded01e2399a242206d590f6646f13aba110e4), [`4a891bf6`](https://github.com/emotion-js/emotion/commit/4a891bf6a30e3bb37f8f32031fa75a571c637d9c), [`843bfb11`](https://github.com/emotion-js/emotion/commit/843bfb1153ee0dbe33d005fdd5c5be185daa5c41)]:
  - @emotion/styled@11.0.0-next.6
  - @emotion/cache@11.0.0-next.6
  - @emotion/sheet@0.10.0-next.0
  - @emotion/css@11.0.0-next.6

## 11.0.0-next.5

### Patch Changes

- Updated dependencies [[`ad77ed24`](https://github.com/emotion-js/emotion/commit/ad77ed24b4bfe62d6c80f0498cd7e76863e2f28e), [`99c6b7e2`](https://github.com/emotion-js/emotion/commit/99c6b7e2f65fb7eddb2863b393e2110dbc4810d8)]:
  - @emotion/styled@11.0.0-next.5
  - emotion-theming@11.0.0-next.5

## 11.0.0-next.4

### Patch Changes

- Updated dependencies [[`e6e079c3`](https://github.com/emotion-js/emotion/commit/e6e079c35074f027ac0586792e4f19595ac18c55)]:
  - @emotion/styled@11.0.0-next.4
  - emotion-theming@11.0.0-next.4

## 11.0.0-next.3

### Patch Changes

- [`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@Andarist](https://github.com/Andarist)! - Add missing `#__PURE__` annotations
- Updated dependencies [[`8a896a31`](https://github.com/emotion-js/emotion/commit/8a896a31434a1d2f69e1f1467c446c884c929387), [`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85), [`f9feab1a`](https://github.com/emotion-js/emotion/commit/f9feab1a5d1ca88e53c3f7a063be5d5871cc93e8)]:
  - @emotion/serialize@0.11.15-next.1
  - @emotion/styled@11.0.0-next.3
  - @emotion/css@11.0.0-next.3
  - emotion-theming@11.0.0-next.3

## 11.0.0-next.2

### Major Changes

- [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Use hooks internally for improved bundle size and a better tree in React DevTools

### Patch Changes

- Updated dependencies [[`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967), [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967)]:
  - @emotion/styled@11.0.0-next.2
  - emotion-theming@11.0.0-next.2

## 11.0.0-next.1

### Patch Changes

- Updated dependencies [[`1eaa3a38`](https://github.com/emotion-js/emotion/commit/1eaa3a389876d4a623ce66735dc6db093cb2a8e6), [`22935470`](https://github.com/emotion-js/emotion/commit/2293547000ce78d044d054d17564f6c2aa670687)]:
  - @emotion/css@11.0.0-next.1
  - emotion-theming@11.0.0-next.1
  - @emotion/serialize@1.0.0-next.0
  - @emotion/styled@11.0.0-next.1

## 11.0.0-next.0

### Major Changes

- [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Ensure packages are major bumped so that pre-release versions of the linked packages are consistent in the major number

### Patch Changes

- Updated dependencies [[`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555)]:
  - @emotion/cache@11.0.0-next.0
  - @emotion/css@11.0.0-next.0
  - emotion@11.0.0-next.0
  - emotion-server@11.0.0-next.0
  - emotion-theming@11.0.0-next.0
  - @emotion/styled@11.0.0-next.0

## 10.0.28

### Patch Changes

- [`d0b2a94`](https://github.com/emotion-js/emotion/commit/d0b2a94ab9d5648667447dbd78e7a2e3e93de42a) [#1714](https://github.com/emotion-js/emotion/pull/1714) Thanks [@Andarist](https://github.com/Andarist)! - Fixed label extraction from the stack traces in FireFox and Safari. We have failed to match a label in Emotion wrappers like Theme UI which caused SSR mismatches in mentioned browsers. This has affected only development builds.

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file
- Updated dependencies [[`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968)]:
  - @emotion/cache@10.0.27
  - @emotion/css@10.0.27
  - emotion-server@10.0.27
  - emotion-theming@10.0.27
  - emotion@10.0.27
  - @emotion/serialize@0.11.15
  - @emotion/sheet@0.9.4
  - @emotion/styled@10.0.27
  - @emotion/utils@0.11.3

## 10.0.22

### Patch Changes

- [`4fc5657a`](https://github.com/emotion-js/emotion/commit/4fc5657ac8d0002322321cfbfc254b7196d27387) [#1219](https://github.com/emotion-js/emotion/pull/1219) Thanks [@Andarist](https://github.com/Andarist)! - Add dev hint about css object being stringified by accident

* [`2fc75f26`](https://github.com/emotion-js/emotion/commit/2fc75f266b23cf48fb842953bc47eebcb5241cbd) [#1548](https://github.com/emotion-js/emotion/pull/1548) Thanks [@Andarist](https://github.com/Andarist)! - Accept objects as `className` in jsx-created components (they are stringified) to match React behavior

- [`10211951`](https://github.com/emotion-js/emotion/commit/10211951051729b149930a8646de14bae9ae1bbc) [#1553](https://github.com/emotion-js/emotion/pull/1553) Thanks [@Andarist](https://github.com/Andarist)! - Add dev warning about keyframes being interpolated into plain strings.

* [`57a767ea`](https://github.com/emotion-js/emotion/commit/57a767ea3dd18eefbbdc7269cc13128caad65286) [#1560](https://github.com/emotion-js/emotion/pull/1560) Thanks [@Andarist](https://github.com/Andarist)! - Fix composition of styles without a final semicolon in a declaration block

* Updated dependencies [[`4fc5657a`](https://github.com/emotion-js/emotion/commit/4fc5657ac8d0002322321cfbfc254b7196d27387), [`10211951`](https://github.com/emotion-js/emotion/commit/10211951051729b149930a8646de14bae9ae1bbc), [`57a767ea`](https://github.com/emotion-js/emotion/commit/57a767ea3dd18eefbbdc7269cc13128caad65286), [`c3f0bc10`](https://github.com/emotion-js/emotion/commit/c3f0bc101833fff1ee4e27c7a730b821a7df4a15), [`11bea3a8`](https://github.com/emotion-js/emotion/commit/11bea3a89f38f9052c692c3df050ad802b6b954c)]:
  - @emotion/serialize@0.11.12
  - @emotion/styled@10.0.22
  - @emotion/css@10.0.22

## 10.0.21

### Patch Changes

- [7855db4a](https://github.com/emotion-js/emotion/commit/7855db4ae379f212e7b972b9108419154e17ed45) [#1537](https://github.com/emotion-js/emotion/pull/1537) Thanks [@Andarist](https://github.com/Andarist)! - Add missing `/* #__PURE__ */` annotation to creation of EmotionCssPropInternal

## 10.0.20

### Patch Changes

- [38bb2b19](https://github.com/emotion-js/emotion/commit/38bb2b19d4ff1552116829e068664516d167a3f8) [#1530](https://github.com/emotion-js/emotion/pull/1530) Thanks [@Andarist](https://github.com/Andarist)! - Fix class not being applied when putting nil as css prop value on wrapper component

## 10.0.17

### Patch Changes

- [66cda641](https://github.com/emotion-js/emotion/commit/66cda64128631790b81e3c9df273a972358ea593) [#1478](https://github.com/emotion-js/emotion/pull/1478) Thanks [@Andarist](https://github.com/Andarist)! - Add warnings about using illegal escape sequences
  - [10514a86](https://github.com/emotion-js/emotion/commit/10514a8635dcaa55b85c7bff90e2a9e14d1ba61f) [#1482](https://github.com/emotion-js/emotion/pull/1482) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Remove react native bundles in favour of different isBrowser detection
  - [66cda641](https://github.com/emotion-js/emotion/commit/66cda64128631790b81e3c9df273a972358ea593) [#1478](https://github.com/emotion-js/emotion/pull/1478) Thanks [@Andarist](https://github.com/Andarist)! - Update Babel dependencies

## 10.0.16

### Patch Changes

- [47262b64](https://github.com/emotion-js/emotion/commit/47262b64) - Fix labels from stack traces in some cases

## 10.0.15

### Patch Changes

- [188dc0e7](https://github.com/emotion-js/emotion/commit/188dc0e7) [#1443](https://github.com/emotion-js/emotion/pull/1443) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Extract styles rather than inline them in compat mode with the Global component
  - [4a3b18a2](https://github.com/emotion-js/emotion/commit/4a3b18a2) [#1451](https://github.com/emotion-js/emotion/pull/1451) Thanks [@Andarist](https://github.com/Andarist)! - Fixed issue with auto-labelling crashing on \$ at runtime

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool
