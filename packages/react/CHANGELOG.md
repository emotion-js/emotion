# @emotion/react

## 11.7.0

### Patch Changes

- [#2534](https://github.com/emotion-js/emotion/pull/2534) [`57be9e8c`](https://github.com/emotion-js/emotion/commit/57be9e8cb20313bd2ed297a39c41ca0f0ca37ea8) Thanks [@srmagura](https://github.com/srmagura)! - Changed the implementation of the runtime label extraction in elements using the css prop (that only happens in development) to one that should yield more consistent results across browsers. This fixes some minor issues with React reporting hydration mismatches that wouldn't happen in production.

## 11.6.0

### Minor Changes

- [#2542](https://github.com/emotion-js/emotion/pull/2542) [`eb013d25`](https://github.com/emotion-js/emotion/commit/eb013d25722f4fd9af9acf699789bf6b8afac871) Thanks [@eps1lon](https://github.com/eps1lon)! - Fixed hydration mismatches if `React.useId` (the upcoming API of the React 18) is used within a tree below our components.

### Patch Changes

- [#2551](https://github.com/emotion-js/emotion/pull/2551) [`99fcea04`](https://github.com/emotion-js/emotion/commit/99fcea04a27458b94982bb8fcd7d209f21278013) Thanks [@Andarist](https://github.com/Andarist)! - Shorten the path of the "private" `isolated-hoist-non-react-statics-do-not-use-this-in-your-code` entrypoint to avoid exeeding path limitations on Windows.

- Updated dependencies [[`9e82a991`](https://github.com/emotion-js/emotion/commit/9e82a991624b18c20c46c5974e8a127c94a54711), [`516fe458`](https://github.com/emotion-js/emotion/commit/516fe458058c9ec8218740472b301e935801ebbc)]:
  - @emotion/sheet@1.1.0
  - @emotion/cache@11.6.0

## 11.5.0

### Patch Changes

- [#2498](https://github.com/emotion-js/emotion/pull/2498) [`e5beae8e`](https://github.com/emotion-js/emotion/commit/e5beae8e320f3d1455e45efecdfeb7d757687a43) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an edge case issue with incorrect rules being generated. When a context selector (`&`) was used not at the beginning of a selector (which is not valid SCSS but is allowed by the Stylis parser that we are using) within a group of selectors containing a pseudoclass then it was not replaced correctly with the current context selector.

* [#2500](https://github.com/emotion-js/emotion/pull/2500) [`eda5e687`](https://github.com/emotion-js/emotion/commit/eda5e687c0bc4eddcafb243a2b1028296fb45cba) Thanks [@Jarred-Sumner](https://github.com/Jarred-Sumner)! - Fix error loading @emotion/react in alternative JS environments

* Updated dependencies [[`e5beae8e`](https://github.com/emotion-js/emotion/commit/e5beae8e320f3d1455e45efecdfeb7d757687a43), [`9ae4a91a`](https://github.com/emotion-js/emotion/commit/9ae4a91a08a6f7c5ca26a585f1c271a179db4623), [`f2eda829`](https://github.com/emotion-js/emotion/commit/f2eda8295429dd1892a06cbc9496321f2a55c10a)]:
  - @emotion/cache@11.5.0
  - @emotion/sheet@1.0.3

## 11.4.1

### Patch Changes

- [#2441](https://github.com/emotion-js/emotion/pull/2441) [`24557d9d`](https://github.com/emotion-js/emotion/commit/24557d9d6409db453fdbaa031cb635820305f137) Thanks [@garronej](https://github.com/garronej)! - Exposed `__unsafe_useEmotionCache` which can be used to access the current Emotion's cache in an easier way than before. Using this might break 0-config SSR and is not recommended to be used unless there you know what you are doing and you are OK with the mentioned downside.

* [#2424](https://github.com/emotion-js/emotion/pull/2424) [`cd25b62d`](https://github.com/emotion-js/emotion/commit/cd25b62da80119bfb1c74a8d0a3516fcd2f62e0e) Thanks [@tills13](https://github.com/tills13)! - Use theme context when rendering components at all times. This removes a conditional usage of a React hook that could break [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) in some scenarios.

- [#2428](https://github.com/emotion-js/emotion/pull/2428) [`a69929d6`](https://github.com/emotion-js/emotion/commit/a69929d6ab47e834a3535525657829c81dd97b4a) Thanks [@eps1lon](https://github.com/eps1lon)! - Added display names to public React contexts in development builds. This helps to recognize them in React Developer Tools.

- Updated dependencies [[`405af5ca`](https://github.com/emotion-js/emotion/commit/405af5ca01dcc0cac64227db082ce3f483e1bb46)]:
  - @emotion/sheet@1.0.2

## 11.4.0

### Patch Changes

- [#2334](https://github.com/emotion-js/emotion/pull/2334) [`7d9e74f8`](https://github.com/emotion-js/emotion/commit/7d9e74f8f0d0e0ea60573a19965eded61dc41024) Thanks [@Andarist](https://github.com/Andarist)! - The Global component no longer replaces style elements from server-rendering on first mount and instead reuses the server-side rendered style element

- Updated dependencies [[`38f9d44f`](https://github.com/emotion-js/emotion/commit/38f9d44f919dccbf66c835ccde3f08ab927a4940)]:
  - @emotion/cache@11.4.0

## 11.1.5

### Patch Changes

- [`4d2e732e`](https://github.com/emotion-js/emotion/commit/4d2e732e9f0c8385c77c7bc43d4ccea7b30b9d37) [#2206](https://github.com/emotion-js/emotion/pull/2206) Thanks [@jimmydief](https://github.com/jimmydief)! - Added export for `SerializedStyles` Flow type.

## 11.1.4

### Patch Changes

- [`71ca9be3`](https://github.com/emotion-js/emotion/commit/71ca9be3368ddb0a95ef5b2db7a97c67ab440593) [#2181](https://github.com/emotion-js/emotion/pull/2181) Thanks [@101arrowz](https://github.com/101arrowz)! - Fixed some typing issues with React components with custom generic render functions.

## 11.1.3

### Patch Changes

- [`704b0092`](https://github.com/emotion-js/emotion/commit/704b0092ebba648c3937cc281e4d549565968201) [#2180](https://github.com/emotion-js/emotion/pull/2180) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with global styles containing pseudo selectors in at-rules not being able to be inserted.

- Updated dependencies [[`704b0092`](https://github.com/emotion-js/emotion/commit/704b0092ebba648c3937cc281e4d549565968201)]:
  - @emotion/cache@11.1.3

## 11.1.2

### Patch Changes

- [`3f8bf70e`](https://github.com/emotion-js/emotion/commit/3f8bf70e995267ace1e04b6a97df35ae23902fed) [#2132](https://github.com/emotion-js/emotion/pull/2132) Thanks [@dcastil](https://github.com/dcastil)! - `displayName`s have been added to `Global` and `ClassNames` components so React Developer Tools should display those better now.

* [`1ee34005`](https://github.com/emotion-js/emotion/commit/1ee34005a5e02c9041b36f73395700f1965388eb) [#2122](https://github.com/emotion-js/emotion/pull/2122) Thanks [@dcastil](https://github.com/dcastil)! - Improved label extraction from the stack traces to handle components with numbers in their names.

- [`e5843530`](https://github.com/emotion-js/emotion/commit/e58435308d880a69c6ccfde15d745e6c95d3c333) [#2140](https://github.com/emotion-js/emotion/pull/2140) Thanks [@hasparus](https://github.com/hasparus)! - Fixed an issue with `css` prop type not being added to all components that accept a string `className` correctly.

- Updated dependencies [[`5469d003`](https://github.com/emotion-js/emotion/commit/5469d0034d055a34587e9d05332f6da4d4722b1c)]:
  - @emotion/sheet@1.0.1

## 11.1.1

### Patch Changes

- [`fdd46bdf`](https://github.com/emotion-js/emotion/commit/fdd46bdf71f6a0aa9c8401ca91b38d48849cece5) [#2112](https://github.com/emotion-js/emotion/pull/2112) Thanks [@Andarist](https://github.com/Andarist)! - Fixed the latest tree-shakeability improvements by adding `"sideEffects": false` to all internal `package.json` files as well. This fixes [`hoist-non-react-statics`](https://github.com/mridgway/hoist-non-react-statics) not being dropped correctly despite of the latest improvements.

## 11.1.0

### Patch Changes

- [`0e465d1c`](https://github.com/emotion-js/emotion/commit/0e465d1c46619409f8f9a5123451243dd3b31e9b) [#2101](https://github.com/emotion-js/emotion/pull/2101) Thanks [@Andarist](https://github.com/Andarist)! - Improved tree-shakeability of the package. The main benefit is that bundlers should be able now to drop [`hoist-non-react-statics`](https://github.com/mridgway/hoist-non-react-statics) if you don't actually use our `withTheme` export.

## 11.0.0

### Major Changes

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `@emotion/core` to `@emotion/react`. Please change any imports of `@emotion/core` to import `@emotion/react` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

* [`cbb8b796`](https://github.com/emotion-js/emotion/commit/cbb8b7965c2923cf1922d724de556374323bff61) [#1628](https://github.com/emotion-js/emotion/pull/1628) Thanks [@Andarist](https://github.com/Andarist)! - `emotion-theming` has been removed and all its exports were moved to `@emotion/react` package. Please import them like this `import { useTheme, ThemeProvider, withTheme } from '@emotion/react'` from now on.

- [`a72e6dc`](https://github.com/emotion-js/emotion/commit/a72e6dc0f326b7d3d6067698d433018ee8c4cbf1) [#1501](https://github.com/emotion-js/emotion/pull/1501) Thanks [@JakeGinnivan](https://github.com/JakeGinnivan)! - TypeScript types have been significantly restructured. These changes:

  - reduce build times when using Emotion, especially in larger projects
  - it's no longer necessary to manually specify generic parameters for your Emotion components in many cases
  - union types as props are better supported and should be inferred properly
  - the `css` function has been restricted to prevent passing invalid types
  - `styled`'s generic parameter has been changed, if you were specifying the `ComponentType` you will need to remove that generic parameter
  - `styled` no longer takes a second `ExtraProps` parameter - instead of that move it to after the `styled` call. So instead of writing `styled<typeof MyComponent, ExtraProps>(MyComponent)({})` you should now be writing `styled(MyComponent)<ExtraProps>({})`

  If you encounter build issues after upgrade, try removing any manually specified generic types and let them be inferred.

* [`c6431074`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b) [#1609](https://github.com/emotion-js/emotion/pull/1609) Thanks [@tomsseisums](https://github.com/tomsseisums)! - It's now easier to provide a type for `Theme`. Instead of creating custom instances (like before) you can augment the builtin `Theme` interface like this:

  ```ts
  import '@emotion/react'

  declare module '@emotion/react' {
    export interface Theme {
      primaryColor: string
      secondaryColor: string
    }
  }
  ```

- [`f57a7229`](https://github.com/emotion-js/emotion/commit/f57a72299cd4025a725bd5bd1b966a8f9df16cd8) [#1941](https://github.com/emotion-js/emotion/pull/1941) Thanks [@Andarist](https://github.com/Andarist)! - The way in which we provide TypeScript support for the `css` prop has changed. Based on the usage of our JSX factories, we can add support for `css` prop only for components that support `className` prop (as our JSX factory functions take the provided `css` prop, resolve it and pass the generated `className` to the rendered component).

  For the classic runtime this has been implemented using technique described [here](https://www.typescriptlang.org/docs/handbook/jsx.html#factory-functions). What is important - we no longer extend any global interfaces, so people shouldn't bump anymore into type conflicts for the `css` prop when using different libraries with `css` prop support, such as `styled-components`.

  For the automatic runtime this has been implemented by exporting `JSX` namespace from the appropriate entries but this is only supported in **TypeScript 4.1 or higher**.

  However, if you are stuck with older version of TypeScript or using the classic runtime implicitly by using our `@emotion/babel-preset-css-prop` then it's not possible to leverage leverage `css` prop support being added conditionally based on a type of rendered component. For those cases we have added a special file that can be imported once to add support for the `css` prop globally, for all components. Use it like this:

  ```ts
  /// <reference types="@emotion/react/types/css-prop" />
  ```

  In this particular case we are forced to extend the existing `React.Attributes` interface. Previously we've been extending both `React.DOMAttributes<T>` and `JSX.IntrinsicAttributes`. This change is really minor and shouldn't affect any consuming code.

- [`843bfb11`](https://github.com/emotion-js/emotion/commit/843bfb1153ee0dbe33d005fdd5c5be185daa5c41) [#1630](https://github.com/emotion-js/emotion/pull/1630) Thanks [@Andarist](https://github.com/Andarist)! - Removed default export from `@emotion/css` - it's main purpose was to allow `css` to be a Babel macro, but since babel-plugin-macros allows us to keep imports nowadays this is no longer needed. `@emotion/react/macro` has been added to account for this use case and appropriate changes has been made to `@emotion/babel-plugin` to facilitate those changes.

  If you have used `@emotion/css` directly (it was always reexported from `@emotion/react`) or you have been using its macro then you should update your code like this:

  ```diff
  -import css from '@emotion/css'
  +import { css } from '@emotion/react'

  // or
  -import css from '@emotion/css/macro'
  +import { css } from '@emotion/react/macro'
  ```

  You can also use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin` to do this for you.

* [`79036056`](https://github.com/emotion-js/emotion/commit/79036056808eefc81a77225254f7c25c2ff9d967) [#967](https://github.com/emotion-js/emotion/pull/967) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Use hooks internally for improved bundle size and a better tree in React DevTools

- [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - The parser we use ([Stylis](https://github.com/thysultan/stylis.js)) got upgraded. It fixes some long-standing parsing edge cases while being smaller and faster 🚀

  It has been completely rewritten and comes with some breaking changes. The most notable ones that might affect Emotion users are:

  - plugins written for the former Stylis v3 are not compatible with the new version. To learn more on how to write a plugin for Stylis v4 you can check out its [README](https://github.com/thysultan/stylis.js#middleware) and the source code of core plugins.
  - vendor-prefixing was previously customizable using `prefix` option. This was always limited to turning off all of some of the prefixes as all available prefixes were on by default. The `prefix` option is gone and to customize which prefixes are applied you need to fork (copy-paste) the prefixer plugin and adjust it to your needs. While this being somewhat more problematic to setup at first we believe that the vast majority of users were not customizing this anyway. By not including the possibility to customize this through an extra option the final solution is more performant because there is no extra overhead of checking if a particular property should be prefixed or not.
  - the prefixer is now just a plugin which happens to be included in the default `stylisPlugins`. If you plan to use custom `stylisPlugins` and you want to have your styles prefixed automatically you must include prefixer in your custom `stylisPlugins`. You can import `prefixer` from the `stylis` module to do that.
  - `@import` rules are no longer special-cased. The responsibility to put them first has been moved to the author of the styles. They also can't be nested within other rules now. It's only possible to write them at the top level of global styles.

* [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - `[data-emotion]` attribute on SSRed styled has changed. You should never rely on it though.

* [`cf56694`](https://github.com/emotion-js/emotion/commit/cf56694d54d0b2bd6208f561d8ce829da4918952) [#2088](https://github.com/emotion-js/emotion/pull/2088) Thanks [@Andarist](https://github.com/Andarist)! - UMD filenames have been changed.

### Minor Changes

- [`c672175b`](https://github.com/emotion-js/emotion/commit/c672175b52e86de43b3d4092a8fe34b2023ceae8) [#1130](https://github.com/emotion-js/emotion/pull/1130) Thanks [@jtmthf](https://github.com/jtmthf)! - Support functions in arrays passed to `css` prop and `Global`'s styles prop. This allows for composition of theme-accepting functions.

* [`828111cd`](https://github.com/emotion-js/emotion/commit/828111cd32d3fe8c984231201e518d1b6000bffd) [#1639](https://github.com/emotion-js/emotion/pull/1639) Thanks [@Andarist](https://github.com/Andarist)! - `Global` imported from macro entry (`@emotion/react/macro`) gets source maps generated now when inline css-less expression is used as value of the `styles` prop.

- [`5d692a6a`](https://github.com/emotion-js/emotion/commit/5d692a6a8102b3faabefb773dd0145b123668a07) [#1956](https://github.com/emotion-js/emotion/pull/1956) Thanks [@eps1lon](https://github.com/eps1lon)! - Upgraded [`csstype`](https://www.npmjs.com/package/csstype) dependency to its v3. This is what we use to provide TypeScript typings for object styles. The upgrade should not affect any consuming code but it's worth mentioning if any edge case scenarios arise.

### Patch Changes

- [`7dea6d7a`](https://github.com/emotion-js/emotion/commit/7dea6d7a9a87f00cf9b695b58a2f65b67e17fabd) [#1734](https://github.com/emotion-js/emotion/pull/1734) Thanks [@Andarist](https://github.com/Andarist)! - Fixed styles inserted by `<Global/>` component not inheriting `speedy` option from a cache passed to a wrapping `<CacheProvider/>`.

- [`5c55fd17`](https://github.com/emotion-js/emotion/commit/5c55fd17dcaec84d1f5d5d13ae90dd336d7e4403) [#1653](https://github.com/emotion-js/emotion/pull/1653) Thanks [@Andarist](https://github.com/Andarist)! - Fix to what location generated source maps are pointing in case of composed styles.

* [`75e2f9e1`](https://github.com/emotion-js/emotion/commit/75e2f9e1848bc0161f8db3c663438ada3042ae66) [#1810](https://github.com/emotion-js/emotion/pull/1810) Thanks [@Andarist](https://github.com/Andarist)! - Add a dev-only warning about styles created with `css` from `@emotion/react` being passed to `cx` from `<ClassNames/>`.

- [`d62d9101`](https://github.com/emotion-js/emotion/commit/d62d9101bc75e6bc9644ae588d2a6e4bf4d69285) [#1677](https://github.com/emotion-js/emotion/pull/1677) Thanks [@ajs139](https://github.com/ajs139)! - Warn if `@emotion/react` is initialized more than once in the same development environment.

- [`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85) [#1613](https://github.com/emotion-js/emotion/pull/1613) Thanks [@Andarist](https://github.com/Andarist)! - Add missing `#__PURE__` annotations

* [`58dc08a6`](https://github.com/emotion-js/emotion/commit/58dc08a6a013fb5cfa10bb85e06e53a8ff7eeb51) [#1837](https://github.com/emotion-js/emotion/pull/1837) Thanks [@arcanis](https://github.com/arcanis)! - Fixed TS compatibility under [PnP](https://classic.yarnpkg.com/en/docs/pnp/) environments by making `@types/react` an optional peer dependency.

- Updated dependencies [[`a8eb4e75`](https://github.com/emotion-js/emotion/commit/a8eb4e75eed26763dc4f82ddd9bb49af4552768b), [`e3d7db87`](https://github.com/emotion-js/emotion/commit/e3d7db87deaac95817404760112417ac1fa1b56d), [`8a896a31`](https://github.com/emotion-js/emotion/commit/8a896a31434a1d2f69e1f1467c446c884c929387), [`42df3f3b`](https://github.com/emotion-js/emotion/commit/42df3f3bc01526eed61cedba106d86b9e3807f9d), [`4a891bf6`](https://github.com/emotion-js/emotion/commit/4a891bf6a30e3bb37f8f32031fa75a571c637d9c), [`1e4a741d`](https://github.com/emotion-js/emotion/commit/1e4a741de6424d3d9c1f3ca9695e1953bed3a194), [`debaad9a`](https://github.com/emotion-js/emotion/commit/debaad9ab4bd6c80312092826d9146f3d29c0899), [`5c55fd17`](https://github.com/emotion-js/emotion/commit/5c55fd17dcaec84d1f5d5d13ae90dd336d7e4403), [`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85), [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d), [`39be057b`](https://github.com/emotion-js/emotion/commit/39be057b1a0c6b76f2cb7a455cb8bc35fe875ba0), [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d), [`5d692a6a`](https://github.com/emotion-js/emotion/commit/5d692a6a8102b3faabefb773dd0145b123668a07), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`c6431074`](https://github.com/emotion-js/emotion/commit/c6431074cf52a4bb64587c86ce5d42fe2d49230b), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf)]:
  - @emotion/cache@11.0.0
  - @emotion/serialize@1.0.0
  - @emotion/sheet@1.0.0
  - @emotion/utils@1.0.0

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

### Patch Changes

- Updated dependencies [[`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63)]:
  - @emotion/cache@11.0.0-rc.0
  - @emotion/serialize@1.0.0-rc.0
  - @emotion/sheet@1.0.0-rc.0
  - @emotion/utils@1.0.0-rc.0

## 11.0.0-next.19

### Patch Changes

- Updated dependencies [[`42df3f3b`](https://github.com/emotion-js/emotion/commit/42df3f3bc01526eed61cedba106d86b9e3807f9d), [`42df3f3b`](https://github.com/emotion-js/emotion/commit/42df3f3bc01526eed61cedba106d86b9e3807f9d)]:
  - @emotion/sheet@1.0.0-next.5
  - @emotion/cache@11.0.0-next.19

## 11.0.0-next.17

### Patch Changes

- Updated dependencies [[`76e3dc4d`](https://github.com/emotion-js/emotion/commit/76e3dc4dd3e76423aa5d527b3e66fe3be1722e5a)]:
  - @emotion/serialize@1.0.0-next.5

## 11.0.0-next.16

### Patch Changes

- [`58b2bbca`](https://github.com/emotion-js/emotion/commit/58b2bbcad63f8ea22389ccdc2a8f6c5064984e82) [#1981](https://github.com/emotion-js/emotion/pull/1981) Thanks [@Andarist](https://github.com/Andarist)! - Changed the key of the global flag that helps us identify that `@emotion/react` has been loaded more than once to include the current major version of `@emotion/react`.

- Updated dependencies [[`a8eb4e75`](https://github.com/emotion-js/emotion/commit/a8eb4e75eed26763dc4f82ddd9bb49af4552768b), [`dfe98028`](https://github.com/emotion-js/emotion/commit/dfe98028451a27c5190fa1ba138e51ef3d6d9be1), [`debaad9a`](https://github.com/emotion-js/emotion/commit/debaad9ab4bd6c80312092826d9146f3d29c0899), [`39be057b`](https://github.com/emotion-js/emotion/commit/39be057b1a0c6b76f2cb7a455cb8bc35fe875ba0), [`39be057b`](https://github.com/emotion-js/emotion/commit/39be057b1a0c6b76f2cb7a455cb8bc35fe875ba0)]:
  - @emotion/cache@11.0.0-next.16
  - @emotion/utils@1.0.0-next.1
  - @emotion/sheet@1.0.0-next.4
  - @emotion/serialize@0.11.15-next.4

## 11.0.0-next.15

### Minor Changes

- [`5d692a6a`](https://github.com/emotion-js/emotion/commit/5d692a6a8102b3faabefb773dd0145b123668a07) [#1956](https://github.com/emotion-js/emotion/pull/1956) Thanks [@eps1lon](https://github.com/eps1lon)! - Upgraded [`csstype`](https://www.npmjs.com/package/csstype) dependency to its v3. This is what we use to provide TypeScript typings for object styles. The upgrade should not affect any consuming code but it's worth mentioning if any edge case scenarios arise.

### Patch Changes

- Updated dependencies [[`dc1a0c5e`](https://github.com/emotion-js/emotion/commit/dc1a0c5ed78b27fb7ce49b6296f2ca8631654cd1), [`5d692a6a`](https://github.com/emotion-js/emotion/commit/5d692a6a8102b3faabefb773dd0145b123668a07)]:
  - @emotion/sheet@1.0.0-next.3
  - @emotion/serialize@1.0.0-next.3
  - @emotion/cache@11.0.0-next.15

## 11.0.0-next.14

### Patch Changes

- [`58dc08a6`](https://github.com/emotion-js/emotion/commit/58dc08a6a013fb5cfa10bb85e06e53a8ff7eeb51) [#1837](https://github.com/emotion-js/emotion/pull/1837) Thanks [@arcanis](https://github.com/arcanis)! - Fixed TS compatibility under [PnP](https://classic.yarnpkg.com/en/docs/pnp/) environments by making `@types/react` an optional peer dependency.

* [`f57a7229`](https://github.com/emotion-js/emotion/commit/f57a72299cd4025a725bd5bd1b966a8f9df16cd8) [#1941](https://github.com/emotion-js/emotion/pull/1941) Thanks [@Andarist](https://github.com/Andarist)! - The way in which we provide TypeScript support for `css` prop has changed. Based on usage of our jsx pragma we are able to add support for `css` prop only for components that support `className` prop (as our `jsx` factory function takes provided `css` prop, resolves it and pass the generated `className` to the rendered component). This has been implemented using technique described [here](https://www.typescriptlang.org/docs/handbook/jsx.html#factory-functions). What is important - we no longer extend any global interfaces, so people shouldn't bump anymore into type conflicts for the `css` prop when using different libraries with the `css` prop support, such as `styled-components`.

  However, it's not possible to leverage `css` prop support being added conditionally based on a type of rendered component when one is not using our jsx pragma. For those cases when people use our pragma implicitly (for example when using our `@emotion/babel-preset-css-prop`) we have added special file that can be imported once to add support for the `css` prop globally, for all components. Use it like this:

  ```ts
  import {} from '@emotion/react/types/css-prop'
  ```

  In this particular case we are forced to extend the existing `React.Attributes` interface. Previously we've been extending both `React.DOMAttributes<T>` and `JSX.IntrinsicAttributes`. This change is really minor and shouldn't affect any consuming code.

* Updated dependencies [[`4d3b60d0`](https://github.com/emotion-js/emotion/commit/4d3b60d0d448a61d762ee150e6cb7a2c995ccc2f), [`58dc08a6`](https://github.com/emotion-js/emotion/commit/58dc08a6a013fb5cfa10bb85e06e53a8ff7eeb51), [`6d32d82b`](https://github.com/emotion-js/emotion/commit/6d32d82beb45b18e5f18a37932b862ad19b17044)]:
  - @emotion/styled@11.0.0-next.14
  - @emotion/css@11.0.0-next.14
  - @emotion/server@11.0.0-next.14

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

- [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1) [#1675](https://github.com/emotion-js/emotion/pull/1675) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Rename `@emotion/core` to `@emotion/react`. Please change any imports of `@emotion/core` to import `@emotion/react` or use the `@emotion/pkg-renaming` ESLint rule from `@emotion/eslint-plugin`.

### Patch Changes

- [`affed3dd`](https://github.com/emotion-js/emotion/commit/affed3ddf03671835356632f26a064f59811852f) [#1702](https://github.com/emotion-js/emotion/pull/1702) Thanks [@Andarist](https://github.com/Andarist)! - Fix issue with published TypeScript test files augmenting Theme interface.

* [`d62d9101`](https://github.com/emotion-js/emotion/commit/d62d9101bc75e6bc9644ae588d2a6e4bf4d69285) [#1677](https://github.com/emotion-js/emotion/pull/1677) Thanks [@ajs139](https://github.com/ajs139)! - Warn if @emotion/react is initialized more than once in the same development environment.
* Updated dependencies [[`1e4a741d`](https://github.com/emotion-js/emotion/commit/1e4a741de6424d3d9c1f3ca9695e1953bed3a194), [`2fa7a213`](https://github.com/emotion-js/emotion/commit/2fa7a213222fc2bb99ca0a01078148f1a1c6458d), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`b8476e08`](https://github.com/emotion-js/emotion/commit/b8476e08af4a2e8de94a112cb0daf6e8e4d56fe1), [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71)]:
  - @emotion/sheet@0.10.0-next.1
  - @emotion/styled@11.0.0-next.10
  - @emotion/css@11.0.0-next.10
  - @emotion/server@11.0.0-next.10
  - @emotion/cache@11.0.0-next.10

## 11.0.0-next.7

### Patch Changes

- [`5c55fd17`](https://github.com/emotion-js/emotion/commit/5c55fd17dcaec84d1f5d5d13ae90dd336d7e4403) [#1653](https://github.com/emotion-js/emotion/pull/1653) Thanks [@Andarist](https://github.com/Andarist)! - Fix to what location generated source maps are pointing in case of composed styles.
- Updated dependencies [[`5c55fd17`](https://github.com/emotion-js/emotion/commit/5c55fd17dcaec84d1f5d5d13ae90dd336d7e4403), [`729ef9d8`](https://github.com/emotion-js/emotion/commit/729ef9d8408af82c7a63effc1b8728f79c66bed1)]:
  - @emotion/serialize@0.11.15-next.2
  - @emotion/styled@11.0.0-next.7

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

- [`cbb8b796`](https://github.com/emotion-js/emotion/commit/cbb8b7965c2923cf1922d724de556374323bff61) [#1628](https://github.com/emotion-js/emotion/pull/1628) Thanks [@Andarist](https://github.com/Andarist)! - `emotion-theming` has been removed and all its exports were moved to `@emotion/core` package. Please import them like this `import { useTheme, ThemeProvider, withTheme } from '@emotion/core'` from now on.

### Minor Changes

- [`828111cd`](https://github.com/emotion-js/emotion/commit/828111cd32d3fe8c984231201e518d1b6000bffd) [#1639](https://github.com/emotion-js/emotion/pull/1639) Thanks [@Andarist](https://github.com/Andarist)! - `Global` imported from macro entry (`@emotion/core/macro`) gets source maps generated now when inline css-less expression is used as value of the `styles` prop.

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

- [`a085003d`](https://github.com/emotion-js/emotion/commit/a085003d4c8ca284c116668d7217fb747802ed85) [#1613](https://github.com/emotion-js/emotion/pull/1613) Thanks [@Andarist](https://github.com/Andarist)! - Add missing `#__PURE__` annotations
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
