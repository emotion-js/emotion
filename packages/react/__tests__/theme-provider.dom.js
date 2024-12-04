/** @jsx jsx */
import 'test-utils/next-env'
import { render, fireEvent } from '@testing-library/react'
import { safeQuerySelector } from 'test-utils'
import * as React from 'react'
import { jsx, ThemeProvider } from '@emotion/react'

beforeEach(() => {
  document.head.innerHTML = ''
})

test('provider with theme value that changes', () => {
  class ThemeTest extends React.Component {
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

  const { container } = render(<ThemeTest />)
  expect(container).toMatchSnapshot()
  fireEvent.click(safeQuerySelector('#the-thing'))
  expect(container).toMatchSnapshot()
})
