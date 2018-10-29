// @flow
import 'test-utils/next-env'
import 'test-utils/dev-mode'
import * as React from 'react'
import { throwIfFalsy, safeQuerySelector } from 'test-utils'
import { ThemeProvider } from 'emotion-theming'
import styled from '@emotion/styled'
import { render } from 'react-dom'

test('provider with theme value that changes', () => {
  let Comp = styled.div(({ theme: { color, padding } }) => ({
    color,
    padding
  }))
  class ThemeTest extends React.Component<*, *> {
    state = { theme: { color: 'hotpink', padding: 4 } }
    render() {
      return (
        <ThemeProvider theme={this.state.theme}>
          <Comp
            id="the-thing"
            onClick={() => {
              this.setState({ theme: { color: 'hotpink', padding: 8 } })
            }}
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
