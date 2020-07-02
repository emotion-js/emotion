// @flow
/** @jsx jsx */
import { safeQuerySelector } from 'test-utils'

// $FlowFixMe
console.error = jest.fn()
// $FlowFixMe
console.warn = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

let ReactDOM
let createCache
let css
let jsx
let CacheProvider

const resetAllModules = () => {
  jest.resetModules()

  createCache = require('@emotion/cache').default
  ReactDOM = require('react-dom')

  const emotionReact = require('@emotion/react')
  css = emotionReact.css
  jsx = emotionReact.jsx
  CacheProvider = emotionReact.CacheProvider
}

test("cache created in render doesn't cause a hydration mismatch", () => {
  safeQuerySelector('body').innerHTML = [
    '<div id="root">',
    '<style data-emotion="stl 1pdkrhd">.stl-1pdkrhd-App {color: hotpink;}</style>',
    '<div class="stl-1pdkrhd-App">Hello world!</div>',
    '</div>'
  ].join('')

  resetAllModules()

  const Wrapper = ({ children }) => {
    const cache = createCache({ key: 'stl' })
    return <CacheProvider value={cache}>{children}</CacheProvider>
  }

  function App() {
    return (
      <Wrapper>
        <div
          css={css`
            color: hotpink;
          `}
        >
          {'Hello world!'}
        </div>
      </Wrapper>
    )
  }

  ReactDOM.hydrate(<App />, safeQuerySelector('#root'))

  expect((console.error: any).mock.calls).toMatchInlineSnapshot(`Array []`)
  expect((console.warn: any).mock.calls).toMatchInlineSnapshot(`Array []`)
})
