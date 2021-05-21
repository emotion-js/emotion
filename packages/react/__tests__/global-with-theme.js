import 'test-utils/dev-mode'
import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Global, ThemeProvider } from '@emotion/react'

beforeEach(() => {
  document.head.innerHTML = ''
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
    document.getElementById('root')
  )
  expect(document.documentElement).toMatchSnapshot()
  unmountComponentAtNode(document.getElementById('root'))
  expect(document.documentElement).toMatchSnapshot()
})

test('array', () => {
  render(
    <ThemeProvider theme={{ color: 'green', fontSize: 16 }}>
      <Global
        styles={[
          theme => ({ html: { backgroundColor: theme.color } }),
          theme => ({ html: { fontSize: theme.fontSize } })
        ]}
      />
    </ThemeProvider>,
    document.getElementById('root')
  )
  expect(document.documentElement).toMatchSnapshot()
  unmountComponentAtNode(document.getElementById('root'))
  expect(document.documentElement).toMatchSnapshot()
})
