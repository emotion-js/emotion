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

test('extracted rules have correct keys when dealing with multiple caches', () => {
  let cache1 = createCache({ key: 'ssr-first-key' })
  let { extractCritical: extractCritical1 } = createEmotionServer(cache1)
  let ele1 = (
    <CacheProvider value={cache1}>
      <div css={{ color: 'rebeccapurple' }} />
    </CacheProvider>
  )

  let cache2 = createCache({ key: 'ssr-second-key' })
  let { extractCritical: extractCritical2 } = createEmotionServer(cache2)
  let ele2 = (
    <CacheProvider value={cache2}>
      <div css={{ color: 'rebeccapurple' }} />
    </CacheProvider>
  )

  expect([
    extractCritical1(renderToString(ele1)),
    extractCritical2(renderToString(ele2)),
  ]).toMatchSnapshot()
})
