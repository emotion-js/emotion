// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import 'test-utils/dev-mode'
import { throwIfFalsy, safeQuerySelector } from 'test-utils'
import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { jsx } from '@emotion/core'
import { render } from 'react-dom'

test('provider with theme value that changes', () => {
  class ThemeTest extends React.Component<*, *> {
    state = { theme: { color: 'hotpink', padding: 4 } }
    render() {
      return (
        <ThemeProvider theme={this.state.theme}>
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
        </ThemeProvider>
      )
    }
  }
  let head = throwIfFalsy(document.head)
  let body = throwIfFalsy(document.body)

  head.innerHTML = ''
  body.innerHTML = '<div id="root"></div>'

  let root = safeQuerySelector('#root')

  render(<ThemeTest />, root)
  expect(root).toMatchSnapshot()
  throwIfFalsy(safeQuerySelector('#the-thing')).click()
  expect(root).toMatchSnapshot()

  head.innerHTML = ''
  body.innerHTML = '<div id="root"></div>'
})
