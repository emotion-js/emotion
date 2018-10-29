// @flow
import * as React from 'react'
import 'test-utils/next-env'
import { ignoreConsoleErrors } from 'test-utils'
import { ThemeProvider } from 'emotion-theming'
import styled from '@emotion/styled'
import renderer from 'react-test-renderer'
import cases from 'jest-in-case'

let Comp = styled.div(({ theme: { color, padding, backgroundColor } }) => ({
  color,
  padding,
  backgroundColor
}))

test('nested provider', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={{ color: 'hotpink', padding: 4 }}>
        <ThemeProvider theme={{ backgroundColor: 'darkgreen', color: 'white' }}>
          <Comp />
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
          <Comp />
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
              <Comp />
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
