/** @jsx jsx
 * @jest-environment node
 * @flow
 */
import { jsx } from '@emotion/core'
import { cache } from 'emotion'
import { extractCritical } from 'emotion-server'
import { CacheProvider } from '@emotion/core'
import { renderToString } from 'react-dom/server'

test('it works', () => {
  let ele = (
    <CacheProvider value={cache}>
      <div css={{ color: 'hotpink' }} />
    </CacheProvider>
  )
  expect(extractCritical(renderToString(ele))).toMatchSnapshot()
})
