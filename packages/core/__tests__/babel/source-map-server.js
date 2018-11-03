// @flow
/** @jsx jsx
 * @jest-environment node
 */
import 'test-utils/dev-mode'
import { jsx } from '@emotion/core'
import { renderToString } from 'react-dom/server'

test('basic', () => {
  let html = renderToString(
    <div css={{ color: 'hotpink' }}>some hotpink text</div>
  )
  expect(html).toMatchSnapshot()
})
