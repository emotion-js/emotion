/** @jsx jsx */
import 'test-utils/setup-env'
import { ignoreConsoleErrors } from 'test-utils'
import { jsx, ThemeProvider } from '@emotion/react'
import { render } from '@testing-library/react'
import cases from 'jest-in-case'

test('nested provider', () => {
  const { container } = render(
    <ThemeProvider theme={{ color: 'hotpink', padding: 4 }}>
      <ThemeProvider theme={{ backgroundColor: 'darkgreen', color: 'white' }}>
        <div
          css={({ color, padding, backgroundColor }) => ({
            color,
            padding,
            backgroundColor
          })}
        />
      </ThemeProvider>
    </ThemeProvider>
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('nested provider with function', () => {
  const { container } = render(
    <ThemeProvider theme={{ color: 'hotpink', padding: 4 }}>
      <ThemeProvider
        theme={theme => ({
          backgroundColor: 'darkgreen',
          ...theme,
          padding: 8
        })}
      >
        <div
          css={({ color, padding, backgroundColor }) => ({
            color,
            padding,
            backgroundColor
          })}
        />
      </ThemeProvider>
    </ThemeProvider>
  )
  expect(container.firstChild).toMatchSnapshot()
})

cases(
  'ThemeProvider throws the correct errors',
  ({ value }) => {
    ignoreConsoleErrors(() => {
      expect(() =>
        render(
          <ThemeProvider theme={{ color: 'hotpink', padding: 4 }}>
            <ThemeProvider theme={value}>
              <div
                css={({ color, padding, backgroundColor }) => ({
                  color,
                  padding,
                  backgroundColor
                })}
              />
            </ThemeProvider>
          </ThemeProvider>
        )
      ).toThrowErrorMatchingSnapshot()
    })
  },
  {
    boolean: {
      value: true
    },
    array: {
      value: ['something']
    },
    'func to undefined': {
      value: () => undefined
    },
    undefined: {
      value: undefined
    },
    null: {
      value: null
    }
  }
)
