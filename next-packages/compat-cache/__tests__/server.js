/** @jsx jsx
 * @jest-environment node
 * @flow
 */
import { jsx } from '@emotion/core'
import * as emotion from 'emotion'
import { extractCritical } from 'emotion-server'
import createCompatCache from '@emotion/compat-cache'
import { Provider } from '@emotion/core'
import { renderToString } from 'react-dom/server'

const cache = createCompatCache(emotion)

test('it works', () => {
  let ele = (
    <Provider value={cache}>
      <div css={{ color: 'hotpink' }} />
    </Provider>
  )
  expect(extractCritical(renderToString(ele))).toMatchSnapshot()
})
