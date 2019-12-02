/** @jsx jsx
 * @jest-environment node
 * @flow
 */
import { jsx, Global } from '@emotion/core'
import createEmotionServer from 'create-emotion-server'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/core'
import { renderToString } from 'react-dom/server'

test('it works', () => {
  let cache = createCache()
  let { extractCritical } = createEmotionServer(cache)
  let ele = (
    <CacheProvider value={cache}>
      <div css={{ color: 'hotpink' }} />
    </CacheProvider>
  )
  expect(extractCritical(renderToString(ele))).toMatchSnapshot()
})

test('Global component extracts the styles rather than inlines it', () => {
  let cache = createCache()
  let { extractCritical } = createEmotionServer(cache)
  let ele = (
    <CacheProvider value={cache}>
      <div css={{ color: 'hotpink' }} />
      <Global styles={{ html: { color: 'green' } }} />
    </CacheProvider>
  )
  expect(extractCritical(renderToString(ele))).toMatchSnapshot()
})
