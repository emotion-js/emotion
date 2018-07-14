// @flow
/** @jsx jsx */
import * as React from 'react'
import { ignoreConsoleErrors } from 'test-utils'
import Provider from '@emotion/provider'
import { jsx } from '@emotion/core'
import renderer from 'react-test-renderer'

test('nested provider', () => {
  const tree = renderer
    .create(
      <Provider theme={{ color: 'hotpink', padding: 4 }}>
        <Provider theme={{ backgroundColor: 'darkgreen', color: 'white' }}>
          <div
            css={({ color, padding, backgroundColor }) => ({
              color,
              padding,
              backgroundColor
            })}
          />
        </Provider>
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('nested provider with function', () => {
  const tree = renderer
    .create(
      <Provider theme={{ color: 'hotpink', padding: 4 }}>
        <Provider
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
        </Provider>
      </Provider>
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
        <Provider theme={{ color: 'hotpink', padding: 4 }}>
          <Provider theme={theme => undefined}>
            <div
              css={({ color, padding, backgroundColor }) => ({
                color,
                padding,
                backgroundColor
              })}
            />
          </Provider>
        </Provider>
      </ExpectErrorComponent>
    )
  })
})

test('nested provider with theme value that is not a plain object throws', () => {
  ignoreConsoleErrors(() => {
    renderer.create(
      <ExpectErrorComponent>
        <Provider theme={{ color: 'hotpink', padding: 4 }}>
          {/* $FlowFixMe */}
          <Provider theme>
            <div
              css={({ color, padding, backgroundColor }) => ({
                color,
                padding,
                backgroundColor
              })}
            />
          </Provider>
        </Provider>
      </ExpectErrorComponent>
    )
  })
})
