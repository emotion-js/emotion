/** @jsx jsx
 * @jest-environment node
 * @flow
 */
import { jsx, Global } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { renderToString } from 'react-dom/server'

test('it works', () => {
  let cache = createCache({ key: 'ssr' })
  let { extractCritical } = createEmotionServer(cache)
  let ele = (
    <CacheProvider value={cache}>
      <div css={{ color: 'hotpink' }} />
    </CacheProvider>
  )
  expect(extractCritical(renderToString(ele))).toMatchSnapshot()
})

test('Global component extracts the styles rather than inlines it', () => {
  let cache = createCache({ key: 'ssr' })
  let { extractCritical } = createEmotionServer(cache)
  let ele = (
    <CacheProvider value={cache}>
      <div css={{ color: 'hotpink' }} />
      <Global styles={{ html: { color: 'green' } }} />
    </CacheProvider>
  )
  expect(extractCritical(renderToString(ele))).toMatchSnapshot()
})
