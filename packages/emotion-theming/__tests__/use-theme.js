// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import * as renderer from 'react-test-renderer'
import { jsx } from '@emotion/core'
import { useTheme, ThemeProvider } from 'emotion-theming'

test('useTheme works', () => {
  function TestComponent(props) {
    const theme = useTheme()
    return (
      <div
        css={{ color: theme.lightGreen, '&:hover': { color: theme.darkGreen } }}
      >
        Should be green
      </div>
    )
  }

  expect(
    renderer
      .create(
        <ThemeProvider theme={{ lightGreen: 'green', darkGreen: 'darkgreen' }}>
          <TestComponent />
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot()
})

test('Nested useTheme works', () => {
  function TestComponent1(props) {
    const theme = useTheme()
    return (
      <div
        css={{ color: theme.lightGreen, '&:hover': { color: theme.darkGreen } }}
        {...props}
      />
    )
  }

  function NestedComponent(props) {
    const theme = useTheme()
    return (
      <div
        css={{
          color: theme.lightGreen,
          '&:hover': { color: theme.darkGreen }
        }}
        {...props}
      />
    )
  }

  function TestComponent2(props) {
    return (
      <TestComponent1>
        Should be green
        <ThemeProvider
          theme={{ lightGreen: 'lawngreen', darkGreen: 'seagreen' }}
        >
          <NestedComponent>Should be lawngreen</NestedComponent>
        </ThemeProvider>
      </TestComponent1>
    )
  }

  expect(
    renderer
      .create(
        <ThemeProvider theme={{ lightGreen: 'green', darkGreen: 'darkgreen' }}>
          <TestComponent2 />
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot()
})
