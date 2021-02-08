# @emotion/native

## 11.0.0

### Major Changes

- [`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9) [#2014](https://github.com/emotion-js/emotion/pull/2014) Thanks [@Andarist](https://github.com/Andarist)! - Functions are no longer accepted as values for the `style` prop. This unifies the behavior with the web version of Emotion as `style`'s equivalent is `className` prop and functions are not resolved for it.

* [`139ea336`](https://github.com/emotion-js/emotion/commit/139ea336c7f49a3246813238e388e164b80de4da) [#2060](https://github.com/emotion-js/emotion/pull/2060) Thanks [@efoken](https://github.com/efoken)! - `StyleSheet.create` is used now under the hood. This means that when used in combination with React Native Web atomic class names are applied on components instead of inline styles.

- [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Use hooks internally for improved bundle size and a better tree in React DevTools

* [`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9) [#2014](https://github.com/emotion-js/emotion/pull/2014) Thanks [@Andarist](https://github.com/Andarist)! - Updated `css-to-react-native` dependency to the 3.x version - it comes with some breaking changes listed [here](https://github.com/styled-components/css-to-react-native/releases/tag/v3.0.0).

### Minor Changes

- [`843bfb11`](https://github.com/emotion-js/emotion/commit/843bfb1153ee0dbe33d005fdd5c5be185daa5c41) [#1630](https://github.com/emotion-js/emotion/pull/1630) Thanks [@Andarist](https://github.com/Andarist)! - `@emotion/native` & `@emotion/primitives` packages come with macros now. Both can be used as `@emotion/native/macro` & `@emotion/primitives/macro` respectively.

* [`456be9a6`](https://github.com/emotion-js/emotion/commit/456be9a602d7d0bac291617f69f59f5ed30d1b84) [#1634](https://github.com/emotion-js/emotion/pull/1634) Thanks [@patsissons](https://github.com/patsissons)! - Added TypeScript type definitions.

- [`2d597857`](https://github.com/emotion-js/emotion/commit/2d5978579f758163663c1bfb40e7d76bc24ae26a) [#2058](https://github.com/emotion-js/emotion/pull/2058) Thanks [@efoken](https://github.com/efoken)! - Added support for the `as` prop.

* [`f1b7c9d6`](https://github.com/emotion-js/emotion/commit/f1b7c9d6dcdb45a02d7c7dce8c3fff28e14ed3ec) [#1642](https://github.com/emotion-js/emotion/pull/1642) Thanks [@Andarist](https://github.com/Andarist)! - Added basic support for accepting custom `shouldForwardProp` option.

### Patch Changes

- [`11fc27f8`](https://github.com/emotion-js/emotion/commit/11fc27f8fa00661353cc7650111afaa068399aca) [#1750](https://github.com/emotion-js/emotion/pull/1750) Thanks [@Zn4rK](https://github.com/Zn4rK)! - Match supported components to what is exported from the latest version of React Native (0.61.5).

* [`db16ac35`](https://github.com/emotion-js/emotion/commit/db16ac358ded4cc04fbd649700716b7cb3b3e40a) [#2013](https://github.com/emotion-js/emotion/pull/2013) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with styles being lost for nested factory calls like:

  ```js
  const bgColor = color => css`
    background-color: ${color};
  `

  const Text = styled.Text`
    color: hotpink;
    ${({ backgroundColor }) => bgColor(backgroundColor)};
  `
  ```

* Updated dependencies [[`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9), [`db16ac35`](https://github.com/emotion-js/emotion/commit/db16ac358ded4cc04fbd649700716b7cb3b3e40a), [`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9), [`139ea336`](https://github.com/emotion-js/emotion/commit/139ea336c7f49a3246813238e388e164b80de4da), [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967), [`2d597857`](https://github.com/emotion-js/emotion/commit/2d5978579f758163663c1bfb40e7d76bc24ae26a)]:
  - @emotion/primitives-core@11.0.0

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

### Patch Changes

- Updated dependencies [[`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63)]:
  - @emotion/primitives-core@11.0.0-rc.0

## 11.0.0-next.19

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.19

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

- Updated dependencies [[`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9), [`db16ac35`](https://github.com/emotion-js/emotion/commit/db16ac358ded4cc04fbd649700716b7cb3b3e40a), [`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9)]:
  - @emotion/primitives-core@11.0.0-next.18

## 11.0.0-next.17

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.17

## 11.0.0-next.16

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.16

## 11.0.0-next.15

### Minor Changes

- [`620f7327`](https://github.com/emotion-js/emotion/commit/620f7327485236a4c57792787484af7d1f9cd799) [#1954](https://github.com/emotion-js/emotion/pull/1954) Thanks [@Andarist](https://github.com/Andarist)! - Reworked TypeScript types around types for React Native's core components. All of them, and all wrapped class components, should now accept `ref` prop properly.

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.15

## 11.0.0-next.14

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.14

## 11.0.0-next.13

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.13

## 11.0.0-next.12

### Patch Changes

- [`11fc27f8`](https://github.com/emotion-js/emotion/commit/11fc27f8fa00661353cc7650111afaa068399aca) [#1750](https://github.com/emotion-js/emotion/pull/1750) Thanks [@Zn4rK](https://github.com/Zn4rK)! - Match supported components to what is exported from the latest version of React Native (0.61.5).

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.12

## 11.0.0-next.11

### Patch Changes

- [`cb637e65`](https://github.com/emotion-js/emotion/commit/cb637e659964d24c56ba7a93d01f3865f2d94669) [#1716](https://github.com/emotion-js/emotion/pull/1716) Thanks [@hammadj](https://github.com/hammadj)! - Add type definitions to published files for NPM

## 11.0.0-next.10

### Minor Changes

- [`456be9a6`](https://github.com/emotion-js/emotion/commit/456be9a602d7d0bac291617f69f59f5ed30d1b84) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@patsissons](https://github.com/patsissons)! - Added TypeScript type definitions.

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.10

## 11.0.0-next.9

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.9

## 11.0.0-next.8

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.8

## 11.0.0-next.7

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.7

## 11.0.0-next.6

### Minor Changes

- [`843bfb11`](https://github.com/emotion-js/emotion/commit/843bfb1153ee0dbe33d005fdd5c5be185daa5c41) [#1630](https://github.com/emotion-js/emotion/pull/1630) Thanks [@Andarist](https://github.com/Andarist)! - `@emotion/native` & `@emotion/primitives` packages come with macros now. Both can be used as `@emotion/native/macro` & `@emotion/primitives/macro` respectively.

* [`f1b7c9d6`](https://github.com/emotion-js/emotion/commit/f1b7c9d6dcdb45a02d7c7dce8c3fff28e14ed3ec) [#1642](https://github.com/emotion-js/emotion/pull/1642) Thanks [@Andarist](https://github.com/Andarist)! - Added basic support for accepting custom `shouldForwardProp` option.

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.6

## 11.0.0-next.5

### Patch Changes

- Updated dependencies []:
  - emotion-theming@11.0.0-next.5
  - @emotion/primitives-core@11.0.0-next.5

## 11.0.0-next.4

### Patch Changes

- Updated dependencies []:
  - emotion-theming@11.0.0-next.4
  - @emotion/primitives-core@11.0.0-next.4

## 11.0.0-next.3

### Patch Changes

- Updated dependencies []:
  - emotion-theming@11.0.0-next.3
  - @emotion/primitives-core@11.0.0-next.3

## 11.0.0-next.2

### Major Changes

- [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Use hooks internally for improved bundle size and a better tree in React DevTools

### Patch Changes

- Updated dependencies [[`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967)]:
  - emotion-theming@11.0.0-next.2
  - @emotion/primitives-core@11.0.0-next.2

## 11.0.0-next.1

### Patch Changes

- Updated dependencies [[`1eaa3a38`](https://github.com/emotion-js/emotion/commit/1eaa3a389876d4a623ce66735dc6db093cb2a8e6)]:
  - emotion-theming@11.0.0-next.1
  - @emotion/primitives-core@11.0.0-next.1

## 11.0.0-next.0

### Major Changes

- [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Ensure packages are major bumped so that pre-release versions of the linked packages are consistent in the major number

### Patch Changes

- Updated dependencies [[`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555)]:
  - emotion-theming@11.0.0-next.0
  - @emotion/primitives-core@11.0.0-next.0

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file
- Updated dependencies [[`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968)]:
  - emotion-theming@10.0.27
  - @emotion/primitives-core@10.0.27

## 10.0.22

### Patch Changes

- [`ae90f000`](https://github.com/emotion-js/emotion/commit/ae90f00094483ff12d8cbb80d628e30fe6d57d7a) [#841](https://github.com/emotion-js/emotion/pull/841) Thanks [@nitin42](https://github.com/nitin42)! - Improve error message for shorthand properties with missing units.

- Updated dependencies [[`ae90f000`](https://github.com/emotion-js/emotion/commit/ae90f00094483ff12d8cbb80d628e30fe6d57d7a)]:
  - @emotion/primitives-core@10.0.22

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool

## 10.0.11

### Patch Changes

- [8164e7b](https://github.com/emotion-js/emotion/commit/8164e7b) [#1289](https://github.com/emotion-js/emotion/pull/1344) Thanks [@Josema](https://github.com/Josema)! - Fix usage of @emotion/native with react-native-web
