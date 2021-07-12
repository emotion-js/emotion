// @flow
import 'test-utils/dev-mode'
import React from 'react'
import { render } from 'react-dom'
import { Global, css, CacheProvider, ThemeProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import * as serialize from '@emotion/serialize'

let serializeStyles

beforeEach(() => {
  // $FlowFixMe
  document.head.innerHTML = ''
  // $FlowFixMe
  document.body.innerHTML = `<div id="root"></div>`

  jest.clearAllMocks()
  serializeStyles = jest.spyOn(serialize, 'serializeStyles')
})

describe('Global serializeStyles', () => {
  test('basic', () => {
    const theme = {}

    // intentionally not using `css` here as it invokes `serializeStyles`
    render(
      <ThemeProvider theme={theme}>
        <CacheProvider value={createCache({ key: 'context' })}>
          <Global styles={{ display: 'block' }} />
        </CacheProvider>
      </ThemeProvider>,
      // $FlowFixMe
      document.getElementById('root')
    )

    expect(serializeStyles).toHaveBeenNthCalledWith(
      1,
      expect.any(Array),
      undefined,
      theme
    )
  })

  test('basic css', () => {
    const theme = {}

    // intentionally not using `css` here as it invokes `serializeStyles`
    render(
      <ThemeProvider theme={theme}>
        <CacheProvider value={createCache({ key: 'context' })}>
          <Global
            styles={css`
              display: block;
            `}
          />
        </CacheProvider>
      </ThemeProvider>,
      // $FlowFixMe
      document.getElementById('root')
    )

    expect(serializeStyles).toHaveBeenNthCalledWith(
      2,
      expect.any(Array),
      undefined,
      theme
    )
  })

  test('array no theme', () => {
    const theme = { color: 'blue' }

    render(
      <ThemeProvider theme={theme}>
        <CacheProvider value={createCache({ key: 'context' })}>
          <Global
            styles={[
              { display: 'block' },
              css`
                color: blue;
              `
            ]}
          />
        </CacheProvider>
      </ThemeProvider>,
      // $FlowFixMe
      document.getElementById('root')
    )

    expect(serializeStyles).toHaveBeenNthCalledWith(
      2, // 2 as `css` is the first invocation
      expect.any(Array),
      undefined,
      theme
    )
  })

  test('array theme', () => {
    const theme = { color: 'blue' }

    render(
      <ThemeProvider theme={theme}>
        <CacheProvider value={createCache({ key: 'context' })}>
          <Global
            styles={[
              { display: 'block' },
              t =>
                css`
                  color: ${t.color};
                `
            ]}
          />
        </CacheProvider>
      </ThemeProvider>,
      // $FlowFixMe
      document.getElementById('root')
    )

    expect(serializeStyles).toHaveBeenNthCalledWith(
      1, // 1 as `css` is lazily invoked so Global's invocation the first
      expect.any(Array),
      undefined,
      theme
    )
  })
})
