# @emotion/core

## 11.0.0

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `@emotion/core` to `@emotion/react`. Please change any imports of `@emotion/core` to import `@emotion/react` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

## 11.0.0-next.10

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `@emotion/core` to `@emotion/react`. Please change any imports of `@emotion/core` to import `@emotion/react` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

## 11.0.0-next.9

### Patch Changes

- Updated dependencies [[`8b59959`](https://github.com/emotion-js/emotion/commit/8b59959f0929799f050089b05cafb39ca2c57d2d)]:
  - @emotion/styled@11.0.0-next.9

## 11.0.0-next.8

### Major Changes

- [`c643107`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@joltmode](https://github.com/joltmode)! - Reworked TypeScript definitions so it's easier to provide a type for Theme. Instead of creating custom instances (like before) you can augment builtin Theme interface like this:

  ```ts
  declare module '@emotion/core' {
    export interface Theme {
      primaryColor: string
      secondaryColor: string
    }
  }
  ```

### Minor Changes

- [`c643107`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@joltmode](https://github.com/joltmode)! - Support functions in arrays passed to css prop and Global's styles prop. This allows for composition of theme-accepting functions.

### Patch Changes

- Updated dependencies [[`c643107`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b), [`c643107`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b)]:
  - @emotion/styled@11.0.0-next.8
  - @emotion/serialize@0.12.0-next.3
  - emotion@11.0.0-next.8
  - emotion-server@11.0.0-next.8

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

## 10.1.1

### Patch Changes

- [`fe30cbd6`](https://github.com/emotion-js/emotion/commit/fe30cbd60b131bd7017d574cc25215dcd04d1f46) [#2066](https://github.com/emotion-js/emotion/pull/2066) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with React giving warning about static children not having unique keys when using the classic `jsx` factory. This example illustrates the situation in which this has been incorrectly happening:

  ```js
  <div css={{ color: 'hotpink' }}>
    <div />
    <div />
  </div>
  ```

## 10.1.0

### Minor Changes

- [`71514b06`](https://github.com/emotion-js/emotion/commit/71514b06fe172517168f98321499f05e74388de6) [#1970](https://github.com/emotion-js/emotion/pull/1970) Thanks [@FLGMwt](https://github.com/FLGMwt)! - Support for [the new JSX runtimes](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) has been added. They require compatible React versions and shouldn't be manually used.

  To use them you can use the new `@jsxImportSource @emotion/core` pragma instead of the old `@jsx jsx` or you can use `@emotion/babel-preset-css-prop` with `{ runtime: 'automatic' }` option to have it handled automatically for you for the whole project.

## 10.0.35

### Patch Changes

- [`2cf3b16b`](https://github.com/emotion-js/emotion/commit/2cf3b16b94eb7bad8d745b135fb2bfa99154980d) [#1973](https://github.com/emotion-js/emotion/pull/1973) Thanks [@santialbo](https://github.com/santialbo)! - Fixed label extraction from the stack traces in node for components wrapped in `React.forwardRef`. This has affected only development builds.

## 10.0.34

### Patch Changes

- [`4979ebb2`](https://github.com/emotion-js/emotion/commit/4979ebb2f9db94fa291384213e4f37e4a58a294a) [#1966](https://github.com/emotion-js/emotion/pull/1966) Thanks [@chnakamura](https://github.com/chnakamura)! - Fixed label extraction from the stack traces in Chrome in certain scenarios. This has affected only development builds.

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
