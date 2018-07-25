// @flow
/** @jsx jsx */
import 'test-utils/dev-mode'
import { throwIfFalsy } from 'test-utils'
import { jsx, Provider } from '@emotion/core'
import { render } from 'react-dom'
import * as emotion from 'emotion'
import { css } from 'emotion'
import createCompatCache from '@emotion/compat-cache'

const cache = createCompatCache(emotion)

test('composition works from old emotion css calls', cb => {
  const cls = css`
    color: green;
  `
  throwIfFalsy(document.body).innerHTML = '<div id="root"></div>'
  render(
    <Provider value={cache}>
      <div css={cls} />
    </Provider>,
    throwIfFalsy(document.getElementById('root')),
    () => {
      expect(document.documentElement).toMatchSnapshot()
      cb()
    }
  )
})
