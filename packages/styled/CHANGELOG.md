# @emotion/styled

## 11.0.0-next.3

### Major Changes

- [`f9feab1a`](https://github.com/emotion-js/emotion/commit/f9feab1a5d1ca88e53c3f7a063be5d5871cc93e8) [#1575](https://github.com/emotion-js/emotion/pull/1575) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Removed support for `@emotion/styled-base` package. It has been moved to `@emotion/styled` and is available as `@emotion/styled/base`. This simplifies how the regular and base versions relate to each other and eliminates problems with stricter package managers when `@emotion/styled-base` was not installed explicitly by a user.

### Patch Changes

- Updated dependencies [[`8a896a31`](https://github.com/emotion-js/emotion/commit/8a896a31434a1d2f69e1f1467c446c884c929387), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1), [`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85), [`f9feab1a`](https://github.com/emotion-js/emotion/commit/f9feab1a5d1ca88e53c3f7a063be5d5871cc93e8), [`c5b12d90`](https://github.com/emotion-js/emotion/commit/c5b12d90316477e95ce3680a3c745cde328a14c1)]:
  - @emotion/serialize@0.11.15-next.1
  - babel-plugin-emotion@11.0.0-next.3
  - @emotion/core@11.0.0-next.3
  - @emotion/is-prop-valid@0.8.6-next.0

## 11.0.0-next.2

### Major Changes

- [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Remove support for deprecated `innerRef` prop

* [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Use hooks internally for improved bundle size and a better tree in React DevTools

### Patch Changes

- Updated dependencies [[`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967), [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967)]:
  - @emotion/styled-base@11.0.0-next.2
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
- Updated dependencies [[`1eaa3a38`](https://github.com/emotion-js/emotion/commit/1eaa3a389876d4a623ce66735dc6db093cb2a8e6), [`22935470`](https://github.com/emotion-js/emotion/commit/2293547000ce78d044d054d17564f6c2aa670687)]:
  - @emotion/styled-base@11.0.0-next.1
  - babel-plugin-emotion@11.0.0-next.1
  - @emotion/core@11.0.0-next.1

## 11.0.0-next.0

### Major Changes

- [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Ensure packages are major bumped so that pre-release versions of the linked packages are consistent in the major number

### Patch Changes

- Updated dependencies [[`b0ad4f0c`](https://github.com/emotion-js/emotion/commit/b0ad4f0c628813a42c4637857be9a969429db6f0), [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555)]:
  - babel-plugin-emotion@11.0.0-next.0
  - @emotion/core@11.0.0-next.0
  - @emotion/styled-base@11.0.0-next.0

## 10.0.23

### Patch Changes

- [`97673098`](https://github.com/emotion-js/emotion/commit/97673098945a75b716d4cac100c1af46a5ae18f2) [#1570](https://github.com/emotion-js/emotion/pull/1570) Thanks [@FezVrasta](https://github.com/FezVrasta)! - Fixed package's Flow types

- Updated dependencies [[`3927293d`](https://github.com/emotion-js/emotion/commit/3927293d0b9d96b4a7c00196e8430728759b1161), [`97673098`](https://github.com/emotion-js/emotion/commit/97673098945a75b716d4cac100c1af46a5ae18f2), [`b3a0f148`](https://github.com/emotion-js/emotion/commit/b3a0f1484f2efcc78b447639ff2e0bc0f29915ae)]:
  - babel-plugin-emotion@10.0.23
  - @emotion/styled-base@10.0.23

## 10.0.22

### Patch Changes

- [`10211951`](https://github.com/emotion-js/emotion/commit/10211951051729b149930a8646de14bae9ae1bbc) [#1553](https://github.com/emotion-js/emotion/pull/1553) Thanks [@Andarist](https://github.com/Andarist)! - Add dev warning about keyframes being interpolated into plain strings.

* [`57a767ea`](https://github.com/emotion-js/emotion/commit/57a767ea3dd18eefbbdc7269cc13128caad65286) [#1560](https://github.com/emotion-js/emotion/pull/1560) Thanks [@Andarist](https://github.com/Andarist)! - Fix composition of styles without a final semicolon in a declaration block

- [`c3f0bc10`](https://github.com/emotion-js/emotion/commit/c3f0bc101833fff1ee4e27c7a730b821a7df4a15) [#1545](https://github.com/emotion-js/emotion/pull/1545) Thanks [@jgroszko](https://github.com/jgroszko)! - Accept objects as `className` in styled components (they are stringified) to match React behavior

* [`11bea3a8`](https://github.com/emotion-js/emotion/commit/11bea3a89f38f9052c692c3df050ad802b6b954c) [#1562](https://github.com/emotion-js/emotion/pull/1562) Thanks [@FezVrasta](https://github.com/FezVrasta)! - Export Flow type definitions for @emotion/styled/macro and @emotion/css/macro

* Updated dependencies [[`4fc5657a`](https://github.com/emotion-js/emotion/commit/4fc5657ac8d0002322321cfbfc254b7196d27387), [`2fc75f26`](https://github.com/emotion-js/emotion/commit/2fc75f266b23cf48fb842953bc47eebcb5241cbd), [`10211951`](https://github.com/emotion-js/emotion/commit/10211951051729b149930a8646de14bae9ae1bbc), [`57a767ea`](https://github.com/emotion-js/emotion/commit/57a767ea3dd18eefbbdc7269cc13128caad65286), [`1bb3efe3`](https://github.com/emotion-js/emotion/commit/1bb3efe399ddf0f3332187f3c751fbba9326d02c), [`c3f0bc10`](https://github.com/emotion-js/emotion/commit/c3f0bc101833fff1ee4e27c7a730b821a7df4a15)]:
  - @emotion/core@10.0.22
  - @emotion/styled-base@10.0.22
  - babel-plugin-emotion@10.0.22

## 10.0.17

### Patch Changes

- [66cda641](https://github.com/emotion-js/emotion/commit/66cda64128631790b81e3c9df273a972358ea593) [#1478](https://github.com/emotion-js/emotion/pull/1478) Thanks [@Andarist](https://github.com/Andarist)! - Add warnings about using illegal escape sequences

## 10.0.15

### Patch Changes

- [8638c416](https://github.com/emotion-js/emotion/commit/8638c416) [#1421](https://github.com/emotion-js/emotion/pull/1421) Thanks [@Andarist](https://github.com/Andarist)! - TS: Disallow Theme parameter when it was already parametrized by using CustomStyled

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool

## 10.0.12

### Patch Changes

- [f7238e7e](https://github.com/emotion-js/emotion/commit/f7238e7e) [#1364](https://github.com/emotion-js/emotion/pull/1364) Thanks [@arcanis](https://github.com/arcanis)! - Adds @emotion/core & react to the peer dependencies
- [b849f66c](https://github.com/emotion-js/emotion/commit/b849f66c) [#1369](https://github.com/emotion-js/emotion/pull/1369) Thanks [@SavePointSam](https://github.com/SavePointSam)! - Exposed macro.d.ts

## 10.0.11

### Patch Changes

- [595aa85](https://github.com/emotion-js/emotion/commit/595aa85) [#1315](https://github.com/emotion-js/emotion/pull/1344) Thanks [@lifeiscontent](https://github.com/lifeiscontent)! - Add macro.d.ts for @emotion/styled
