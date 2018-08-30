/** @jsx jsx
 * @jest-environment node
 * @flow
 */
import { jsx } from '@emotion/core'
import { cache } from 'emotion'
import { extractCritical } from 'emotion-server'
import { Provider } from '@emotion/core'
import { renderToString } from 'react-dom/server'

test('it works', () => {
  let ele = (
    <Provider value={cache}>
      <div css={{ color: 'hotpink' }} />
    </Provider>
  )
  expect(extractCritical(renderToString(ele))).toMatchSnapshot()
})
