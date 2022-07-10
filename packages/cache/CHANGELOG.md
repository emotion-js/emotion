# @emotion/cache

## 11.9.3

### Patch Changes

- [#2728](https://github.com/emotion-js/emotion/pull/2728) [`6c2d7a60`](https://github.com/emotion-js/emotion/commit/6c2d7a6010af85502ae33d14dcbd3bb62ed7612e) Thanks [@Peeja](https://github.com/Peeja)! - TypeScript type for the `container` option has been adjusted. It will now accept a `ShadowRoot`, or any other kind of `Node`.

- Updated dependencies [[`6c2d7a60`](https://github.com/emotion-js/emotion/commit/6c2d7a6010af85502ae33d14dcbd3bb62ed7612e)]:
  - @emotion/sheet@1.1.1

## 11.7.1

### Patch Changes

- [#2590](https://github.com/emotion-js/emotion/pull/2590) [`1554a7e2`](https://github.com/emotion-js/emotion/commit/1554a7e264e05780b2c5bd74ccb20a92005ba61d) Thanks [@Andarist](https://github.com/Andarist)! - Upgraded and pinned the version of Stylis - the CSS parser that Emotion uses under the hood.

## 11.6.0

### Minor Changes

- [#2521](https://github.com/emotion-js/emotion/pull/2521) [`516fe458`](https://github.com/emotion-js/emotion/commit/516fe458058c9ec8218740472b301e935801ebbc) Thanks [@mnajdova](https://github.com/mnajdova)! - Added `insertionPoint` option to the `createCache`. It can be used to insert rules after the specified element. For example, to use it with the `CacheProvider` from `@emotion/react` you can do this:

  ```jsx
  const head = document.querySelector('head')

  // <meta name="emotion-insertion-point" content="">
  const emotionInsertionPoint = document.createElement('meta')
  emotionInsertionPoint.setAttribute('name', 'emotion-insertion-point')
  emotionInsertionPoint.setAttribute('content', '')

  head.appendChild(emotionInsertionPoint)

  // the emotion sheets should be inserted right after the meta tag
  const cache = createCache({
    key: 'my-app',
    insertionPoint: emotionInsertionPoint
  })

  function App() {
    return (
      <CacheProvider value={cache}>
        <Main />
      </CacheProvider>
    )
  }
  ```

### Patch Changes

- Updated dependencies [[`9e82a991`](https://github.com/emotion-js/emotion/commit/9e82a991624b18c20c46c5974e8a127c94a54711)]:
  - @emotion/sheet@1.1.0

## 11.5.0

### Patch Changes

- [#2498](https://github.com/emotion-js/emotion/pull/2498) [`e5beae8e`](https://github.com/emotion-js/emotion/commit/e5beae8e320f3d1455e45efecdfeb7d757687a43) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an edge case issue with incorrect rules being generated. When a context selector (`&`) was used not at the beginning of a selector (which is not valid SCSS but is allowed by the Stylis parser that we are using) within a group of selectors containing a pseudoclass then it was not replaced correctly with the current context selector.

* [#2493](https://github.com/emotion-js/emotion/pull/2493) [`9ae4a91a`](https://github.com/emotion-js/emotion/commit/9ae4a91a08a6f7c5ca26a585f1c271a179db4623) Thanks [@Andarist](https://github.com/Andarist)! - Improved the declared types related to Stylis. This should improve the compatibility with the types published in `@types/stylis`.

* Updated dependencies [[`f2eda829`](https://github.com/emotion-js/emotion/commit/f2eda8295429dd1892a06cbc9496321f2a55c10a)]:
  - @emotion/sheet@1.0.3

## 11.4.0

### Patch Changes

- [#2361](https://github.com/emotion-js/emotion/pull/2361) [`38f9d44f`](https://github.com/emotion-js/emotion/commit/38f9d44f919dccbf66c835ccde3f08ab927a4940) Thanks [@danieldelcore](https://github.com/danieldelcore), [@mitchellhamilton](https://github.com/mitchellhamilton)! - Fixed moving of client-side inserted style tags from Emotion 10 when intending to hydrate Emotion 11 styles resulting in losing styles in production

## 11.1.3

### Patch Changes

- [`704b0092`](https://github.com/emotion-js/emotion/commit/704b0092ebba648c3937cc281e4d549565968201) [#2180](https://github.com/emotion-js/emotion/pull/2180) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with global styles containing pseudo selectors in at-rules not being able to be inserted.

## 11.0.0

### Major Changes

- [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - From now on `key` option is required. Please make sure it's unique (and not equal to `"css"`) as it's used for linking styles to your cache. If multiple caches share the same key they might "fight" for each other's style elements.

* [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - The parser we use ([Stylis](https://github.com/thysultan/stylis.js)) got upgraded. It fixes some long-standing parsing edge cases while being smaller and faster 🚀

  It has been completely rewritten and comes with some breaking changes. The most notable ones that might affect Emotion users are:

  - plugins written for the former Stylis v3 are not compatible with the new version. To learn more on how to write a plugin for Stylis v4 you can check out its [README](https://github.com/thysultan/stylis.js#middleware) and the source code of core plugins.
  - vendor-prefixing was previously customizable using `prefix` option. This was always limited to turning off all of some of the prefixes as all available prefixes were on by default. The `prefix` option is gone and to customize which prefixes are applied you need to fork (copy-paste) the prefixer plugin and adjust it to your needs. While this being somewhat more problematic to setup at first we believe that the vast majority of users were not customizing this anyway. By not including the possibility to customize this through an extra option the final solution is more performant because there is no extra overhead of checking if a particular property should be prefixed or not.
  - the prefixer is now just a plugin which happens to be included in the default `stylisPlugins`. If you plan to use custom `stylisPlugins` and you want to have your styles prefixed automatically you must include prefixer in your custom `stylisPlugins`. You can import `prefixer` from the `stylis` module to do that.
  - `@import` rules are no longer special-cased. The responsibility to put them first has been moved to the author of the styles. They also can't be nested within other rules now. It's only possible to write them at the top level of global styles.

### Minor Changes

- [`4a891bf6`](https://github.com/emotion-js/emotion/commit/4a891bf6a30e3bb37f8f32031fa75a571c637d9c) [#1473](https://github.com/emotion-js/emotion/pull/1473) Thanks [@jcharry](https://github.com/jcharry)! - The new `prepend` option can make Emotion add style tags at the beginning of the specified DOM container instead of the end.

### Patch Changes

- [`a8eb4e75`](https://github.com/emotion-js/emotion/commit/a8eb4e75eed26763dc4f82ddd9bb49af4552768b) [#1998](https://github.com/emotion-js/emotion/pull/1998) Thanks [@Andarist](https://github.com/Andarist)! - Styles are now correctly extracted from the correct cache (`key`-sensitive) on the server.

* [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - Fixed issue with SSRed styles causing a React rehydration mismatch between server & client when cache was created in render.

- [`39be057b`](https://github.com/emotion-js/emotion/commit/39be057b1a0c6b76f2cb7a455cb8bc35fe875ba0) [#1997](https://github.com/emotion-js/emotion/pull/1997) Thanks [@Andarist](https://github.com/Andarist)! - From now on an empty rule will get inserted into the DOM in non-production environments if it gets created by the user. This helps to grab used `key`s from the (JS)DOM even for caches that have not inserted any actual rules to the document yet. It allows `@emotion/jest` to find those and serialize Emotion classes properly in situations like this:

  ```js
  import styled from '@emotion/styled/macro'
  import { render } from '@testing-library/react'
  const Div = styled.div``
  test('foo', () => {
    const { container } = render(<Div />)
    expect(container).toMatchSnapshot()
  })
  ```

- Updated dependencies [[`42df3f3b`](https://github.com/emotion-js/emotion/commit/42df3f3bc01526eed61cedba106d86b9e3807f9d), [`4a891bf6`](https://github.com/emotion-js/emotion/commit/4a891bf6a30e3bb37f8f32031fa75a571c637d9c), [`1e4a741d`](https://github.com/emotion-js/emotion/commit/1e4a741de6424d3d9c1f3ca9695e1953bed3a194), [`debaad9a`](https://github.com/emotion-js/emotion/commit/debaad9ab4bd6c80312092826d9146f3d29c0899), [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf)]:
  - @emotion/sheet@1.0.0
  - @emotion/utils@1.0.0

## 11.0.0-rc.0

### Major Changes

- [`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63) [#2030](https://github.com/emotion-js/emotion/pull/2030) Thanks [@Andarist](https://github.com/Andarist)! - Release candidate version.

### Patch Changes

- Updated dependencies [[`9c4ebc16`](https://github.com/emotion-js/emotion/commit/9c4ebc160471097c5d04fb92dba3ed0df870bb63)]:
  - @emotion/sheet@1.0.0-rc.0
  - @emotion/utils@1.0.0-rc.0

## 11.0.0-next.19

### Patch Changes

- [`42df3f3b`](https://github.com/emotion-js/emotion/commit/42df3f3bc01526eed61cedba106d86b9e3807f9d) [#2028](https://github.com/emotion-js/emotion/pull/2028) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with Emotion messing up style elements already processed by previously initialized Emotion copy.

- Updated dependencies [[`42df3f3b`](https://github.com/emotion-js/emotion/commit/42df3f3bc01526eed61cedba106d86b9e3807f9d)]:
  - @emotion/sheet@1.0.0-next.5

## 11.0.0-next.18

### Patch Changes

- [`19df60b8`](https://github.com/emotion-js/emotion/commit/19df60b8382814f241f909e1f4cb98fe19e72a4a) [#2015](https://github.com/emotion-js/emotion/pull/2015) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with rules nested in orphaned pseudo selectors not being adjusted correctly.

## 11.0.0-next.16

### Patch Changes

- [`a8eb4e75`](https://github.com/emotion-js/emotion/commit/a8eb4e75eed26763dc4f82ddd9bb49af4552768b) [#1998](https://github.com/emotion-js/emotion/pull/1998) Thanks [@Andarist](https://github.com/Andarist)! - Styles are now correctly extracted from the correct cache (`key`-sensitive) on the server.

* [`dfe98028`](https://github.com/emotion-js/emotion/commit/dfe98028451a27c5190fa1ba138e51ef3d6d9be1) [#2003](https://github.com/emotion-js/emotion/pull/2003) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with orphaned pseudo selectors (e.g. `:hover` - where `&:hover`, `div:hover`, etc are not considered orphaned) having the context selector (the one computed based on all ancestor levels selectors) doubled in a descendant at-rule.

- [`39be057b`](https://github.com/emotion-js/emotion/commit/39be057b1a0c6b76f2cb7a455cb8bc35fe875ba0) [#1997](https://github.com/emotion-js/emotion/pull/1997) Thanks [@Andarist](https://github.com/Andarist)! - From now on an empty rule will get inserted into the DOM in non-production environments if it gets created by the user. This helps to grab used `key`s from the (JS)DOM even for caches that have not inserted any actual rules to the document yet. It allows `@emotion/jest` to find those and serialize Emotion classes properly in situations like this:

  ```js
  import styled from '@emotion/styled/macro'
  import { render } from '@testing-library/react'
  const Div = styled.div``
  test('foo', () => {
    const { container } = render(<Div />)
    expect(container).toMatchSnapshot()
  })
  ```

- Updated dependencies [[`debaad9a`](https://github.com/emotion-js/emotion/commit/debaad9ab4bd6c80312092826d9146f3d29c0899), [`39be057b`](https://github.com/emotion-js/emotion/commit/39be057b1a0c6b76f2cb7a455cb8bc35fe875ba0)]:
  - @emotion/utils@1.0.0-next.1
  - @emotion/sheet@1.0.0-next.4

## 11.0.0-next.15

### Patch Changes

- Updated dependencies [[`dc1a0c5e`](https://github.com/emotion-js/emotion/commit/dc1a0c5ed78b27fb7ce49b6296f2ca8631654cd1)]:
  - @emotion/sheet@1.0.0-next.3

## 11.0.0-next.13

### Major Changes

- [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - The parser we use ([Stylis](https://github.com/thysultan/stylis.js)) got upgraded. It fixes some long-standing parsing edge cases while being smaller and faster 🚀

  It has been completely rewritten and comes with some breaking changes. Most notable ones that might affect Emotion users are:

  - plugins written for the former Stylis v3 are not compatible with the new version. To learn more on how to write a plugin for Stylis v4 you can check out its [README](https://github.com/thysultan/stylis.js#middleware) and the source code of core plugins.
  - vendor-prefixing was previously customizable using `prefix` option. This was always limited to turning off all of some of the prefixes as all available prefixes were on by default. The `prefix` option is gone and to customize which prefixes are applied you need to fork (copy-paste) the prefixer plugin and adjust it to your needs. While this being somewhat more problematic to setup at first we believe that the vast majority of users were not customizing this anyway. By not including the possibility to customize this through an extra option the final solution is more performant because there is no extra overhead of checking if a particular property should be prefixed or not.
  - Prefixer is now just a plugin which happens to be put in default `stylisPlugins`. If you plan to use custom `stylisPlugins` and you want to have your styles prefixed automatically you must include prefixer in your custom `stylisPlugins`. You can import `prefixer` from the `stylis` module to do that.
  - `@import` rules are no longer special-cased. The responsibility to put them first has been moved to the author of the styles. They also can't be nested within other rules now. It's only possible to write them at the top level of global styles.

### Patch Changes

- Updated dependencies [[`91046a8c`](https://github.com/emotion-js/emotion/commit/91046a8c188327a65daac61583ef3c4458f30afb), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf), [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf)]:
  - @emotion/sheet@1.0.0-next.2
  - @emotion/utils@1.0.0-next.0

## 11.0.0-next.12

### Major Changes

- [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - From now on `key` option is required. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache. If multiple caches share the same key they might "fight" for each other's style elements.

### Patch Changes

- [`105de5c8`](https://github.com/emotion-js/emotion/commit/105de5c8752be0983c000e1e26462dc8fcf0708d) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - Fixed issue with SSRed styles causing a React rehydration mismatch between server & client when cache was created in render.

## 11.0.0-next.10

### Patch Changes

- [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - Use sheet's `rehydrate` method for SSRed styles which inserts rehydrated styles at correct position when used in combination with `prepend` option.
- Updated dependencies [[`1e4a741d`](https://github.com/emotion-js/emotion/commit/1e4a741de6424d3d9c1f3ca9695e1953bed3a194), [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71)]:
  - @emotion/sheet@0.10.0-next.1

## 11.0.0-next.6

### Minor Changes

- [`4a891bf6`](https://github.com/emotion-js/emotion/commit/4a891bf6a30e3bb37f8f32031fa75a571c637d9c) [#1473](https://github.com/emotion-js/emotion/pull/1473) Thanks [@jcharry](https://github.com/jcharry)! - Accept new `prepend` option to allow for adding style tags at the beginning of the specified DOM container.

### Patch Changes

- Updated dependencies [[`4a891bf6`](https://github.com/emotion-js/emotion/commit/4a891bf6a30e3bb37f8f32031fa75a571c637d9c)]:
  - @emotion/sheet@0.10.0-next.0

## 11.0.0-next.0

### Major Changes

- [`302bdba1`](https://github.com/emotion-js/emotion/commit/302bdba1a6b793484c09edeb668815c5e31ea555) [#1600](https://github.com/emotion-js/emotion/pull/1600) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Ensure packages are major bumped so that pre-release versions of the linked packages are consistent in the major number

## 10.0.29

### Patch Changes

- Updated dependencies [[`446e756`](https://github.com/emotion-js/emotion/commit/446e75661c4aa01e51d1466472a212940c19cd82)]:
  - @emotion/hash@0.8.0

## 10.0.27

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file
- Updated dependencies [[`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968)]:
  - @emotion/hash@0.7.4
  - @emotion/sheet@0.9.4
  - @emotion/stylis@0.8.5
  - @emotion/utils@0.11.3
  - @emotion/weak-memoize@0.2.5

## 10.0.19

- Updated dependencies [c81c0033]:
  - @emotion/hash@0.7.3
  - @emotion/weak-memoize@0.2.4

## 10.0.17

### Patch Changes

- [10514a86](https://github.com/emotion-js/emotion/commit/10514a8635dcaa55b85c7bff90e2a9e14d1ba61f) [#1482](https://github.com/emotion-js/emotion/pull/1482) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Remove react native bundles in favour of different isBrowser detection
  - [16ff2330](https://github.com/emotion-js/emotion/commit/16ff233061e35fe71bfb1671da54ac12d6fc9eeb) [#1483](https://github.com/emotion-js/emotion/pull/1483) Thanks [@JakeGinnivan](https://github.com/JakeGinnivan)! - nth selector will no longer warn when using extract critical

## 10.0.15

### Patch Changes

- [61e61edc](https://github.com/emotion-js/emotion/commit/61e61edc) [#1412](https://github.com/emotion-js/emotion/pull/1412) Thanks [@donysukardi](https://github.com/donysukardi)! - Add explicit entries for react-native and sketch environments

## 10.0.14

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool
