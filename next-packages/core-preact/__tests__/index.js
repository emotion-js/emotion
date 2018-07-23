// @flow
/** @jsx jsx */
import 'test-utils/preact-mode'
import { jsx } from '@emotion/core'
import { throwIfFalsy } from 'test-utils'
import { render } from 'preact'

test('it works', () => {
  throwIfFalsy(document.body).innerHTML = `<div id="root"></div>`

  render(
    <div css={{ color: 'hotpink' }}>wow</div>,
    throwIfFalsy(document.getElementById('root'))
  )

  expect(document.documentElement).toMatchSnapshot()
})
