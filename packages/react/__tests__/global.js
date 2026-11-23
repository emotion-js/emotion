import * as React from 'react'
import { render } from '@testing-library/react'
import {
  Global,
  keyframes,
  css,
  CacheProvider,
  ThemeProvider
} from '@emotion/react'
import createCache from '@emotion/cache'

console.error = jest.fn()

beforeEach(() => {
  document.head.innerHTML = ''
  jest.resetAllMocks()
})

test('basic', () => {
  const { unmount } = render(
    <CacheProvider value={createCache({ key: 'css' })}>
      <Global
        styles={[
          css`
            @import url('something.com/file.css');
          `,
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
          }
        ]}
      />
    </CacheProvider>
  )
  expect(document.head).toMatchSnapshot()
  expect(document.body).toMatchSnapshot()
  unmount()
  expect(document.head).toMatchSnapshot()
  expect(document.body).toMatchSnapshot()
})

test('updating more than 1 global rule', () => {
  const cache = createCache({ key: 'global-multiple-rules' })

  const Comp = ({ background, color }) => (
    <CacheProvider value={cache}>
      <Global styles={{ body: { background }, div: { color } }} />
    </CacheProvider>
  )

  const { rerender } = render(<Comp background="white" color="black" />)
  expect(document.head).toMatchSnapshot()
  rerender(<Comp background="gray" color="white" />)
  expect(document.head).toMatchSnapshot()
})

test('no React hook order violations', () => {
  const theme = { color: 'blue' }
  const cache = createCache({ key: 'context' })

  const Comp = ({ flag }) => (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cache}>
        <Global
          styles={
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

// https://github.com/emotion-js/emotion/issues/3414
test('does not throw when a Global is restored after its styles were empty and a neighbouring Global unmounted', () => {
  const cache = createCache({ key: 'global-restore' })
  function App({ firstStyles, includeSecond }) {
    return (
      <CacheProvider value={cache}>
        <Global styles={firstStyles} />
        {includeSecond && <Global styles={{ body: { background: 'green' } }} />}
      </CacheProvider>
    )
  }
  const { rerender, unmount } = render(<App firstStyles="" includeSecond />)
  rerender(<App firstStyles={{ body: { background: 'red' } }} includeSecond />)
  rerender(<App firstStyles="" includeSecond />)
  rerender(<App firstStyles="" includeSecond={false} />)
  expect(() => {
    rerender(
      <App
        firstStyles={{ body: { background: 'blue' } }}
        includeSecond={false}
      />
    )
  }).not.toThrow()
  expect(document.head.textContent).toContain('blue')
  unmount()
})
