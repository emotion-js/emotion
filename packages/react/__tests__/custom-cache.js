/** @jsx jsx */
import 'test-utils/next-env'
import createCache from '@emotion/cache'
import { jsx, CacheProvider } from '@emotion/react'
import renderer from 'react-test-renderer'

function stylisPlugin(element) {
  if (element.type === 'decl' && element.value.startsWith('color:')) {
    element.value = `color:hotpink;`
  }
}

function render(ele) {
  return renderer.create(ele).toJSON()
}

test('with custom plugins', () => {
  let cache = createCache({
    key: 'custom-plugins',
    stylisPlugins: [stylisPlugin]
  })

  expect(
    render(
      <CacheProvider value={cache}>
        <div css={{ display: 'flex', color: 'blue' }} />
      </CacheProvider>
    )
  ).toMatchInlineSnapshot(`
    .emotion-0 {
      display: flex;
      color: hotpink;
    }

    <div
      className="emotion-0"
    />
  `)
})
