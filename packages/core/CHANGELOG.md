# @emotion/core

## 10.3.1

### Patch Changes

- [#2576](https://github.com/emotion-js/emotion/pull/2576) [`33c01578`](https://github.com/emotion-js/emotion/commit/33c015780edc4f812d36ac7f0d228cd339873736) Thanks [@Methuselah96](https://github.com/Methuselah96)! - Export `Keyframes` type to avoid TypeScript inserting `import("@emotion/serialize").Keyframes` references into declaration files emitted based on a source files exporting `keyframes` result. This avoids issues with strict package managers that don't allow accessing undeclared dependencies.

## 10.3.0

### Minor Changes

- [#2566](https://github.com/emotion-js/emotion/pull/2566) [`122e9f11`](https://github.com/emotion-js/emotion/commit/122e9f11bf3aec2100dd55cee00b74170abe1ec9) Thanks [@eps1lon](https://github.com/eps1lon), [@Andarist](https://github.com/Andarist)! - Fixed hydration mismatches if `React.useId` (an upcoming API in React 18) is used within a tree below our components.

* [#2560](https://github.com/emotion-js/emotion/pull/2560) [`b5a26619`](https://github.com/emotion-js/emotion/commit/b5a26619b158703e9bc653f6297b33350c9e7b40) Thanks [@eps1lon](https://github.com/eps1lon)! - Dropped usage of a deprecated `SFC` React type in favor of `FC`. The `FC` type has been introduced in `@types/react@16.7.2` so this version of this package is now a minimum requirement for TypeScript users.

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
