---
'@emotion/sheet': patch
---

From now on an empty `<style/>` element gets inserted eagerly into the DOM in the constructor in non-production environments. This helps to grab used `key`s from the (JS)DOM even for sheets/caches that have not inserted any actual rules to the document yet. It allows `@emotion/jest` to find those and serialize Emotion classes properly in situations like this:

```js
import styled from '@emotion/styled/macro'
import { render } from '@testing-library/react'

const Div = styled.div``

test('foo', () => {
  const { container } = render(<Div />)
  expect(container).toMatchSnapshot()
})
```
