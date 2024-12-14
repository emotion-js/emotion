/** @jsx jsx
 * @jest-environment node
 */

import { jsx } from '@emotion/react'
import { renderToString } from 'react-dom/server'

test('basic', () => {
  let html = renderToString(
    <div
      css={{
        color: 'hotpink',
        '&:hover': {
          color: 'green'
        }
      }}
    >
      some hotpink text
    </div>
  )
  expect(html).toMatchSnapshot()
})
