import * as React from 'react'
import { render } from '@testing-library/react'
import { Global, ThemeProvider } from '@emotion/react'

beforeEach(() => {
  document.head.innerHTML = ''
})

test('basic', () => {
  const { unmount } = render(
    <ThemeProvider theme={{ color: 'green' }}>
      <Global
        styles={theme => ({
          html: {
            backgroundColor: theme.color
          }
        })}
      />
    </ThemeProvider>
  )
  expect(document.documentElement).toMatchSnapshot()
  unmount()
  expect(document.documentElement).toMatchSnapshot()
})

test('array', () => {
  const { unmount } = render(
    <ThemeProvider theme={{ color: 'green', fontSize: 16 }}>
      <Global
        styles={[
          theme => ({ html: { backgroundColor: theme.color } }),
          theme => ({ html: { fontSize: theme.fontSize } })
        ]}
      />
    </ThemeProvider>
  )
  expect(document.documentElement).toMatchSnapshot()
  unmount()
  expect(document.documentElement).toMatchSnapshot()
})
