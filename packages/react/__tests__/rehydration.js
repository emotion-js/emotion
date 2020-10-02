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

test('initializing another Emotion instance should not move already moved styles elements', () => {
  safeQuerySelector('head').innerHTML = '<div id="style-container"></div>'
  safeQuerySelector('body').innerHTML = [
    '<div id="root">',
    '<style data-emotion="stl 1pdkrhd">.stl-1pdkrhd-App {color: hotpink;}</style>',
    '<div class="stl-1pdkrhd-App">Hello world!</div>',
    '</div>'
  ].join('')

  resetAllModules()

  const cache = createCache({
    key: 'stl',
    container: safeQuerySelector('#style-container')
  })

  function App() {
    return (
      <CacheProvider value={cache}>
        <div
          css={css`
            color: hotpink;
          `}
        >
          {'Hello world!'}
        </div>
      </CacheProvider>
    )
  }

  ReactDOM.hydrate(<App />, safeQuerySelector('#root'))

  resetAllModules()

  expect(safeQuerySelector('head')).toMatchInlineSnapshot(`
    <head>
      <div
        id="style-container"
      >
        <style
          data-emotion="stl 1pdkrhd"
          data-s=""
        >
          .stl-1pdkrhd-App {color: hotpink;}
        </style>
        <style
          data-emotion="stl"
          data-s=""
        >
          
          .stl-1pdkrhd-App{color:hotpink;}
        </style>
      </div>
    </head>
  `)
})

test('initializing another Emotion instance should not move already moved styles elements', () => {
  safeQuerySelector('head').innerHTML = '<div id="style-container"></div>'
  safeQuerySelector('body').innerHTML = '<div id="root"></div>'

  resetAllModules()

  const cache = createCache({
    key: 'stl',
    container: safeQuerySelector('#style-container')
  })

  function App() {
    return (
      <CacheProvider value={cache}>
        <div
          css={css`
            color: hotpink;
          `}
        >
          {'Hello world!'}
        </div>
      </CacheProvider>
    )
  }

  ReactDOM.render(<App />, safeQuerySelector('#root'))

  resetAllModules()

  expect(safeQuerySelector('head')).toMatchInlineSnapshot(`
    <head>
      <div
        id="style-container"
      >
        <style
          data-emotion="stl"
          data-s=""
        >
          
          .stl-1pdkrhd-App{color:hotpink;}
        </style>
      </div>
    </head>
  `)
})
