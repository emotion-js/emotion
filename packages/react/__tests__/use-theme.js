/** @jsx jsx */
import 'test-utils/setup-env'
import { render } from '@testing-library/react'
import { jsx, useTheme, ThemeProvider } from '@emotion/react'

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
    render(
      <ThemeProvider theme={{ lightGreen: 'green', darkGreen: 'darkgreen' }}>
        <TestComponent />
      </ThemeProvider>
    ).container.firstChild
  ).toMatchSnapshot()
})

test('Nested useTheme works', async () => {
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
    render(
      <ThemeProvider theme={{ lightGreen: 'green', darkGreen: 'darkgreen' }}>
        <TestComponent2 />
      </ThemeProvider>
    ).container.firstChild
  ).toMatchSnapshot()
})
