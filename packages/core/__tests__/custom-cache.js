// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import createCache from '@emotion/cache'
import { jsx, CacheProvider } from '@emotion/core'
import renderer from 'react-test-renderer'

function render(ele) {
  return renderer.create(ele).toJSON()
}

test('with prefix option', () => {
  let cache = createCache({ prefix: false })

  expect(
    render(
      <CacheProvider value={cache}>
        <div css={{ display: 'flex' }} />
      </CacheProvider>
    )
  ).toMatchInlineSnapshot(`
.emotion-0 {
  display: flex;
}

<div
  className="emotion-0"
/>
`)
})
