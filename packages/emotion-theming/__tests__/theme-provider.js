// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import { ignoreConsoleErrors } from 'test-utils'
import { ThemeProvider } from 'emotion-theming'
import { jsx } from '@emotion/core'
import renderer from 'react-test-renderer'
import cases from 'jest-in-case'

test('nested provider', () => {
  const tree = renderer
    .create(
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
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('nested provider with function', () => {
  const tree = renderer
    .create(
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
    .toJSON()
  expect(tree).toMatchSnapshot()
})

cases(
  'ThemeProvider throws the correct errors',
  ({ value }) => {
    ignoreConsoleErrors(() => {
      expect(() => {
        renderer.create(
          <ThemeProvider theme={{ color: 'hotpink', padding: 4 }}>
            {/* $FlowFixMe */}
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
      }).toThrowErrorMatchingSnapshot()
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
