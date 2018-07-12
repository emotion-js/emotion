// @flow
/** @jsx jsx */
import 'test-utils/dev-mode'
import { throwIfFalsy } from 'test-utils'
import * as React from 'react'
import Provider from '@emotion/provider'
import { jsx } from '@emotion/core'
import { render } from 'react-dom'

test('provider with theme value that changes', () => {
  class ThemeTest extends React.Component<*, *> {
    state = { theme: { color: 'hotpink', padding: 4 } }
    render() {
      return (
        <Provider theme={this.state.theme}>
          <div
            id="the-thing"
            onClick={() => {
              this.setState({ theme: { color: 'hotpink', padding: 8 } })
            }}
            css={({ color, padding }) => ({
              color,
              padding
            })}
          />
        </Provider>
      )
    }
  }
  let head = throwIfFalsy(document.head)
  let body = throwIfFalsy(document.body)

  head.innerHTML = ''
  body.innerHTML = '<div id="root"></div>'

  let root = throwIfFalsy(document.getElementById('root'))

  render(<ThemeTest />, root)
  expect(document.documentElement).toMatchSnapshot()
  throwIfFalsy(document.getElementById('the-thing')).click()
  expect(document.documentElement).toMatchSnapshot()

  head.innerHTML = ''
  body.innerHTML = '<div id="root"></div>'
})
