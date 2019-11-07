# @emotion/styled-base

## 11.0.0-next.2

### Major Changes

- [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Remove support for deprecated `innerRef` prop

* [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Use hooks internally for improved bundle size and a better tree in React DevTools

### Patch Changes

- Updated dependencies [[`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967)]:
  - @emotion/core@11.0.0-next.2

## 11.0.0-next.1

### Major Changes

- [`1eaa3a38`](https://github.com/emotion-js/emotion/commit/1eaa3a389876d4a623ce66735dc6db093cb2a8e6) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - TypeScript types have been restructured. These changes:

  - Reduce build times when using emotion
  - In many cases remove the need for manually specifying generic parameters for your emotion components.

  If you encounter build issues after upgrade, try removing any manually specified generic types and let them be inferred. Otherwise refer to the breaking changes list below.

  ## Improvements

  - useTheme added to EmotionTheming interface and can now create your own closed variation of withTheme. More information in the docs under the theming section.
  - Union types as props are better supported and should be inferred properly
  - Build times should be reduced significantly in larger projects.

  ## Breaking changes

  - withTheme can now have the Theme type specified when calling it. For example `withTheme<MyTheme>(MyComponent)`

    **Breaking change:** Generic argument changed, if you were specifying the ComponentType you will need to remove the generic parameter. Recommend following example setup in the TypeScript docs under theming section

  - `css` function has been restricted to prevent passing of invalid types
  - `CreateStyled` functions no longer take a second `ExtraProps` argument. Instead move it to after the create styled call. For example

    `styled<typeof MyComponent, ExtraProps>(MyComponent)({})`
    to
    `styled(MyComponent)<ExtraProps>({})`

  - `StyledComponent` type no longer supports the third generic `Theme` parameter. Instead add the `theme` prop to the first `Props` argument. For example:

    `StyledComponent<Props, {}, MyTheme>`
    to
    `StyledComponent<Props & { theme?: MyTheme }>`

### Patch Changes

- [`22935470`](https://github.com/emotion-js/emotion/commit/2293547000ce78d044d054d17564f6c2aa670687) [#1588](https://github.com/emotion-js/emotion/pull/1588) Thanks [@FezVrasta](https://github.com/FezVrasta)! - StyledComponent Flow type is now polymorphic, that means you can now define the component prop types to get better type safety.
- Updated dependencies [[`1eaa3a38`](https://github.com/emotion-js/emotion/commit/1eaa3a389876d4a623ce66735dc6db093cb2a8e6)]:
  - @emotion/serialize@1.0.0-next.0
  - @emotion/core@11.0.0-next.1

## 11.0.0-next.0

### Patch Changes

- Updated dependencies [[`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555)]:
  - @emotion/core@11.0.0-next.0

## 10.0.24

### Patch Changes

- Updated dependencies [[`5e17e456`](https://github.com/emotion-js/emotion/commit/5e17e456a66857bb3a3a5b39c9cd8f8dd89301e5)]:
  - @emotion/is-prop-valid@0.8.5

## 10.0.23

### Patch Changes

- [`97673098`](https://github.com/emotion-js/emotion/commit/97673098945a75b716d4cac100c1af46a5ae18f2) [#1570](https://github.com/emotion-js/emotion/pull/1570) Thanks [@FezVrasta](https://github.com/FezVrasta)! - Fixed package's Flow types

- Updated dependencies [[`a55f3d49`](https://github.com/emotion-js/emotion/commit/a55f3d49c2febdf7eb1bede3f12da13c3efa1399), [`ca95f385`](https://github.com/emotion-js/emotion/commit/ca95f385f7ce3da6d53de1a652b3b219f11434c4), [`6cdb5695`](https://github.com/emotion-js/emotion/commit/6cdb56959bc4b64d7178604f1eb64a058c2e58c2)]:
  - @emotion/serialize@0.11.14
  - @emotion/is-prop-valid@0.8.4

## 10.0.22

### Patch Changes

- [`4fc5657a`](https://github.com/emotion-js/emotion/commit/4fc5657ac8d0002322321cfbfc254b7196d27387) [#1219](https://github.com/emotion-js/emotion/pull/1219) Thanks [@Andarist](https://github.com/Andarist)! - Add dev hint about css object being stringified by accident

* [`c3f0bc10`](https://github.com/emotion-js/emotion/commit/c3f0bc101833fff1ee4e27c7a730b821a7df4a15) [#1545](https://github.com/emotion-js/emotion/pull/1545) Thanks [@jgroszko](https://github.com/jgroszko)! - Accept objects as `className` in styled components (they are stringified) to match React behavior

* Updated dependencies [[`4fc5657a`](https://github.com/emotion-js/emotion/commit/4fc5657ac8d0002322321cfbfc254b7196d27387), [`2fc75f26`](https://github.com/emotion-js/emotion/commit/2fc75f266b23cf48fb842953bc47eebcb5241cbd), [`10211951`](https://github.com/emotion-js/emotion/commit/10211951051729b149930a8646de14bae9ae1bbc), [`57a767ea`](https://github.com/emotion-js/emotion/commit/57a767ea3dd18eefbbdc7269cc13128caad65286)]:
  - @emotion/core@10.0.22
  - @emotion/serialize@0.11.12

## 10.0.19

- Updated dependencies [c81c0033]:
  - @emotion/serialize@0.11.11
  - @emotion/is-prop-valid@0.8.3

## 10.0.17

### Patch Changes

- [66cda641](https://github.com/emotion-js/emotion/commit/66cda64128631790b81e3c9df273a972358ea593) [#1478](https://github.com/emotion-js/emotion/pull/1478) Thanks [@Andarist](https://github.com/Andarist)! - Add warnings about using illegal escape sequences
  - [66cda641](https://github.com/emotion-js/emotion/commit/66cda64128631790b81e3c9df273a972358ea593) [#1478](https://github.com/emotion-js/emotion/pull/1478) Thanks [@Andarist](https://github.com/Andarist)! - Update Babel dependencies

## 10.0.15

### Patch Changes

- [8638c416](https://github.com/emotion-js/emotion/commit/8638c416) [#1421](https://github.com/emotion-js/emotion/pull/1421) Thanks [@Andarist](https://github.com/Andarist)! - TS: Disallow Theme parameter when it was already parametrized by using CustomStyled

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool
  - [c673e200](https://github.com/emotion-js/emotion/commit/c673e200) [#1405](https://github.com/emotion-js/emotion/pull/1405) Thanks [@ryanswanson](https://github.com/ryanswanson)! - PropsOf<C> TypeScript utilities - Support defaultProps by delegating to new JSX and React types.

## 10.0.13

- Updated dependencies [52bd655b]:
  - @emotion/is-prop-valid@0.8.1

## 10.0.12

- Updated dependencies [06426c95]:
  - @emotion/is-prop-valid@0.8.0
