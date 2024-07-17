// @flow
/** @jsx jsx */
import { render } from '@testing-library/react'
import { jsx, css, CacheProvider, ThemeProvider } from '@emotion/react'
import createCache from '@emotion/cache'

// $FlowFixMe
console.error = jest.fn()

beforeEach(() => {
  // $FlowFixMe
  document.head.innerHTML = ''
  jest.clearAllMocks()
})

describe('EmotionElement', () => {
  test('no React hook order violations', () => {
    const theme = { color: 'blue' }
    const cache = createCache({ key: 'context' })

    // $FlowFixMe
    const Comp = ({ flag }) => (
      <ThemeProvider theme={theme}>
        <CacheProvider value={cache}>
          <div
            css={
              flag &&
              (t => css`
                color: ${t.color};
              `)
            }
          />
        </CacheProvider>
      </ThemeProvider>
    )

    render(<Comp />)
    expect(console.error).not.toHaveBeenCalled()
    render(<Comp flag />)
    expect(console.error).not.toHaveBeenCalled()
  })
})
