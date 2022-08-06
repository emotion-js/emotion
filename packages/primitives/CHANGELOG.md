# @emotion/primitives

## 11.10.0

### Minor Changes

- [#2819](https://github.com/emotion-js/emotion/pull/2819) [`bbad8c79`](https://github.com/emotion-js/emotion/commit/bbad8c79937f8dfd5d93bf485c1e9ec44124d228) Thanks [@nicksrandall](https://github.com/nicksrandall)! - `exports` field has been added to the `package.json` manifest. It limits what files can be imported from a package but we've tried our best to allow importing all the files that were considered to be a part of the public API.

### Patch Changes

- Updated dependencies [[`bbad8c79`](https://github.com/emotion-js/emotion/commit/bbad8c79937f8dfd5d93bf485c1e9ec44124d228)]:
  - @emotion/babel-plugin@11.10.0
  - @emotion/is-prop-valid@1.2.0
  - @emotion/primitives-core@11.10.0

## 11.0.0

### Major Changes

- [`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9) [#2014](https://github.com/emotion-js/emotion/pull/2014) Thanks [@Andarist](https://github.com/Andarist)! - Functions are no longer accepted as values for the `style` prop. This unifies the behavior with the web version of Emotion as `style`'s equivalent is `className` prop and functions are not resolved for it.

* [`139ea336`](https://github.com/emotion-js/emotion/commit/139ea336c7f49a3246813238e388e164b80de4da) [#2060](https://github.com/emotion-js/emotion/pull/2060) Thanks [@efoken](https://github.com/efoken)! - `StyleSheet.create` is used now under the hood. This means that when used in combination with React Native Web atomic class names are applied on components instead of inline styles.

- [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Use hooks internally for improved bundle size and a better tree in React DevTools

* [`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9) [#2014](https://github.com/emotion-js/emotion/pull/2014) Thanks [@Andarist](https://github.com/Andarist)! - Updated `css-to-react-native` dependency to the 3.x version - it comes with some breaking changes listed [here](https://github.com/styled-components/css-to-react-native/releases/tag/v3.0.0).

### Minor Changes

- [`843bfb11`](https://github.com/emotion-js/emotion/commit/843bfb1153ee0dbe33d005fdd5c5be185daa5c41) [#1630](https://github.com/emotion-js/emotion/pull/1630) Thanks [@Andarist](https://github.com/Andarist)! - `@emotion/native` & `@emotion/primitives` packages come with macros now. Both can be used as `@emotion/native/macro` & `@emotion/primitives/macro` respectively.

* [`2d597857`](https://github.com/emotion-js/emotion/commit/2d5978579f758163663c1bfb40e7d76bc24ae26a) [#2058](https://github.com/emotion-js/emotion/pull/2058) Thanks [@efoken](https://github.com/efoken)! - Added support for the `as` prop.

- [`f1b7c9d6`](https://github.com/emotion-js/emotion/commit/f1b7c9d6dcdb45a02d7c7dce8c3fff28e14ed3ec) [#1642](https://github.com/emotion-js/emotion/pull/1642) Thanks [@Andarist](https://github.com/Andarist)! - Added basic support for accepting custom `shouldForwardProp` option.

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

- Updated dependencies [[`c672175b`](https://github.com/emotion-js/emotion/commit/c672175b52e86de43b3d4092a8fe34b2023ceae8), [`923ded01`](https://github.com/emotion-js/emotion/commit/923ded01e2399a242206d590f6646f13aba110e4), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1), [`5e803106`](https://github.com/emotion-js/emotion/commit/5e803106d391b7c036bdf634318b80337a1d9b70), [`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`0a4a22ff`](https://github.com/emotion-js/emotion/commit/0a4a22ffcfaa49d09a88856ef2d51e0d53e31b6d), [`b0ad4f0c`](https://github.com/emotion-js/emotion/commit/b0ad4f0c628813a42c4637857be9a969429db6f0), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`c65c5d88`](https://github.com/emotion-js/emotion/commit/c65c5d887002d76557eaefcb98091d795b13f9a9), [`5c7ec859`](https://github.com/emotion-js/emotion/commit/5c7ec85904633a11185066fa591dc8969f3f2ff2), [`db16ac35`](https://github.com/emotion-js/emotion/commit/db16ac358ded4cc04fbd649700716b7cb3b3e40a), [`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85), [`c7850e61`](https://github.com/emotion-js/emotion/commit/c7850e61211d6aa26a3388399889a6072ee2f1fe), [`95ea2839`](https://github.com/emotion-js/emotion/commit/95ea2839890629748894b3942d26f608f203d3f9), [`b7d21373`](https://github.com/emotion-js/emotion/commit/b7d21373d967d0f958dd59aaaa650047e23e8e8b), [`139ea336`](https://github.com/emotion-js/emotion/commit/139ea336c7f49a3246813238e388e164b80de4da), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1), [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967), [`2d597857`](https://github.com/emotion-js/emotion/commit/2d5978579f758163663c1bfb40e7d76bc24ae26a), [`828111cd`](https://github.com/emotion-js/emotion/commit/828111cd32d3fe8c984231201e518d1b6000bffd), [`69446cb5`](https://github.com/emotion-js/emotion/commit/69446cb5bfb644beb877a1edb00ee46c014636d5)]:
  - @emotion/babel-plugin@11.0.0
  - @emotion/is-prop-valid@1.0.0
  - @emotion/primitives-core@11.0.0

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

### Patch Changes

- Updated dependencies [[`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63), [`69446cb5`](https://github.com/emotion-js/emotion/commit/69446cb5bfb644beb877a1edb00ee46c014636d5)]:
  - @emotion/babel-plugin@11.0.0-rc.0
  - @emotion/is-prop-valid@1.0.0-rc.0
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
  - @emotion/babel-plugin@11.0.0-next.17
  - @emotion/primitives-core@11.0.0-next.17

## 11.0.0-next.16

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.16
  - @emotion/babel-plugin@11.0.0-next.16

## 11.0.0-next.15

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.15
  - @emotion/babel-plugin@11.0.0-next.15

## 11.0.0-next.14

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.14

## 11.0.0-next.13

### Patch Changes

- Updated dependencies [[`5e803106`](https://github.com/emotion-js/emotion/commit/5e803106d391b7c036bdf634318b80337a1d9b70), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf)]:
  - @emotion/babel-plugin@11.0.0-next.13
  - @emotion/primitives-core@11.0.0-next.13

## 11.0.0-next.12

### Patch Changes

- Updated dependencies [[`5c7ec859`](https://github.com/emotion-js/emotion/commit/5c7ec85904633a11185066fa591dc8969f3f2ff2), [`e3d7db87`](https://github.com/emotion-js/emotion/commit/e3d7db87deaac95817404760112417ac1fa1b56d)]:
  - @emotion/babel-plugin@11.0.0-next.12
  - @emotion/primitives-core@11.0.0-next.12

## 11.0.0-next.10

### Patch Changes

- Updated dependencies [[`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`c7850e61`](https://github.com/emotion-js/emotion/commit/c7850e61211d6aa26a3388399889a6072ee2f1fe)]:
  - @emotion/babel-plugin@11.0.0-next.10
  - @emotion/primitives-core@11.0.0-next.10

## 11.0.0-next.9

### Patch Changes

- Updated dependencies []:
  - @emotion/primitives-core@11.0.0-next.9

## 11.0.0-next.8

### Patch Changes

- Updated dependencies [[`c643107`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b)]:
  - babel-plugin-emotion@11.0.0-next.8
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

- Updated dependencies [[`923ded01`](https://github.com/emotion-js/emotion/commit/923ded01e2399a242206d590f6646f13aba110e4), [`0a4a22ff`](https://github.com/emotion-js/emotion/commit/0a4a22ffcfaa49d09a88856ef2d51e0d53e31b6d), [`843bfb11`](https://github.com/emotion-js/emotion/commit/843bfb1153ee0dbe33d005fdd5c5be185daa5c41), [`828111cd`](https://github.com/emotion-js/emotion/commit/828111cd32d3fe8c984231201e518d1b6000bffd)]:
  - @emotion/is-prop-valid@0.9.0-next.1
  - babel-plugin-emotion@11.0.0-next.6
  - @emotion/primitives-core@11.0.0-next.6

## 11.0.0-next.5

### Patch Changes

- Updated dependencies []:
  - emotion-theming@11.0.0-next.5
  - @emotion/primitives-core@11.0.0-next.5

## 11.0.0-next.4

### Patch Changes

- Updated dependencies [[`c65c5d88`](https://github.com/emotion-js/emotion/commit/c65c5d887002d76557eaefcb98091d795b13f9a9)]:
  - babel-plugin-emotion@11.0.0-next.4
  - emotion-theming@11.0.0-next.4
  - @emotion/primitives-core@11.0.0-next.4

## 11.0.0-next.3

### Patch Changes

- Updated dependencies [[`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1), [`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85), [`f9feab1a`](https://github.com/emotion-js/emotion/commit/f9feab1a5d1ca88e53c3f7a063be5d5871cc93e8), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1)]:
  - babel-plugin-emotion@11.0.0-next.3
  - @emotion/is-prop-valid@0.8.6-next.0
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
  - babel-plugin-emotion@11.0.0-next.1
  - @emotion/primitives-core@11.0.0-next.1

## 11.0.0-next.0

### Major Changes

- [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Ensure packages are major bumped so that pre-release versions of the linked packages are consistent in the major number

### Patch Changes

- Updated dependencies [[`b0ad4f0c`](https://github.com/emotion-js/emotion/commit/b0ad4f0c628813a42c4637857be9a969429db6f0), [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555)]:
  - babel-plugin-emotion@11.0.0-next.0
  - emotion-theming@11.0.0-next.0
  - @emotion/primitives-core@11.0.0-next.0

## 10.0.30

### Patch Changes

- Updated dependencies [[`babbbe3`](https://github.com/emotion-js/emotion/commit/babbbe36844f26f6d7041f1d3aeb47d5dfb08d8a)]:
  - @emotion/is-prop-valid@0.8.8

## 10.0.28

### Patch Changes

- Updated dependencies [[`4dfe558`](https://github.com/emotion-js/emotion/commit/4dfe55811a25bf66306aee46f7f0d6c909004c42), [`af07afb`](https://github.com/emotion-js/emotion/commit/af07afbe5a887be82f72a12fd6cd1673a32f5263), [`12141c5`](https://github.com/emotion-js/emotion/commit/12141c54318c0738b60bf755e033cf6e12238a02)]:
  - babel-plugin-emotion@10.0.28
  - @emotion/is-prop-valid@0.8.7

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file
- Updated dependencies [[`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968)]:
  - babel-plugin-emotion@10.0.27
  - emotion-theming@10.0.27
  - @emotion/is-prop-valid@0.8.6
  - @emotion/primitives-core@10.0.27

## 10.0.24

### Patch Changes

- Updated dependencies [[`5e17e456`](https://github.com/emotion-js/emotion/commit/5e17e456a66857bb3a3a5b39c9cd8f8dd89301e5)]:
  - @emotion/is-prop-valid@0.8.5

## 10.0.23

### Patch Changes

- Updated dependencies [[`6cdb5695`](https://github.com/emotion-js/emotion/commit/6cdb56959bc4b64d7178604f1eb64a058c2e58c2), [`3927293d`](https://github.com/emotion-js/emotion/commit/3927293d0b9d96b4a7c00196e8430728759b1161), [`b3a0f148`](https://github.com/emotion-js/emotion/commit/b3a0f1484f2efcc78b447639ff2e0bc0f29915ae)]:
  - @emotion/is-prop-valid@0.8.4
  - babel-plugin-emotion@10.0.23

## 10.0.22

### Patch Changes

- [`ae90f000`](https://github.com/emotion-js/emotion/commit/ae90f00094483ff12d8cbb80d628e30fe6d57d7a) [#841](https://github.com/emotion-js/emotion/pull/841) Thanks [@nitin42](https://github.com/nitin42)! - Improve error message for shorthand properties with missing units.

- Updated dependencies [[`1bb3efe3`](https://github.com/emotion-js/emotion/commit/1bb3efe399ddf0f3332187f3c751fbba9326d02c), [`ae90f000`](https://github.com/emotion-js/emotion/commit/ae90f00094483ff12d8cbb80d628e30fe6d57d7a)]:
  - babel-plugin-emotion@10.0.22
  - @emotion/primitives-core@10.0.22

## 10.0.19

- Updated dependencies [c81c0033]:
  - babel-plugin-emotion@10.0.19
  - @emotion/is-prop-valid@0.8.3
  - emotion-theming@10.0.19

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool

## 10.0.13

- Updated dependencies [52bd655b]:
  - @emotion/is-prop-valid@0.8.1

## 10.0.12

- Updated dependencies [06426c95]:
  - @emotion/is-prop-valid@0.8.0
