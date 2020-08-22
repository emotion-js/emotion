# @emotion/sheet

## 1.0.0-next.3

### Patch Changes

- [`dc1a0c5e`](https://github.com/emotion-js/emotion/commit/dc1a0c5ed78b27fb7ce49b6296f2ca8631654cd1) [#1962](https://github.com/emotion-js/emotion/pull/1962) Thanks [@Andarist](https://github.com/Andarist)! - From now on an empty `<style/>` element gets inserted eagerly into the DOM in the constructor in non-production environments. This helps to grab used `key`s from the (JS)DOM even for sheets/caches that have not inserted any actual rules to the document yet. It allows `@emotion/jest` to find those and serialize Emotion classes properly in situations like this:

  ```js
  import styled from '@emotion/styled/macro'
  import { render } from '@testing-library/react'

  const Div = styled.div``

  test('foo', () => {
    const { container } = render(<Div />)
    expect(container).toMatchSnapshot()
  })
  ```

## 1.0.0-next.2

### Major Changes

- [`9e998e37`](https://github.com/emotion-js/emotion/commit/9e998e3755c217027ad1be0af4c64644fe14c6bf) [#1817](https://github.com/emotion-js/emotion/pull/1817) Thanks [@Andarist](https://github.com/Andarist)! - `@import` rules are no longer special-cased - they no longer are always inserted at the beginning of the stylesheet. The responsibility to put them first has been moved to a consumer of this package.

### Patch Changes

- [`91046a8c`](https://github.com/emotion-js/emotion/commit/91046a8c188327a65daac61583ef3c4458f30afb) [#1900](https://github.com/emotion-js/emotion/pull/1900) Thanks [@Andarist](https://github.com/Andarist)! - Renamed `rehydrate` method to `hydrate` to align naming to what is already used in Emotion and React itself.

## 0.10.0-next.1

### Minor Changes

- [`dfe79aca`](https://github.com/emotion-js/emotion/commit/dfe79aca696fc688f960218b16afee197926fe71) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - Added `rehydrate` method which can be used for SSRed styles. They become a part of a sheet and can be flushed.

### Patch Changes

- [`1e4a741d`](https://github.com/emotion-js/emotion/commit/1e4a741de6424d3d9c1f3ca9695e1953bed3a194) [#1572](https://github.com/emotion-js/emotion/pull/1572) Thanks [@Andarist](https://github.com/Andarist)! - Removed mentions of `maxLength` option in types & docs as it has been removed some time ago.

## 0.10.0-next.0

### Minor Changes

- [`4a891bf6`](https://github.com/emotion-js/emotion/commit/4a891bf6a30e3bb37f8f32031fa75a571c637d9c) [#1473](https://github.com/emotion-js/emotion/pull/1473) Thanks [@jcharry](https://github.com/jcharry)! - Accept new `prepend` option to allow for adding style tags at the beginning of the specified DOM container.

## 0.9.4

### Patch Changes

- [`4c62ae9`](https://github.com/emotion-js/emotion/commit/4c62ae9447959d438928e1a26f76f1487983c968) [#1698](https://github.com/emotion-js/emotion/pull/1698) Thanks [@Andarist](https://github.com/Andarist)! - Add LICENSE file

## 0.9.3

### Patch Changes

- [c0eb604d](https://github.com/emotion-js/emotion/commit/c0eb604d) [#1419](https://github.com/emotion-js/emotion/pull/1419) Thanks [@mitchellhamilton](https://github.com/mitchellhamilton)! - Update build tool
