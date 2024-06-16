# @emotion/primitives-core

## 11.12.0

### Minor Changes

- [#2818](https://github.com/emotion-js/emotion/pull/2818) [`8546dd0`](https://github.com/emotion-js/emotion/commit/8546dd0) Thanks [@srmagura](https://github.com/srmagura)! - Source code has been migrated to TypeScript so from now on type declarations will be available in the published package.

## 11.11.0

### Patch Changes

- [#3029](https://github.com/emotion-js/emotion/pull/3029) [`eed5e6cf`](https://github.com/emotion-js/emotion/commit/eed5e6cf00f94f3011b93825ccce43cb2270c247) Thanks [@Andarist](https://github.com/Andarist)! - Fixed importing in Node ESM

## 11.10.0

### Minor Changes

- [#2819](https://github.com/emotion-js/emotion/pull/2819) [`bbad8c79`](https://github.com/emotion-js/emotion/commit/bbad8c79937f8dfd5d93bf485c1e9ec44124d228) Thanks [@nicksrandall](https://github.com/nicksrandall)! - `exports` field has been added to the `package.json` manifest. It limits what files can be imported from a package but we've tried our best to allow importing all the files that were considered to be a part of the public API.

## 11.0.0

### Major Changes

- [`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9) [#2014](https://github.com/emotion-js/emotion/pull/2014) Thanks [@Andarist](https://github.com/Andarist)! - Functions are no longer accepted as values for the `style` prop. This unifies the behavior with the web version of Emotion as `style`'s equivalent is `className` prop and functions are not resolved for it.

* [`139ea336`](https://github.com/emotion-js/emotion/commit/139ea336c7f49a3246813238e388e164b80de4da) [#2060](https://github.com/emotion-js/emotion/pull/2060) Thanks [@efoken](https://github.com/efoken)! - `StyleSheet.create` is used now under the hood. This means that when used in combination with React Native Web atomic class names are applied on components instead of inline styles.

- [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@emmatown](https://github.com/emmatown)! - Use hooks internally for improved bundle size and a better tree in React DevTools

* [`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9) [#2014](https://github.com/emotion-js/emotion/pull/2014) Thanks [@Andarist](https://github.com/Andarist)! - Updated `css-to-react-native` dependency to the 3.x version - it comes with some breaking changes listed [here](https://github.com/styled-components/css-to-react-native/releases/tag/v3.0.0).

### Minor Changes

- [`2d597857`](https://github.com/emotion-js/emotion/commit/2d5978579f758163663c1bfb40e7d76bc24ae26a) [#2058](https://github.com/emotion-js/emotion/pull/2058) Thanks [@efoken](https://github.com/efoken)! - Added support for the `as` prop.

### Patch Changes

- [`db16ac35`](https://github.com/emotion-js/emotion/commit/db16ac358ded4cc04fbd649700716b7cb3b3e40a) [#2013](https://github.com/emotion-js/emotion/pull/2013) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with styles being lost for nested factory calls like:

  ```js
  const bgColor = color => css`
    background-color: ${color};
  `

  const Text = styled.Text`
    color: hotpink;
    ${({ backgroundColor }) => bgColor(backgroundColor)};
  `
  ```

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

### Patch Changes

- Updated dependencies [[`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63)]:
  - @emotion/react@11.0.0-rc.0

## 11.0.0-next.19

### Patch Changes

- Updated dependencies []:
  - @emotion/react@11.0.0-next.19

## 11.0.0-next.18

### Major Changes

- [`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9) [#2014](https://github.com/emotion-js/emotion/pull/2014) Thanks [@Andarist](https://github.com/Andarist)! - Updated `css-to-react-native` dependency to the 3.x version - it comes with some breaking changes listed [here](https://github.com/styled-components/css-to-react-native/releases/tag/v3.0.0).

* [`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9) [#2014](https://github.com/emotion-js/emotion/pull/2014) Thanks [@Andarist](https://github.com/Andarist)! - Functions are no longer accepted as values for the `style` prop. This unifies the behavior with the web version of Emotion as `style`'s equivalent is `className` prop and functions are not resolved for it.

### Patch Changes

- [`db16ac35`](https://github.com/emotion-js/emotion/commit/db16ac358ded4cc04fbd649700716b7cb3b3e40a) [#2013](https://github.com/emotion-js/emotion/pull/2013) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with styles being lost for nested factory calls like:

  ```js
  const bgColor = color => css`
    background-color: ${color};
  `

  const Text = styled.Text`
    color: hotpink;
    ${({ backgroundColor }) => bgColor(backgroundColor)};
  `
  ```

## 11.0.0-next.17

### Patch Changes

- Updated dependencies []:
  - @emotion/react@11.0.0-next.17

## 11.0.0-next.16

### Patch Changes

- Updated dependencies [[`58b2bbca`](https://github.com/emotion-js/emotion/commit/58b2bbcad63f8ea22389ccdc2a8f6c5064984e82)]:
  - @emotion/react@11.0.0-next.16

## 11.0.0-next.15

### Patch Changes

- Updated dependencies [[`5d692a6a`](https://github.com/emotion-js/emotion/commit/5d692a6a8102b3faabefb773dd0145b123668a07)]:
  - @emotion/react@11.0.0-next.15

## 11.0.0-next.14

### Patch Changes

- Updated dependencies [[`58dc08a6`](https://github.com/emotion-js/emotion/commit/58dc08a6a013fb5cfa10bb85e06e53a8ff7eeb51), [`f57a7229`](https://github.com/emotion-js/emotion/commit/f57a72299cd4025a725bd5bd1b966a8f9df16cd8)]:
  - @emotion/react@11.0.0-next.14

## 11.0.0-next.13

### Patch Changes

- Updated dependencies [[`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf)]:
  - @emotion/react@11.0.0-next.13

## 11.0.0-next.12

### Patch Changes

- Updated dependencies [[`7dea6d7a`](https://github.com/emotion-js/emotion/commit/7dea6d7a9a87f00cf9b695b58a2f65b67e17fabd), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d), [`be2eb614`](https://github.com/emotion-js/emotion/commit/be2eb614d2bc369a382dbc6aa347f66801605f3b), [`75e2f9e1`](https://github.com/emotion-js/emotion/commit/75e2f9e1848bc0161f8db3c663438ada3042ae66)]:
  - @emotion/react@11.0.0-next.12

## 11.0.0-next.10

### Patch Changes

- Updated dependencies [[`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`affed3dd`](https://github.com/emotion-js/emotion/commit/affed3ddf03671835356632f26a064f59811852f), [`d62d9101`](https://github.com/emotion-js/emotion/commit/d62d9101bc75e6bc9644ae588d2a6e4bf4d69285)]:
  - @emotion/react@11.0.0-next.10

## 11.0.0-next.9

### Patch Changes

- Updated dependencies []:
  - @emotion/core@11.0.0-next.9

## 11.0.0-next.8

### Patch Changes

- Updated dependencies [[`c643107`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b), [`c643107`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b)]:
  - @emotion/core@11.0.0-next.8

## 11.0.0-next.7

### Patch Changes

- Updated dependencies [[`5c55fd17`](https://github.com/emotion-js/emotion/commit/5c55fd17dcaec84d1f5d5d13ae90dd336d7e4403)]:
  - @emotion/core@11.0.0-next.7

## 11.0.0-next.6

### Patch Changes

- Updated dependencies [[`828111cd`](https://github.com/emotion-js/emotion/commit/828111cd32d3fe8c984231201e518d1b6000bffd), [`843bfb11`](https://github.com/emotion-js/emotion/commit/843bfb1153ee0dbe33d005fdd5c5be185daa5c41), [`cbb8b796`](https://github.com/emotion-js/emotion/commit/cbb8b7965c2923cf1922d724de556374323bff61)]:
  - @emotion/core@11.0.0-next.6

## 11.0.0-next.5

### Patch Changes

- Updated dependencies []:
  - @emotion/core@11.0.0-next.5

## 11.0.0-next.4

### Patch Changes

- Updated dependencies []:
  - @emotion/core@11.0.0-next.4

## 11.0.0-next.3

### Patch Changes

- Updated dependencies [[`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85)]:
  - @emotion/core@11.0.0-next.3

## 11.0.0-next.2

### Major Changes

- [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@emmatown](https://github.com/emmatown)! - Use hooks internally for improved bundle size and a better tree in React DevTools

### Patch Changes

- Updated dependencies [[`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967)]:
  - @emotion/core@11.0.0-next.2

## 11.0.0-next.1

### Patch Changes

- Updated dependencies []:
  - @emotion/core@11.0.0-next.1

## 11.0.0-next.0

### Major Changes

- [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@emmatown](https://github.com/emmatown)! - Ensure packages are major bumped so that pre-release versions of the linked packages are consistent in the major number

### Patch Changes

- Updated dependencies [[`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555)]:
  - @emotion/core@11.0.0-next.0

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file
- Updated dependencies [[`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968)]:
  - @emotion/core@10.0.27

## 10.0.22

### Patch Changes

- [`ae90f000`](https://github.com/emotion-js/emotion/commit/ae90f00094483ff12d8cbb80d628e30fe6d57d7a) [#841](https://github.com/emotion-js/emotion/pull/841) Thanks [@nitin42](https://github.com/nitin42)! - Improve error message for shorthand properties with missing units.

- Updated dependencies [[`4fc5657a`](https://github.com/emotion-js/emotion/commit/4fc5657ac8d0002322321cfbfc254b7196d27387), [`2fc75f26`](https://github.com/emotion-js/emotion/commit/2fc75f266b23cf48fb842953bc47eebcb5241cbd), [`10211951`](https://github.com/emotion-js/emotion/commit/10211951051729b149930a8646de14bae9ae1bbc), [`57a767ea`](https://github.com/emotion-js/emotion/commit/57a767ea3dd18eefbbdc7269cc13128caad65286)]:
  - @emotion/core@10.0.22

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@emmatown](https://github.com/emmatown)! - Update build tool
