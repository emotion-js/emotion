// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import * as React from 'react'
import { ignoreConsoleErrors } from 'test-utils'
import { ThemeProvider } from 'emotion-theming'
import { jsx } from '@emotion/core'
import renderer from 'react-test-renderer'

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

class ExpectErrorComponent extends React.Component<{ children: React.Node }> {
  componentDidCatch(err) {
    expect(err.message).toMatchSnapshot()
  }
  render() {
    return this.props.children || null
  }
}

test('nested provider with function that does not return a plain object throws the correct error', () => {
  ignoreConsoleErrors(() => {
    renderer.create(
      <ExpectErrorComponent>
        <ThemeProvider theme={{ color: 'hotpink', padding: 4 }}>
          <ThemeProvider theme={theme => undefined}>
            <div
              css={({ color, padding, backgroundColor }) => ({
                color,
                padding,
                backgroundColor
              })}
            />
          </ThemeProvider>
        </ThemeProvider>
      </ExpectErrorComponent>
    )
  })
})

test('nested provider with theme value that is not a plain object throws', () => {
  ignoreConsoleErrors(() => {
    renderer.create(
      <ExpectErrorComponent>
        <ThemeProvider theme={{ color: 'hotpink', padding: 4 }}>
          {/* $FlowFixMe */}
          <ThemeProvider theme>
            <div
              css={({ color, padding, backgroundColor }) => ({
                color,
                padding,
                backgroundColor
              })}
            />
          </ThemeProvider>
        </ThemeProvider>
      </ExpectErrorComponent>
    )
  })
})
