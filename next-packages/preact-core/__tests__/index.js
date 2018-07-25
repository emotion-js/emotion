// @flow
/** @jsx jsx */
import 'test-utils/dev-mode'
import 'test-utils/preact-mode'
import { jsx } from '@emotion/preact-core'
import { throwIfFalsy } from 'test-utils'
import { render } from 'preact'

test('it works', () => {
  throwIfFalsy(document.body).innerHTML = `<div id="root"></div>`

  render(
    <p>
      <div css={{ color: 'hotpink' }}>wow</div>
    </p>,
    throwIfFalsy(document.getElementById('root'))
  )

  expect(document.documentElement).toMatchSnapshot()
})
