// @flow
import 'test-utils/dev-mode'
import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Global, keyframes, css, CacheProvider } from '@emotion/core'
import createCache from '@emotion/cache'

beforeEach(() => {
  // $FlowFixMe
  document.head.innerHTML = ''
  // $FlowFixMe
  document.body.innerHTML = `<div id="root"></div>`
})

test('basic', () => {
  render(
    <CacheProvider value={createCache()}>
      <Global
        styles={[
          {
            html: {
              backgroundColor: 'hotpink'
            },
            h1: {
              animation: `${keyframes({
                'from,to': {
                  color: 'green'
                },
                '50%': {
                  color: 'hotpink'
                }
              })} 1s`
            },
            '@font-face': {
              fontFamily: 'some-name'
            }
          },
          css`
            @import url('something.com/file.css');
          `
        ]}
      />
    </CacheProvider>,
    // $FlowFixMe
    document.getElementById('root')
  )
  expect(document.head).toMatchSnapshot()
  expect(document.body).toMatchSnapshot()
  unmountComponentAtNode(document.getElementById('root'))
  expect(document.head).toMatchSnapshot()
  expect(document.body).toMatchSnapshot()
})

test('updating more than 1 global rule', () => {
  const cache = createCache()
  const renderComponent = ({ background, color }) =>
    render(
      <CacheProvider value={cache}>
        <Global styles={{ body: { background }, div: { color } }} />
      </CacheProvider>,
      // $FlowFixMe
      document.getElementById('root')
    )

  renderComponent({ background: 'white', color: 'black' })
  expect(document.head).toMatchSnapshot()
  renderComponent({ background: 'gray', color: 'white' })
  expect(document.head).toMatchSnapshot()
})
