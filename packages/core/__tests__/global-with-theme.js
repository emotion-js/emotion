// @flow
import 'test-utils/dev-mode'
import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { render, unmountComponentAtNode } from 'react-dom'
import { Global } from '@emotion/core'

beforeEach(() => {
  // $FlowFixMe
  document.head.innerHTML = ''
  // $FlowFixMe
  document.body.innerHTML = `<div id="root"></div>`
})

test('basic', () => {
  render(
    <ThemeProvider theme={{ color: 'green' }}>
      <Global
        styles={theme => ({
          html: {
            backgroundColor: theme.color
          }
        })}
      />
    </ThemeProvider>,
    // $FlowFixMe
    document.getElementById('root')
  )
  expect(document.documentElement).toMatchSnapshot()
  unmountComponentAtNode(document.getElementById('root'))
  expect(document.documentElement).toMatchSnapshot()
})
