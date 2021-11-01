// @flow
/** @jsx jsx */
import 'test-utils/dev-mode'
import { render } from 'react-dom'
import { jsx, css, CacheProvider, ThemeProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { getLabelFromStackTrace } from '../src/emotion-element'

// $FlowFixMe
console.error = jest.fn()

beforeEach(() => {
  // $FlowFixMe
  document.head.innerHTML = ''
  // $FlowFixMe
  document.body.innerHTML = `<div id="root"></div>`

  jest.clearAllMocks()
})

describe('getLabelFromStackTrace', () => {
  // Ensure that it works for components that have numbers in their name
  const expectedLabel = 'MyComponent9'

  // All tests after this block are for runtime=automatic, i.e. the new JSX
  // transform introduced in React 17
  describe('typical function component - runtime=classic', () => {
    test('Chrome', () => {
      // Each "at" line starts with some whitespace
      const stackTrace = `Error
    at createEmotionProps (emotion-element-1fb5ab00.browser.esm.js:143)
    at jsx (emotion-react.browser.esm.js:100)
    at MyComponent9 (App.js:22)
    at renderWithHooks (react-dom.development.js:14803)
    at mountIndeterminateComponent (react-dom.development.js:17482)
    at beginWork (react-dom.development.js:18596)`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Firefox', () => {
      const stackTrace = `createEmotionProps@http://localhost:3000/static/js/bundle.js:46440:40
jsx@http://localhost:3000/static/js/bundle.js:46636:113
MyComponent9@http://localhost:3000/static/js/bundle.js:47600:72
renderWithHooks@http://localhost:3000/static/js/bundle.js:18904:27
mountIndeterminateComponent@http://localhost:3000/static/js/bundle.js:21583:13
beginWork@http://localhost:3000/static/js/bundle.js:22697:16`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Safari', () => {
      const stackTrace = `createEmotionProps@http://localhost:3000/static/js/bundle.js:46440:49
jsx@http://localhost:3000/static/js/bundle.js:46635:113
renderWithHooks@http://localhost:3000/static/js/bundle.js:18904:27
mountIndeterminateComponent@http://localhost:3000/static/js/bundle.js:21583:28
beginWork$1@http://localhost:3000/static/js/bundle.js:27280:23`

      // Strangely, the component name does not appear in the stacktrace
      expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
    })
  })

  describe('typical function component', () => {
    test('Chrome', () => {
      // Each "at" line starts with some whitespace
      const stackTrace = `Error
    at createEmotionProps (emotion-element-895e3bbe.browser.esm.js:142)
    at jsxDEV (emotion-react-jsx-dev-runtime.browser.esm.js:18)
    at MyComponent9 (App.js:5)
    at renderWithHooks (react-dom.development.js:14803)
    at mountIndeterminateComponent (react-dom.development.js:17482)
    at beginWork (react-dom.development.js:18596)
    at beginWork$1 (react-dom.development.js:23179)`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Firefox', () => {
      const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:844:40
    jsxDEV@http://localhost:3000/static/js/main.chunk.js:1126:247
    MyComponent9@http://localhost:3000/static/js/main.chunk.js:2274:92
    renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:16616:31
    mountIndeterminateComponent@http://localhost:3000/static/js/vendors~main.chunk.js:19228:17
    beginWork@http://localhost:3000/static/js/vendors~main.chunk.js:20306:20`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Safari', () => {
      const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:844:49
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1126:247
MyComponent9@http://localhost:3000/static/js/main.chunk.js:2274:92
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:16616:31
mountIndeterminateComponent@http://localhost:3000/static/js/vendors~main.chunk.js:19228:32
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:24848:27`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Next.js SSR', () => {
      const stackTrace = `Error
    at Object.createEmotionProps (webpack-internal:///../../packages/react/dist/emotion-element-7a9c77b4.cjs.dev.js:175:40)
    at jsxDEV (webpack-internal:///../../packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js:22:75)
    at MyComponent9 (webpack-internal:///./pages/index.js:60:85)
    at processChild (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3043:14)
    at resolve (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:2960:5)
    at ReactDOMServerRenderer.render (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3435:22)
    at ReactDOMServerRenderer.read (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3373:29)
    at Object.renderToString (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3988:27)
    at Object.renderPage (C:/Projects/OSS/emotion/node_modules/next/dist/server/render.js:621:45)
    at Object.defaultGetInitialProps (C:/Projects/OSS/emotion/node_modules/next/dist/server/render.js:301:51)`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })
  })

  /**
   * E.g.
   *
   * ```jsx
   * function MyComponent9() {
   *   function renderSpan() {
   *     return <span css={{ color: 'orchid' }}>Orchid</span>
   *   }
   *
   *   return <div>{renderSpan()}</div>
   * }
   * ```
   */
  describe('render function within function component', () => {
    test('Chrome', () => {
      const stackTrace = `Error
    at createEmotionProps (emotion-element-895e3bbe.browser.esm.js:142)
    at jsxDEV (emotion-react-jsx-dev-runtime.browser.esm.js:18)
    at renderSpan (App.js:5)
    at MyComponent9 (App.js:8)
    at renderWithHooks (react-dom.development.js:14803)
    at mountIndeterminateComponent (react-dom.development.js:17482)
    at beginWork (react-dom.development.js:18596)`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Firefox', () => {
      const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:844:40
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1126:247
renderSpan@http://localhost:3000/static/js/main.chunk.js:2273:89
MyComponent9@http://localhost:3000/static/js/main.chunk.js:2287:15
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:16616:31
mountIndeterminateComponent@http://localhost:3000/static/js/vendors~main.chunk.js:19228:17
beginWork@http://localhost:3000/static/js/vendors~main.chunk.js:20306:20
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:24848:18`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Safari', () => {
      // It's weird that renderSpan is not in the stacktrace
      const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:844:49
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1126:247
MySpan@http://localhost:3000/main.4d087bc1a783e9f2b657.hot-update.js:36:25
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:16616:31
updateFunctionComponent@http://localhost:3000/static/js/vendors~main.chunk.js:18795:39
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:24848:27`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Next.js SSR', () => {
      const stackTrace = `Error
    at Object.createEmotionProps (webpack-internal:///../../packages/react/dist/emotion-element-7a9c77b4.cjs.dev.js:175:40)
    at jsxDEV (webpack-internal:///../../packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js:22:75)
    at renderSpan (webpack-internal:///./pages/index.js:28:82)
    at MyComponent9 (webpack-internal:///./pages/index.js:71:15)
    at processChild (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3043:14)
    at resolve (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:2960:5)
    at ReactDOMServerRenderer.render (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3435:22)
    at ReactDOMServerRenderer.read (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3373:29)
    at Object.renderToString (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3988:27)
    at Object.renderPage (C:/Projects/OSS/emotion/node_modules/next/dist/server/render.js:621:45)`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })
  })

  describe('element returned by Array.map', () => {
    test('Chrome', () => {
      const stackTrace = `Error
    at createEmotionProps (emotion-element-895e3bbe.browser.esm.js:142)
    at jsxDEV (emotion-react-jsx-dev-runtime.browser.esm.js:18)
    at App.js:5
    at Array.map (<anonymous>)
    at MyComponent9 (App.js:5)
    at renderWithHooks (react-dom.development.js:14803)
    at mountIndeterminateComponent (react-dom.development.js:17482)
    at beginWork (react-dom.development.js:18596)
    at beginWork$1 (react-dom.development.js:23179)`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Firefox', () => {
      const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:844:40
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1126:247
MyComponent9/<.children<@http://localhost:3000/static/js/main.chunk.js:2274:106
MyComponent9@http://localhost:3000/static/js/main.chunk.js:2274:19
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:16616:31
mountIndeterminateComponent@http://localhost:3000/static/js/vendors~main.chunk.js:19228:17
beginWork@http://localhost:3000/static/js/vendors~main.chunk.js:20306:20
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:24848:18`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Safari', () => {
      const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:844:49
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1126:247
map@[native code]
MyComponent9@http://localhost:3000/static/js/main.chunk.js:2274:22
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:16616:31
mountIndeterminateComponent@http://localhost:3000/static/js/vendors~main.chunk.js:19228:32
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:24848:27`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Next.js SSR', () => {
      const stackTrace = `Error
    at Object.createEmotionProps (webpack-internal:///../../packages/react/dist/emotion-element-7a9c77b4.cjs.dev.js:175:40)
    at jsxDEV (webpack-internal:///../../packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js:22:75)
    at eval (webpack-internal:///./pages/index.js:78:99)
    at Array.map (<anonymous>)
    at MyComponent9 (webpack-internal:///./pages/index.js:78:19)
    at processChild (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3043:14)
    at resolve (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:2960:5)
    at ReactDOMServerRenderer.render (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3435:22)
    at ReactDOMServerRenderer.read (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3373:29)
    at Object.renderToString (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3988:27)
      `

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })
  })
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

    render(<Comp />, document.getElementById('root'))
    expect(console.error).not.toHaveBeenCalled()
    render(<Comp flag />, document.getElementById('root'))
    expect(console.error).not.toHaveBeenCalled()
  })
})
