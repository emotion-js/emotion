// @flow
/** @jsx jsx */
import 'test-utils/dev-mode'
import { render } from 'react-dom'
import { Global, jsx, css, CacheProvider, ThemeProvider } from '@emotion/react'
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

describe('EmotionElement serializeStyles', () => {
  test('basic', () => {
    const theme = {}

    // intentionally not using `css` here as it invokes `serializeStyles`
    render(
      <ThemeProvider theme={theme}>
        <CacheProvider value={createCache({ key: 'context' })}>
          <div css={{ display: 'block' }} />
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
          <div
            css={css`
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
          <div
            css={[
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
          <div
            css={[
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
