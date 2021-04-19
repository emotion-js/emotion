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

let React
let ReactDOM
let ReactDOMServer
let createCache
let css
let jsx
let CacheProvider
let Global
let createEmotionServer

const resetAllModules = () => {
  jest.resetModules()

  createCache = require('@emotion/cache').default
  React = require('react')
  ReactDOM = require('react-dom')
  ReactDOMServer = require('react-dom/server')

  const emotionReact = require('@emotion/react')
  css = emotionReact.css
  jsx = emotionReact.jsx
  CacheProvider = emotionReact.CacheProvider
  Global = emotionReact.Global
  createEmotionServer = require('@emotion/server/create-instance').default
}

const removeGlobalProp = prop => {
  let descriptor = Object.getOwnPropertyDescriptor(global, prop)
  Object.defineProperty(global, prop, {
    value: undefined,
    writable: true,
    configurable: true
  })
  // $FlowFixMe
  return () => Object.defineProperty(global, prop, descriptor)
}

const disableBrowserEnvTemporarily = fn => {
  let restoreDocument = removeGlobalProp('document')
  let restoreWindow = removeGlobalProp('window')
  let restoreHTMLElement = removeGlobalProp('HTMLElement')
  try {
    return fn()
  } finally {
    restoreDocument()
    restoreWindow()
    restoreHTMLElement()
  }
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

test('dynamic global styles in SSR should work as expected', () => {
  const { app, styles } = disableBrowserEnvTemporarily(() => {
    resetAllModules()

    let cache = createCache({ key: 'mui' })
    let { extractCritical2, constructStyleTags } = createEmotionServer(cache)

    const rendered = ReactDOMServer.renderToString(
      <CacheProvider value={cache}>
        <Global styles={{ body: { color: 'white' } }} />
        <Global styles={{ html: { background: 'red' } }} />
        <main css={{ color: 'green' }}>
          <div css={{ color: 'hotpink' }} />
        </main>
      </CacheProvider>
    )
    const extracted = extractCritical2(rendered)
    return {
      app: extracted.html,
      styles: constructStyleTags(extracted)
    }
  })

  safeQuerySelector('head').innerHTML = styles
  safeQuerySelector('body').innerHTML = `<div id="root">${app}</div>`
  expect(safeQuerySelector('html')).toMatchInlineSnapshot(`
    <html>
      <head>
        <style
          data-emotion="mui-global l6h"
        >
          body{color:white;}
        </style>
        <style
          data-emotion="mui-global 10q49a4"
        >
          html{background:red;}
        </style>
        <style
          data-emotion="mui bjcoli 1lrxbo5"
        >
          .mui-bjcoli{color:green;}.mui-1lrxbo5{color:hotpink;}
        </style>
      </head>
      <body>
        <div
          id="root"
        >
          <main
            class="mui-bjcoli"
          >
            <div
              class="mui-1lrxbo5"
            />
          </main>
        </div>
      </body>
    </html>
  `)

  resetAllModules()
  const cache = createCache({ key: 'mui' })

  ReactDOM.render(
    <CacheProvider value={cache}>
      <Global styles={{ body: { color: 'white' } }} />
      <Global styles={{ html: { background: 'red' } }} />
      <main css={{ color: 'green' }}>
        <div css={{ color: 'hotpink' }} />
      </main>
    </CacheProvider>,
    safeQuerySelector('#root')
  )

  expect(safeQuerySelector('head')).toMatchInlineSnapshot(`
    <head>
      <style
        data-emotion="mui-global"
        data-s=""
      >
        
        body{color:white;}
      </style>
      <style
        data-emotion="mui-global"
        data-s=""
      >
        
        html{background:red;}
      </style>
      <style
        data-emotion="mui bjcoli 1lrxbo5"
        data-s=""
      >
        .mui-bjcoli{color:green;}.mui-1lrxbo5{color:hotpink;}
      </style>
    </head>
  `)

  ReactDOM.render(
    <CacheProvider value={cache}>
      <Global styles={{ html: { background: 'red' } }} />
      <main css={{ color: 'green' }}>
        <div css={{ color: 'hotpink' }} />
      </main>
    </CacheProvider>,
    safeQuerySelector('#root')
  )

  expect(safeQuerySelector('head')).toMatchInlineSnapshot(`
    <head>
      <style
        data-emotion="mui-global"
        data-s=""
      >
        
        html{background:red;}
      </style>
      <style
        data-emotion="mui bjcoli 1lrxbo5"
        data-s=""
      >
        .mui-bjcoli{color:green;}.mui-1lrxbo5{color:hotpink;}
      </style>
    </head>
  `)
})
