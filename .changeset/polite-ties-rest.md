---
'@emotion/cache': patch
---

From now on an empty rule will get inserted into the DOM in non-production environments if it gets created by the user. This helps to grab used `key`s from the (JS)DOM even for caches that have not inserted any actual rules to the document yet. It allows `@emotion/jest` to find those and serialize Emotion classes properly in situations like this:

```js
import styled from '@emotion/styled/macro'
import { render } from '@testing-library/react'
const Div = styled.div``
test('foo', () => {
  const { container } = render(<Div />)
  expect(container).toMatchSnapshot()
})
```
