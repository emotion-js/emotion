/** @jsx jsx
 * @jest-environment node
 */
// @flow
import 'test-utils/dev-mode'
import { jsx } from '@emotion/core'
import { renderToString } from 'react-dom/server'

test('basic', () => {
  let html = renderToString(
    <div
      css={{
        color: 'hotpink',
        ':hover': {
          color: 'green'
        }
      }}
    >
      some hotpink text
    </div>
  )
  expect(html).toMatchSnapshot()
})
