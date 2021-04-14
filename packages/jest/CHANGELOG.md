# @emotion/jest

## 11.3.0

### Patch Changes

- [`4e911edb`](https://github.com/emotion-js/emotion/commit/4e911edba332cfef8147be9e4c7a3309f10a04de) [#2336](https://github.com/emotion-js/emotion/pull/2336) Thanks [@iChenLei](https://github.com/iChenLei)! - Use `displayName` when printing shallowly rendered elements with css prop.

## 11.2.1

### Patch Changes

- [`66ccd43e`](https://github.com/emotion-js/emotion/commit/66ccd43e4c1ed44fb11950d663f6cb0be4ab3415) [#2269](https://github.com/emotion-js/emotion/pull/2269) Thanks [@mskelton](https://github.com/mskelton)! - Fixed the Enzyme serializer to work properly with conditional styles passed to the `css` prop.

* [`66ccd43e`](https://github.com/emotion-js/emotion/commit/66ccd43e4c1ed44fb11950d663f6cb0be4ab3415) [#2269](https://github.com/emotion-js/emotion/pull/2269) Thanks [@mskelton](https://github.com/mskelton)! - Fixed the Enzyme serializer to always print composed styles (for example using arrays), which are passed to the `css` prop, correctly.

## 11.2.0

### Minor Changes

- [`0c31ed05`](https://github.com/emotion-js/emotion/commit/0c31ed05e564c4e68d11862e23d96003c6b7e4b5) [#2233](https://github.com/emotion-js/emotion/pull/2233) Thanks [@ajs139](https://github.com/ajs139)! - Fixed an issue with Enzyme snapshots for components using an array as the `css` prop - those should be printed OK now.

## 11.1.0

### Minor Changes

- [`c470c855`](https://github.com/emotion-js/emotion/commit/c470c8556a05e3af83b067c51cdd29f8655f7dbf) [#2109](https://github.com/emotion-js/emotion/pull/2109) Thanks [@Andarist](https://github.com/Andarist)! - `createEnzymeSerializer` export has been removed from the root entrypoint and moved to a dedicated `@emotion/jest/enzyme` entrypoint. This is unfortunate because it could be considered a breaking change but it has been decided to treat this as a bug fix. It was never the intention to export this from the root entrypoint - `enzyme-to-json` has been marked as an optional peer dependency of `@emotion/jest` since the release and it was the package structure that did not match this expectation by mistake.

## 11.0.0

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `jest-emotion` to `@emotion/jest`. Please replace `"snapshotSerializers": ["jest-emotion"]` with `"snapshotSerializers": ["@emotion/jest/serializer"]` if you're using the snapshot serializer. Also replace any imports of `jest-emotion` with `@emotion/jest` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

* [`ca599c5f`](https://github.com/emotion-js/emotion/commit/ca599c5f392b5b1f51430dc9d8b263ed54856401) [#1901](https://github.com/emotion-js/emotion/pull/1901) Thanks [@Andarist](https://github.com/Andarist)! - `test` & `print` are no longer exported as named exports. If you want to access the default serializer just access the default export. This means that `@emotion/jest`(previously `jest-emotion`) can't be used directly in the `snapshotSerializers` option, you should use `@emotion/jest/serializer` instead for this.

* [`ca599c5f`](https://github.com/emotion-js/emotion/commit/ca599c5f392b5b1f51430dc9d8b263ed54856401) [#1901](https://github.com/emotion-js/emotion/pull/1901) Thanks [@Andarist](https://github.com/Andarist)! - Refactored to use new serializers API which has been introduced in Jest 21.

* [`cd77efbf`](https://github.com/emotion-js/emotion/commit/cd77efbf263486e2b189221f4076e1098d78c379) [#1920](https://github.com/emotion-js/emotion/pull/1920) Thanks [@Andarist](https://github.com/Andarist)! - The root entry (`@emotion/jest`) no longer has `default` and `serializer` exports. You can still import `createSerializer` from it to create your own serializer if needed.

- [`cd77efbf`](https://github.com/emotion-js/emotion/commit/cd77efbf263486e2b189221f4076e1098d78c379) [#1920](https://github.com/emotion-js/emotion/pull/1920) Thanks [@Andarist](https://github.com/Andarist)! - `@emotion/jest/serializer`'s main purpose is compatibility with Jest's `snapshotSerializers` option, so it no longer has a default export - it only has `test` & `serialize` exports. You can import `createSerializer` from the root entry (`@emotion/jest`) and create your own serializer if needed.

- [`702f3fd2`](https://github.com/emotion-js/emotion/commit/702f3fd22aab8f3cb09dd547c07b9045ca5c3d9c) [#1620](https://github.com/emotion-js/emotion/pull/1620) Thanks [@spudly](https://github.com/spudly)! - Added the `T` parameter to the `Matchers` interface in the TypeScript definitions to make this module compatible with `@types/jest@^24.0.20`.

### Minor Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Improve support for Enzyme's shallow rendering with the addition of the `@emotion/jest/enzyme-serializer` snapshot serializer.

* [`ca599c5f`](https://github.com/emotion-js/emotion/commit/ca599c5f392b5b1f51430dc9d8b263ed54856401) [#1901](https://github.com/emotion-js/emotion/pull/1901) Thanks [@Andarist](https://github.com/Andarist)! - Improved printing of nested at-rules.

- [`ca599c5f`](https://github.com/emotion-js/emotion/commit/ca599c5f392b5b1f51430dc9d8b263ed54856401) [#1901](https://github.com/emotion-js/emotion/pull/1901) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with all styles being recognized as changed in Jest 25 on unrelated changes.

### Patch Changes

- [`e67a5be9`](https://github.com/emotion-js/emotion/commit/e67a5be9bffaa12f9ae0e366983dced4c3716f84) [#1604](https://github.com/emotion-js/emotion/pull/1604) Thanks [@Andarist](https://github.com/Andarist)! - Take specificity into account when matching styles

* [`8a88e771`](https://github.com/emotion-js/emotion/commit/8a88e77113aef127b0404f4f0b66fd6ee69391f0) [#1880](https://github.com/emotion-js/emotion/pull/1880) Thanks [@Jimmydalecleveland](https://github.com/Jimmydalecleveland)! - Improved stability of the generated snapshots - styles are extracted now based on the order in which the associated with them class names appear in the serialized elements rather than based on the order of the actual rules in the document.

- [`e67a5be9`](https://github.com/emotion-js/emotion/commit/e67a5be9bffaa12f9ae0e366983dced4c3716f84) [#1604](https://github.com/emotion-js/emotion/pull/1604) Thanks [@Andarist](https://github.com/Andarist)! - Match rules in declarations with component used as a selector

* [`ae8c1d9d`](https://github.com/emotion-js/emotion/commit/ae8c1d9dfa9ec605c90937f6e77c2a2642c94bd7) [#1902](https://github.com/emotion-js/emotion/pull/1902) Thanks [@Andarist](https://github.com/Andarist)! - Added support for handling regular React **elements** (objects returned from `React.createElement`) in the serializer and `toHaveStyleRule` matcher. It's possible to get those elements when traversing Enzyme's trees.

* [`3abcf673`](https://github.com/emotion-js/emotion/commit/3abcf673d6d2ea8d802602dde1d5af33af75ac4c) [#2043](https://github.com/emotion-js/emotion/pull/2043) Thanks [@Andarist](https://github.com/Andarist)! - `@types/jest` has been moved from the dependencies to the optional peer dependencies as it should not be installed automatically for users not using TypeScript.

* Updated dependencies []:
  - @emotion/css-prettifier@1.0.0

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

## 11.0.0-next.19

### Patch Changes

- [`5d094b57`](https://github.com/emotion-js/emotion/commit/5d094b57b78f792b42f72ca84384002bc1c61b95) [#2027](https://github.com/emotion-js/emotion/pull/2027) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with serializing Enzyme's `ReactWrapper` (what is returned from `mount`) with props containing elements without the css prop.

## 11.0.0-next.17

## 11.0.0-next.16

## 11.0.0-next.15

### Patch Changes

- [`8a88e771`](https://github.com/emotion-js/emotion/commit/8a88e77113aef127b0404f4f0b66fd6ee69391f0) [#1880](https://github.com/emotion-js/emotion/pull/1880) Thanks [@Jimmydalecleveland](https://github.com/Jimmydalecleveland)! - Improved stability of the generated snapshots - styles are extracted now based on the order in which the associated with them class names appear in the serialized elements rather than based on the order of the actual rules in the document.

* [`ae8c1d9d`](https://github.com/emotion-js/emotion/commit/ae8c1d9dfa9ec605c90937f6e77c2a2642c94bd7) [#1902](https://github.com/emotion-js/emotion/pull/1902) Thanks [@Andarist](https://github.com/Andarist)! - Added support for handling regular React **elements** (objects returned from `React.createElement`) in the serializer and `toHaveStyleRule` matcher. It's possible to get those elements when traversing Enzyme's trees.

## 11.0.0-next.14

### Major Changes

- [`cd77efbf`](https://github.com/emotion-js/emotion/commit/cd77efbf263486e2b189221f4076e1098d78c379) [#1920](https://github.com/emotion-js/emotion/pull/1920) Thanks [@Andarist](https://github.com/Andarist)! - The root entry (`@emotion/jest`) no longer has `default` and `serializer` exports. You can still import `createSerializer` from it to create your own serializer if needed.

* [`cd77efbf`](https://github.com/emotion-js/emotion/commit/cd77efbf263486e2b189221f4076e1098d78c379) [#1920](https://github.com/emotion-js/emotion/pull/1920) Thanks [@Andarist](https://github.com/Andarist)! - `@emotion/jest/enzyme` entrypoint has been renamed to `@emotion/jest/enzyme-serializer`. It's main purpose is compatibility with Jest's `snapshotSerializers` option, so it no longer has a default export - it only has `test` & `serialize` exports.. You can import `createEnzymeSerializer` from the root entry (`@emotion/jest`) and create your own serializer if needed.

- [`cd77efbf`](https://github.com/emotion-js/emotion/commit/cd77efbf263486e2b189221f4076e1098d78c379) [#1920](https://github.com/emotion-js/emotion/pull/1920) Thanks [@Andarist](https://github.com/Andarist)! - `@emotion/jest/serializer`'s main purpose is compatibility with Jest's `snapshotSerializers` option, so it no longer has a default export - it only has `test` & `serialize` exports. You can import `createSerializer` from the root entry (`@emotion/jest`) and create your own serializer if needed.

### Patch Changes

- Updated dependencies [[`58dc08a6`](https://github.com/emotion-js/emotion/commit/58dc08a6a013fb5cfa10bb85e06e53a8ff7eeb51), [`f57a7229`](https://github.com/emotion-js/emotion/commit/f57a72299cd4025a725bd5bd1b966a8f9df16cd8), [`6d32d82b`](https://github.com/emotion-js/emotion/commit/6d32d82beb45b18e5f18a37932b862ad19b17044)]:
  - @emotion/react@11.0.0-next.14
  - @emotion/css@11.0.0-next.14

## 11.0.0-next.13

### Major Changes

- [`ca599c5f`](https://github.com/emotion-js/emotion/commit/ca599c5f392b5b1f51430dc9d8b263ed54856401) [#1901](https://github.com/emotion-js/emotion/pull/1901) Thanks [@Andarist](https://github.com/Andarist)! - `test` & `print` are no longer exported as named exports. If you want to access the default serializer just access the default export. This means that `@emotion/jest`(previously `jest-emotion`) can't be used directly in the `snapshotSerializers` option, you should use `@emotion/jest/serializer` instead for this.

* [`ca599c5f`](https://github.com/emotion-js/emotion/commit/ca599c5f392b5b1f51430dc9d8b263ed54856401) [#1901](https://github.com/emotion-js/emotion/pull/1901) Thanks [@Andarist](https://github.com/Andarist)! - Refactored to use new serializers API which has been introduced in Jest 21.

### Minor Changes

- [`ca599c5f`](https://github.com/emotion-js/emotion/commit/ca599c5f392b5b1f51430dc9d8b263ed54856401) [#1901](https://github.com/emotion-js/emotion/pull/1901) Thanks [@Andarist](https://github.com/Andarist)! - Improved printing of nested at-rules.

* [`ca599c5f`](https://github.com/emotion-js/emotion/commit/ca599c5f392b5b1f51430dc9d8b263ed54856401) [#1901](https://github.com/emotion-js/emotion/pull/1901) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with all styles being recognized as changed in Jest 25 on unrelated changed.

### Patch Changes

- Updated dependencies [[`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf)]:
  - @emotion/css@11.0.0-next.13
  - @emotion/react@11.0.0-next.13

## 11.0.0-next.12

### Patch Changes

- Updated dependencies [[`7dea6d7a`](https://github.com/emotion-js/emotion/commit/7dea6d7a9a87f00cf9b695b58a2f65b67e17fabd), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d), [`be2eb614`](https://github.com/emotion-js/emotion/commit/be2eb614d2bc369a382dbc6aa347f66801605f3b), [`5bea60b1`](https://github.com/emotion-js/emotion/commit/5bea60b1ffab85fbc965532006c3a94ea139f0bf), [`75e2f9e1`](https://github.com/emotion-js/emotion/commit/75e2f9e1848bc0161f8db3c663438ada3042ae66), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d)]:
  - @emotion/react@11.0.0-next.12
  - @emotion/css@11.0.0-next.12

## 11.0.0-next.10

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `jest-emotion` to `@emotion/jest`. Please replace `"snapshotSerializers": ["jest-emotion"]` with `"snapshotSerializers": ["@emotion/jest"]` if you're using the snapshot serializer. Also replace any imports of `jest-emotion` with `@emotion/jest` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

### Minor Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Improve support for Enzyme's shallow rendering with the addition of the @emotion/jest/enzyme snapshot serializer

### Patch Changes

- Updated dependencies [[`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`affed3dd`](https://github.com/emotion-js/emotion/commit/affed3ddf03671835356632f26a064f59811852f), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`d62d9101`](https://github.com/emotion-js/emotion/commit/d62d9101bc75e6bc9644ae588d2a6e4bf4d69285)]:
  - @emotion/react@11.0.0-next.10
  - @emotion/css@11.0.0-next.10

## 11.0.0-next.7

### Patch Changes

- Updated dependencies [[`5c55fd17`](https://github.com/emotion-js/emotion/commit/5c55fd17dcaec84d1f5d5d13ae90dd336d7e4403)]:
  - @emotion/core@11.0.0-next.7

## 11.0.0-next.4

### Major Changes

- [`702f3fd2`](https://github.com/emotion-js/emotion/commit/702f3fd22aab8f3cb09dd547c07b9045ca5c3d9c) [#973](https://github.com/emotion-js/emotion/pull/973) Thanks [@spudly](https://github.com/spudly)! - Added the `T` parameter to the `Matchers` interface in the TypeScript definitions to make this module compatible with `@types/jest@^24.0.20`.

### Patch Changes

- Updated dependencies []:
  - @emotion/core@11.0.0-next.4

## 11.0.0-next.3

### Patch Changes

- Updated dependencies [[`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85)]:
  - @emotion/core@11.0.0-next.3

## 11.0.0-next.1

### Patch Changes

- [`e67a5be9`](https://github.com/emotion-js/emotion/commit/e67a5be9bffaa12f9ae0e366983dced4c3716f84) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@Andarist](https://github.com/Andarist)! - Take specificity into account when matching styles

* [`e67a5be9`](https://github.com/emotion-js/emotion/commit/e67a5be9bffaa12f9ae0e366983dced4c3716f84) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@Andarist](https://github.com/Andarist)! - Match rules in declarations with component used as a selector
* Updated dependencies []:
  - @emotion/core@11.0.0-next.1

## 11.0.0-next.0

### Major Changes

- [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Ensure packages are major bumped so that pre-release versions of the linked packages are consistent in the major number

### Patch Changes

- Updated dependencies [[`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555)]:
  - @emotion/core@11.0.0-next.0
  - emotion@11.0.0-next.0

## 10.0.32

### Patch Changes

- [`5af2755`](https://github.com/emotion-js/emotion/commit/5af27554d3aec20691a4675e57433bb01cd535a4) [#1808](https://github.com/emotion-js/emotion/pull/1808) Thanks [@Andarist](https://github.com/Andarist)! - Fixed compatibility with latest `jest` TS types.

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file
- Updated dependencies [[`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968)]:
  - @emotion/core@10.0.27
  - emotion@10.0.27

## 10.0.26

### Patch Changes

- [`b3c5b8de`](https://github.com/emotion-js/emotion/commit/b3c5b8de66e42dd2e6459862c9603f012ba01d54) [#1667](https://github.com/emotion-js/emotion/pull/1667) Thanks [@Andarist](https://github.com/Andarist)! - Revert improved support for Enzyme's shallow rendering - its release was an unforseen breaking change.

## 10.0.25

### Patch Changes

- [`858c6e70`](https://github.com/emotion-js/emotion/commit/858c6e70e2aa83d159dba00af16f1e34a6d93fd0) [#1648](https://github.com/emotion-js/emotion/pull/1648) Thanks [@ajs139](https://github.com/ajs139)! - Improve support for Enzyme's shallow rendering.

## 10.0.17

### Patch Changes

- [fa5ffa80](https://github.com/emotion-js/emotion/commit/fa5ffa80890a079a3f333a463284bdb683cc2e0c) [#1477](https://github.com/emotion-js/emotion/pull/1477) Thanks [@liamcmitchell-sc](https://github.com/liamcmitchell-sc)! - Fixed snapshots when using Enzyme serializer and its deep mode in combination with fragments
  - [c8de890b](https://github.com/emotion-js/emotion/commit/c8de890b5aeeaafdcc5742aab310a61aebd666bf) [#1486](https://github.com/emotion-js/emotion/pull/1486) Thanks [@Andarist](https://github.com/Andarist)! - Fix printing speedy (usually this means production) styles
  - [66cda641](https://github.com/emotion-js/emotion/commit/66cda64128631790b81e3c9df273a972358ea593) [#1478](https://github.com/emotion-js/emotion/pull/1478) Thanks [@Andarist](https://github.com/Andarist)! - Update Babel dependencies

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool

## 10.0.11

### Patch Changes

- [3705706](https://github.com/emotion-js/emotion/commit/3705706) [#1344](https://github.com/emotion-js/emotion/pull/1292) Thanks [@alanctkc](https://github.com/alanctkc)! - Allow jest-emotion matcher to match target by RegExp
