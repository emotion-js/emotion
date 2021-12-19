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

let React = require('react')
let ReactDOM
let ReactDOMServer
let render

let createCache
let css
let jsx
let styled
let CacheProvider
let Global
let ClassNames
let createEmotionServer

const resetAllModules = () => {
  jest.resetModules()

  createCache = require('@emotion/cache').default
  React = require('react')
  ReactDOM = require('react-dom')
  ReactDOMServer = require('react-dom/server')
  // we can't use regular entrypoint here as it registers afterEach
  // this means that we don't get auto-cleanup from RTL
  // but it shouldn't be needed in this file
  // we are resetting JSDOM's state on our own, and we don't depend on React's unmounting anyhow here
  render = require('@testing-library/react/pure').render

  const emotionReact = require('@emotion/react')
  css = emotionReact.css
  jsx = emotionReact.jsx
  CacheProvider = emotionReact.CacheProvider
  Global = emotionReact.Global
  ClassNames = emotionReact.ClassNames
  createEmotionServer = require('@emotion/server/create-instance').default
  styled = require('@emotion/styled').default
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

const disableBrowserEnvTemporarily = <T>(fn: () => T): T => {
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

beforeEach(() => {
  safeQuerySelector('head').innerHTML = ''
  safeQuerySelector('body').innerHTML = ''
})

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

  render(<App />, {
    hydrate: true,
    container: safeQuerySelector('#root')
  })

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

  render(<App />, {
    hydrate: true,
    container: safeQuerySelector('#root')
  })

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

  render(<App />, {
    container: safeQuerySelector('#root')
  })

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

test('global styles can be removed individually after rehydrating HTML SSRed with extractCriticalToChunks', () => {
  const { app, styles } = disableBrowserEnvTemporarily(() => {
    resetAllModules()

    let cache = createCache({ key: 'mui' })
    let { extractCriticalToChunks, constructStyleTagsFromChunks } =
      createEmotionServer(cache)

    const rendered = ReactDOMServer.renderToString(
      <CacheProvider value={cache}>
        <Global styles={{ body: { color: 'white' } }} />
        <Global styles={{ html: { background: 'red' } }} />
        <main css={{ color: 'green' }}>
          <div css={{ color: 'hotpink' }} />
        </main>
      </CacheProvider>
    )
    const extracted = extractCriticalToChunks(rendered)
    return {
      app: extracted.html,
      styles: constructStyleTagsFromChunks(extracted)
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
  const cache = createCache({ key: 'mui', speedy: true })

  render(
    <CacheProvider value={cache}>
      <Global styles={{ body: { color: 'white' } }} />
      <Global styles={{ html: { background: 'red' } }} />
      <main css={{ color: 'green' }}>
        <div css={{ color: 'hotpink' }} />
      </main>
    </CacheProvider>,
    {
      container: safeQuerySelector('#root')
    }
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

  render(
    <CacheProvider value={cache}>
      <Global styles={{ body: { color: 'white' } }} />
      <main css={{ color: 'green' }}>
        <div css={{ color: 'hotpink' }} />
      </main>
    </CacheProvider>,
    {
      container: safeQuerySelector('#root')
    }
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
        data-emotion="mui bjcoli 1lrxbo5"
        data-s=""
      >
        .mui-bjcoli{color:green;}.mui-1lrxbo5{color:hotpink;}
      </style>
    </head>
  `)
})

test('duplicated global styles can be removed safely after rehydrating HTML SSRed with extractCriticalToChunks', () => {
  const { app, styles } = disableBrowserEnvTemporarily(() => {
    resetAllModules()

    let cache = createCache({ key: 'muii' })
    let { extractCriticalToChunks, constructStyleTagsFromChunks } =
      createEmotionServer(cache)

    const rendered = ReactDOMServer.renderToString(
      <CacheProvider value={cache}>
        <Global styles={{ body: { color: 'white' } }} />
        <Global styles={{ body: { color: 'white' } }} />
        <div css={{ color: 'hotpink' }} />
      </CacheProvider>
    )
    const extracted = extractCriticalToChunks(rendered)
    return {
      app: extracted.html,
      styles: constructStyleTagsFromChunks(extracted)
    }
  })

  safeQuerySelector('head').innerHTML = styles
  safeQuerySelector('body').innerHTML = `<div id="root">${app}</div>`
  expect(safeQuerySelector('html')).toMatchInlineSnapshot(`
    <html>
      <head>
        <style
          data-emotion="muii-global l6h"
        >
          body{color:white;}
        </style>
        <style
          data-emotion="muii 1lrxbo5"
        >
          .muii-1lrxbo5{color:hotpink;}
        </style>
      </head>
      <body>
        <div
          id="root"
        >
          <div
            class="muii-1lrxbo5"
          />
        </div>
      </body>
    </html>
  `)

  resetAllModules()
  const cache = createCache({ key: 'muii', speedy: true })

  render(
    <CacheProvider value={cache}>
      <Global styles={{ body: { color: 'white' } }} />
      <Global styles={{ body: { color: 'white' } }} />
      <div css={{ color: 'hotpink' }} />
    </CacheProvider>,
    {
      container: safeQuerySelector('#root')
    }
  )

  // it's expected that this contains 2 copies of the same global style
  // where the second one is added during client hydration
  // this makes them flushable individually
  expect(safeQuerySelector('head')).toMatchInlineSnapshot(`
    <head>
      <style
        data-emotion="muii-global"
        data-s=""
      >
        body{color:white;}
      </style>
      <style
        data-emotion="muii-global"
        data-s=""
      >
        
      </style>
      <style
        data-emotion="muii 1lrxbo5"
        data-s=""
      >
        .muii-1lrxbo5{color:hotpink;}
      </style>
    </head>
  `)

  render(
    <CacheProvider value={cache}>
      <Global styles={{ body: { color: 'white' } }} />
      <div css={{ color: 'hotpink' }} />
    </CacheProvider>,
    {
      container: safeQuerySelector('#root')
    }
  )

  // this should still have a global style
  expect(safeQuerySelector('head')).toMatchInlineSnapshot(`
    <head>
      <style
        data-emotion="muii-global"
        data-s=""
      >
        body{color:white;}
      </style>
      <style
        data-emotion="muii 1lrxbo5"
        data-s=""
      >
        .muii-1lrxbo5{color:hotpink;}
      </style>
    </head>
  `)

  render(
    <CacheProvider value={cache}>
      <div css={{ color: 'hotpink' }} />
    </CacheProvider>,
    {
      container: safeQuerySelector('#root')
    }
  )

  // this should render without a crash
  expect(safeQuerySelector('head')).toMatchInlineSnapshot(`
    <head>
      <style
        data-emotion="muii 1lrxbo5"
        data-s=""
      >
        .muii-1lrxbo5{color:hotpink;}
      </style>
    </head>
  `)
})

test('duplicated global styles can be removed safely after rehydrating HTML SSRed with zero config approach', () => {
  const { app } = disableBrowserEnvTemporarily(() => {
    resetAllModules()

    let cache = createCache({ key: 'globcop' })

    const rendered = ReactDOMServer.renderToString(
      <CacheProvider value={cache}>
        <Global styles={{ body: { color: 'white' } }} />
        <Global styles={{ body: { color: 'white' } }} />
        <div css={{ color: 'hotpink' }} />
      </CacheProvider>
    )
    return {
      app: rendered
    }
  })

  safeQuerySelector('body').innerHTML = `<div id="root">${app}</div>`

  expect(safeQuerySelector('html')).toMatchInlineSnapshot(`
    <html>
      <head />
      <body>
        <div
          id="root"
        >
          <style
            data-emotion="globcop-global l6h"
          >
            body{color:white;}
          </style>
          <style
            data-emotion="globcop-global l6h"
          >
            body{color:white;}
          </style>
          <style
            data-emotion="globcop 1lrxbo5"
          >
            .globcop-1lrxbo5{color:hotpink;}
          </style>
          <div
            class="globcop-1lrxbo5"
          />
        </div>
      </body>
    </html>
  `)

  resetAllModules()
  const cache = createCache({ key: 'globcop', speedy: true })

  render(
    <CacheProvider value={cache}>
      <Global styles={{ body: { color: 'white' } }} />
      <Global styles={{ body: { color: 'white' } }} />
      <div css={{ color: 'hotpink' }} />
    </CacheProvider>,
    {
      container: safeQuerySelector('#root')
    }
  )

  // it's expected that this contains 2 copies of the same global style
  // as both were rendered "inline" during SSR
  expect(safeQuerySelector('head')).toMatchInlineSnapshot(`
    <head>
      <style
        data-emotion="globcop-global"
        data-s=""
      >
        body{color:white;}
      </style>
      <style
        data-emotion="globcop-global"
        data-s=""
      >
        body{color:white;}
      </style>
      <style
        data-emotion="globcop 1lrxbo5"
        data-s=""
      >
        .globcop-1lrxbo5{color:hotpink;}
      </style>
    </head>
  `)

  render(
    <CacheProvider value={cache}>
      <Global styles={{ body: { color: 'white' } }} />
      <div css={{ color: 'hotpink' }} />
    </CacheProvider>,
    {
      container: safeQuerySelector('#root')
    }
  )

  // this should still have a global style
  expect(safeQuerySelector('head')).toMatchInlineSnapshot(`
    <head>
      <style
        data-emotion="globcop-global"
        data-s=""
      >
        body{color:white;}
      </style>
      <style
        data-emotion="globcop 1lrxbo5"
        data-s=""
      >
        .globcop-1lrxbo5{color:hotpink;}
      </style>
    </head>
  `)

  render(
    <CacheProvider value={cache}>
      <div css={{ color: 'hotpink' }} />
    </CacheProvider>,
    {
      container: safeQuerySelector('#root')
    }
  )

  // this should render without a crash
  expect(safeQuerySelector('head')).toMatchInlineSnapshot(`
    <head>
      <style
        data-emotion="globcop 1lrxbo5"
        data-s=""
      >
        .globcop-1lrxbo5{color:hotpink;}
      </style>
    </head>
  `)
})
;((React: any).useId ? describe : describe.skip)('useId', () => {
  test('no hydration mismatch for styled when using useId', () => {
    const finalHTML = disableBrowserEnvTemporarily(() => {
      resetAllModules()

      const StyledDivWithId = styled(function DivWithId({ className }) {
        const id = (React: any).useId()
        return <div className={className} id={id} />
      })({
        border: '1px solid black'
      })

      return ReactDOMServer.renderToString(<StyledDivWithId />)
    })

    safeQuerySelector('body').innerHTML = `<div id="root">${finalHTML}</div>`

    resetAllModules()

    const StyledDivWithId = styled(function DivWithId({ className }) {
      const id = (React: any).useId()
      return <div className={className} id={id} />
    })({
      border: '1px solid black'
    })

    render(<StyledDivWithId />, {
      hydrate: true,
      container: safeQuerySelector('#root')
    })

    expect((console.error: any).mock.calls).toMatchInlineSnapshot(`Array []`)
    expect((console.warn: any).mock.calls).toMatchInlineSnapshot(`Array []`)
  })

  test('no hydration mismatch for css prop when using useId', () => {
    const finalHTML = disableBrowserEnvTemporarily(() => {
      resetAllModules()

      function DivWithId({ className }: { className?: string }) {
        const id = (React: any).useId()
        return <div id={id} className={className} />
      }

      return ReactDOMServer.renderToString(
        <DivWithId
          css={{
            border: '1px solid black'
          }}
        />
      )
    })

    safeQuerySelector('body').innerHTML = `<div id="root">${finalHTML}</div>`

    resetAllModules()

    function DivWithId({ className }: { className?: string }) {
      const id = (React: any).useId()
      return <div id={id} className={className} />
    }

    render(
      <DivWithId
        css={{
          border: '1px solid black'
        }}
      />,
      {
        hydrate: true,
        container: safeQuerySelector('#root')
      }
    )

    expect((console.error: any).mock.calls).toMatchInlineSnapshot(`Array []`)
    expect((console.warn: any).mock.calls).toMatchInlineSnapshot(`Array []`)
  })

  test('no hydration mismatch for ClassNames when using useId', () => {
    const finalHTML = disableBrowserEnvTemporarily(() => {
      resetAllModules()

      const DivWithId = ({ className }) => {
        const id = (React: any).useId()
        return <div id={id} className={className} />
      }

      return ReactDOMServer.renderToString(
        <ClassNames>
          {({ css }) => {
            return (
              <DivWithId
                className={css({
                  border: '1px solid black'
                })}
              />
            )
          }}
        </ClassNames>
      )
    })

    safeQuerySelector('body').innerHTML = `<div id="root">${finalHTML}</div>`

    resetAllModules()

    const DivWithId = ({ className }) => {
      const id = (React: any).useId()
      return <div id={id} className={className} />
    }

    render(
      <ClassNames>
        {({ css }) => {
          return (
            <DivWithId
              className={css({
                border: '1px solid black'
              })}
            />
          )
        }}
      </ClassNames>,
      {
        hydrate: true,
        container: safeQuerySelector('#root')
      }
    )

    expect((console.error: any).mock.calls).toMatchInlineSnapshot(`Array []`)
    expect((console.warn: any).mock.calls).toMatchInlineSnapshot(`Array []`)
  })
})
