// @flow
import { getLabelFromStackTrace } from '../src/get-label-from-stack-trace'

/**
 * # Safari stack traces
 *
 * The component name may not appear in the Safari stack trace because Safari
 * implements Proper Tail Calls.
 *
 * Two components that seem almost identical may produce different stack traces
 * based on whether or not a Proper Tail Call optimization was possible. As a
 * result, you may not get the same stack traces if you try to reproduce these
 * test cases on your own.
 *
 * If Safari omits the component name from the stack trace, the best thing we
 * can do is:
 *
 * 1. Match the parent component's name if it is in the stack trace, or
 * 2. Return `undefined`.
 */

// Ensure that it works for components that have numbers and $ in their name
const expectedLabel = 'MyComponent-9'

/**
 * E.g.
 *
 * ```
 * function MyComponent$9() {
 *   return <div css={{ color: 'red' }} />
 * }
 * ```
 *
 * See `playgrounds/cra/.env` for instructions on testing with the old JSX
 * transform.
 *
 * All tests after this block are for runtime=automatic, i.e. the new JSX
 * transform introduced in React 17
 */
describe('typical function component - runtime=classic', () => {
  test('Chrome', () => {
    // Each "at" line starts with some whitespace
    const stackTrace = `Error
    at createEmotionProps (emotion-element-1fb5ab00.browser.esm.js:143)
    at jsx (emotion-react.browser.esm.js:100)
    at MyComponent$9 (App.js:22)
    at renderWithHooks (react-dom.development.js:14803)
    at mountIndeterminateComponent (react-dom.development.js:17482)
    at beginWork (react-dom.development.js:18596)`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('Firefox', () => {
    const stackTrace = `createEmotionProps@http://localhost:3000/static/js/bundle.js:46440:40
jsx@http://localhost:3000/static/js/bundle.js:46636:113
MyComponent$9@http://localhost:3000/static/js/bundle.js:47600:72
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

    expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
  })

  test('SSR', () => {
    const stackTrace = `Error
  at Object.createEmotionProps (webpack-internal:///../../packages/react/dist/emotion-element-7a506f09.cjs.dev.js:195:40)
  at jsx (webpack-internal:///../../packages/react/dist/emotion-react.cjs.dev.js:103:45)
  at MyComponent$9 (webpack-internal:///./pages/index.js:20:61)
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
 * ```
 * function MyComponent$9() {
 *   return <div css={{ color: 'red' }} />
 * }
 * ```
 */
describe('typical function component', () => {
  test('Chrome', () => {
    const stackTrace = `Error
    at createEmotionProps (emotion-element-895e3bbe.browser.esm.js:142)
    at jsxDEV (emotion-react-jsx-dev-runtime.browser.esm.js:18)
    at MyComponent$9 (App.js:5)
    at renderWithHooks (react-dom.development.js:14803)
    at mountIndeterminateComponent (react-dom.development.js:17482)
    at beginWork (react-dom.development.js:18596)
    at beginWork$1 (react-dom.development.js:23179)`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('Firefox', () => {
    const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:844:40
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1126:247
MyComponent$9@http://localhost:3000/static/js/main.chunk.js:2274:92
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:16616:31
mountIndeterminateComponent@http://localhost:3000/static/js/vendors~main.chunk.js:19228:17
beginWork@http://localhost:3000/static/js/vendors~main.chunk.js:20306:20`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('Safari', () => {
    const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:844:49
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1126:247
MyComponent$9@http://localhost:3000/static/js/main.chunk.js:2274:92
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:16616:31
mountIndeterminateComponent@http://localhost:3000/static/js/vendors~main.chunk.js:19228:32
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:24848:27`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('SSR', () => {
    const stackTrace = `Error
    at Object.createEmotionProps (webpack-internal:///../../packages/react/dist/emotion-element-7a9c77b4.cjs.dev.js:175:40)
    at jsxDEV (webpack-internal:///../../packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js:22:75)
    at MyComponent$9 (webpack-internal:///./pages/index.js:60:85)
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
 * ```
 * function MyComponent$9() {
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
    at MyComponent$9 (App.js:8)
    at renderWithHooks (react-dom.development.js:14803)
    at mountIndeterminateComponent (react-dom.development.js:17482)
    at beginWork (react-dom.development.js:18596)`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('Firefox', () => {
    const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:844:40
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1126:247
renderSpan@http://localhost:3000/static/js/main.chunk.js:2273:89
MyComponent$9@http://localhost:3000/static/js/main.chunk.js:2287:15
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:16616:31
mountIndeterminateComponent@http://localhost:3000/static/js/vendors~main.chunk.js:19228:17
beginWork@http://localhost:3000/static/js/vendors~main.chunk.js:20306:20
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:24848:18`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('Safari', () => {
    const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:844:49
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1126:247
MyComponent$9@http://localhost:3000/main.4d087bc1a783e9f2b657.hot-update.js:36:25
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:16616:31
updateFunctionComponent@http://localhost:3000/static/js/vendors~main.chunk.js:18795:39
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:24848:27`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('SSR', () => {
    const stackTrace = `Error
    at Object.createEmotionProps (webpack-internal:///../../packages/react/dist/emotion-element-7a9c77b4.cjs.dev.js:175:40)
    at jsxDEV (webpack-internal:///../../packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js:22:75)
    at renderSpan (webpack-internal:///./pages/index.js:28:82)
    at MyComponent$9 (webpack-internal:///./pages/index.js:71:15)
    at processChild (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3043:14)
    at resolve (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:2960:5)
    at ReactDOMServerRenderer.render (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3435:22)
    at ReactDOMServerRenderer.read (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3373:29)
    at Object.renderToString (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3988:27)
    at Object.renderPage (C:/Projects/OSS/emotion/node_modules/next/dist/server/render.js:621:45)`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })
})

/**
 * E.g.
 *
 * ```
 * function MyComponent$9() {
 *   return <div>
 *     {[0].map(i => <div css={{ color: 'red' }} key={i} />)}
 *   </div>
 * }
 * ```
 */
describe('element returned by Array.map', () => {
  test('Chrome', () => {
    const stackTrace = `Error
    at createEmotionProps (emotion-element-895e3bbe.browser.esm.js:142)
    at jsxDEV (emotion-react-jsx-dev-runtime.browser.esm.js:18)
    at App.js:5
    at Array.map (<anonymous>)
    at MyComponent$9 (App.js:5)
    at renderWithHooks (react-dom.development.js:14803)
    at mountIndeterminateComponent (react-dom.development.js:17482)
    at beginWork (react-dom.development.js:18596)
    at beginWork$1 (react-dom.development.js:23179)`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('Firefox', () => {
    const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:844:40
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1126:247
MyComponent$9/<.children<@http://localhost:3000/static/js/main.chunk.js:2274:106
MyComponent$9@http://localhost:3000/static/js/main.chunk.js:2274:19
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
MyComponent$9@http://localhost:3000/static/js/main.chunk.js:2274:22
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:16616:31
mountIndeterminateComponent@http://localhost:3000/static/js/vendors~main.chunk.js:19228:32
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:24848:27`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('SSR', () => {
    const stackTrace = `Error
    at Object.createEmotionProps (webpack-internal:///../../packages/react/dist/emotion-element-7a9c77b4.cjs.dev.js:175:40)
    at jsxDEV (webpack-internal:///../../packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js:22:75)
    at eval (webpack-internal:///./pages/index.js:78:99)
    at Array.map (<anonymous>)
    at MyComponent$9 (webpack-internal:///./pages/index.js:78:19)
    at processChild (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3043:14)
    at resolve (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:2960:5)
    at ReactDOMServerRenderer.render (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3435:22)
    at ReactDOMServerRenderer.read (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3373:29)
    at Object.renderToString (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3988:27)`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })
})

/**
 * E.g.
 *
 * ```
 * const test = {
 *   MyComponent$9() {
 *     return <div css={{ color: 'red' }}>red</div>
 *   }
 * }
 *
 * function App() {
 *   const el = test.MyComponent$9()
 *
 *   return ...
 * }
 * ```
 */
describe('function component within object', () => {
  test('Chrome', () => {
    const stackTrace = `Error
    at createEmotionProps (emotion-element-6352414e.browser.esm.js?fcc6:142)
    at jsxDEV (emotion-react-jsx-dev-runtime.browser.esm.js?cf67:18)
    at Object.MyComponent$9 (index.js?bee7:7)
    at App (index.js?bee7:14)
    at renderWithHooks (react-dom.development.js?3c4a:14803)
    at mountIndeterminateComponent (react-dom.development.js?3c4a:17482)
    at beginWork (react-dom.development.js?3c4a:18596)
    at beginWork$1 (react-dom.development.js?3c4a:23179)`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('Firefox', () => {
    const stackTrace = `createEmotionProps@webpack-internal:///../../packages/react/dist/emotion-element-6352414e.browser.esm.js:163:40
jsxDEV@webpack-internal:///../../packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js:35:230
MyComponent$9@webpack-internal:///./pages/index.js:32:82
App@webpack-internal:///./pages/index.js:49:17
renderWithHooks@webpack-internal:///../../node_modules/react-dom/cjs/react-dom.development.js:14803:27
mountIndeterminateComponent@webpack-internal:///../../node_modules/react-dom/cjs/react-dom.development.js:17482:13
beginWork@webpack-internal:///../../node_modules/react-dom/cjs/react-dom.development.js:18596:16
beginWork$1@webpack-internal:///../../node_modules/react-dom/cjs/react-dom.development.js:23179:14`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('Safari', () => {
    // MyComponent$9 does not appear in the stack trace
    const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:866:49
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1147:247
App@http://localhost:3000/static/js/main.chunk.js:2290:32
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:19152:31
mountIndeterminateComponent@http://localhost:3000/static/js/vendors~main.chunk.js:21764:32
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:27384:27`

    expect(getLabelFromStackTrace(stackTrace)).toBe('App')
  })

  test('SSR', () => {
    const stackTrace = `Error
    at Object.createEmotionProps (webpack-internal:///../../packages/react/dist/emotion-element-7a9c77b4.cjs.dev.js:175:40)
    at jsxDEV (webpack-internal:///../../packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js:22:75)
    at Object.MyComponent$9 (webpack-internal:///./pages/index.js:31:82)
    at App (webpack-internal:///./pages/index.js:47:19)
    at processChild (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3043:14)
    at resolve (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:2960:5)
    at ReactDOMServerRenderer.render (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3435:22)
    at ReactDOMServerRenderer.read (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3373:29)
    at Object.renderToString (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3988:27)
    at Object.renderPage (C:/Projects/OSS/emotion/node_modules/next/dist/server/render.js:621:45)`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })
})

test('Chrome: Module.jsx', () => {
  // From https://github.com/emotion-js/emotion/issues/1947
  const stackTrace = `Error
  at Module.jsx (http://localhost:10400/foo/bar/Combo?WZC6ZC&1ECYELF&12FP1RC&17F9LE8&P29J1Z&19IF3L2&AS09Z5&DHIG3C&EZJOER&13HZV70&1Y0F1JC&7UNIX3&SXHPTZ&K2YF13&11KMHHF&ZT36EV&Z44N8N&1QZW1DM&O16D0M&CW2QNS&1FH6TF2&ZWDLTF&1X87ICA&6LRWIZ&ME66AT&1SR9GT&1YH9ZQP&HHC8F2&1DB0VYO&FKOBET&1MJ8I38&JLAULY&1CH0G0Z&1TVRXYJ&SPNXDO&1JYOJGK&1LO9VOK&11TND7U&1YWNKYV&1DXWRM&TK6KOI&154ANPU&RWT5PA&19HGOKC&1YUJVCR&VFG0H0&172UQH&WFFZOK&1G8KK9P&Z4U2ZW&9UOM25&CBEUA3&1BURRUK&34VP40&CT8SCX&C5EGO8&XBSA9O&LL4E3N&1G5530W&R7QR2I&11ZITTG&1OIUGH1&ZN50OK&19R3ZDC&68ZZJF&413IE5&P0AYR7&1SMIEQU&1I34GN7&1GCT1EE&165FEOI&1NN6TMC&1FGT66H&1CP9Y2C&1R3WFPP&16Z97O3&1HGGWC2&AL9WFH&JXOSA2&QUXERX&NU7E4G&3HPVD3&16NVKFB&1JO5LOD&PIJWGC&1HD0KL3&A5KQ0E&UVG8ZT&156786I&1EGYRX&931PJP&71A44J&K4T5RR&YJS0J6&6NKXDV&15LGDNT&DK4XFH:6963:17)
  at MyComponent$9 (http://localhost:10400/foo/bar/Combo?WZC6ZC&1ECYELF&12FP1RC&17F9LE8&P29J1Z&19IF3L2&AS09Z5&DHIG3C&EZJOER&13HZV70&1Y0F1JC&7UNIX3&SXHPTZ&K2YF13&11KMHHF&ZT36EV&Z44N8N&1QZW1DM&O16D0M&CW2QNS&1FH6TF2&ZWDLTF&1X87ICA&6LRWIZ&ME66AT&1SR9GT&1YH9ZQP&HHC8F2&1DB0VYO&FKOBET&1MJ8I38&JLAULY&1CH0G0Z&1TVRXYJ&SPNXDO&1JYOJGK&1LO9VOK&11TND7U&1YWNKYV&1DXWRM&TK6KOI&154ANPU&RWT5PA&19HGOKC&1YUJVCR&VFG0H0&172UQH&WFFZOK&1G8KK9P&Z4U2ZW&9UOM25&CBEUA3&1BURRUK&34VP40&CT8SCX&C5EGO8&XBSA9O&LL4E3N&1G5530W&R7QR2I&11ZITTG&1OIUGH1&ZN50OK&19R3ZDC&68ZZJF&413IE5&P0AYR7&1SMIEQU&1I34GN7&1GCT1EE&165FEOI&1NN6TMC&1FGT66H&1CP9Y2C&1R3WFPP&16Z97O3&1HGGWC2&AL9WFH&JXOSA2&QUXERX&NU7E4G&3HPVD3&16NVKFB&1JO5LOD&PIJWGC&1HD0KL3&A5KQ0E&UVG8ZT&156786I&1EGYRX&931PJP&71A44J&K4T5RR&YJS0J6&6NKXDV&15LGDNT&DK4XFH:13679:15)
  at renderWithHooks (http://localhost:10400/foo/bar/Combo?1J6XZOQ&CV1G7Q&178CDN5&8GO7HW&1NEWTVK&11D8SWR&EUW1RW&B0SNY0&UKYKU8&Z2LJ32&OMFXIN&1CKRK5M&1DCE7I2&BTKQMZ&BF6IS9&IGMBPD&17GLBW0&F1NR3R&1BYJ6GK&1QMDI0S&1YBURTD&N3FA6J&1OKN2Q4&1VX6R8D&1RN5YOY&1PGEWZS&186NYSC&6OOHB&DAQXGM&18F8OG0&IEBF22&16BSJS0&270VGN&220EF0&PP2DW2&EXOH0W&1UI8QOX&BESS5A&SYNC6D&3EWNSZ&TX0EOZ&YHES22&SS37DN&155I4KT&SBSDY7&G2CFJM&1L12OEG&189382Y&4IWM93&RVOAXW&NMAEHJ&A3HW6D&react_v16.8.4&react-dom_v16.8.4&1I1OITG&1ZY465&1R86UXI&WLU3QX&1OO689&1N913EH&RZP360&15WCYOM&17TCHPC&115R68D&1VRCLJ7&12F8G3T&QXNNQC&128FRJB&1OH35FB&CHPVZ7&15VJLWF&DXTQHG&TI7NW9&8F7DFB&3ER51Q&1DTSSTA&1PQZ3V&1CA54WE&1GEM33A&OC7AMR&3AYWID&1KYS5DS&O76Y7S&1CD2C6F&1SB1JQ0&1DMMKMS&OCFDX4&1MO3710&1GVEDEZ&1FT6HVF&4JF9F9&1F8VFMW&1GAQQYW&149YUOT&12GEY49&4MFMGQ&16N8W14&12SV68C&2F7EYB&23HVSL&4TAXU8&1YL1F3&14H19K&1WHTWL7&1PYNLWK&1RUO08N&1PLVRSS&126YWXW&1TAPDE6&18TCRAP:78801:18)
  at updateFunctionComponent (http://localhost:10400/foo/bar/Combo?1J6XZOQ&CV1G7Q&178CDN5&8GO7HW&1NEWTVK&11D8SWR&EUW1RW&B0SNY0&UKYKU8&Z2LJ32&OMFXIN&1CKRK5M&1DCE7I2&BTKQMZ&BF6IS9&IGMBPD&17GLBW0&F1NR3R&1BYJ6GK&1QMDI0S&1YBURTD&N3FA6J&1OKN2Q4&1VX6R8D&1RN5YOY&1PGEWZS&186NYSC&6OOHB&DAQXGM&18F8OG0&IEBF22&16BSJS0&270VGN&220EF0&PP2DW2&EXOH0W&1UI8QOX&BESS5A&SYNC6D&3EWNSZ&TX0EOZ&YHES22&SS37DN&155I4KT&SBSDY7&G2CFJM&1L12OEG&189382Y&4IWM93&RVOAXW&NMAEHJ&A3HW6D&react_v16.8.4&react-dom_v16.8.4&1I1OITG&1ZY465&1R86UXI&WLU3QX&1OO689&1N913EH&RZP360&15WCYOM&17TCHPC&115R68D&1VRCLJ7&12F8G3T&QXNNQC&128FRJB&1OH35FB&CHPVZ7&15VJLWF&DXTQHG&TI7NW9&8F7DFB&3ER51Q&1DTSSTA&1PQZ3V&1CA54WE&1GEM33A&OC7AMR&3AYWID&1KYS5DS&O76Y7S&1CD2C6F&1SB1JQ0&1DMMKMS&OCFDX4&1MO3710&1GVEDEZ&1FT6HVF&4JF9F9&1F8VFMW&1GAQQYW&149YUOT&12GEY49&4MFMGQ&16N8W14&12SV68C&2F7EYB&23HVSL&4TAXU8&1YL1F3&14H19K&1WHTWL7&1PYNLWK&1RUO08N&1PLVRSS&126YWXW&1TAPDE6&18TCRAP:80490:19)
  at beginWork (http://localhost:10400/foo/bar/Combo?1J6XZOQ&CV1G7Q&178CDN5&8GO7HW&1NEWTVK&11D8SWR&EUW1RW&B0SNY0&UKYKU8&Z2LJ32&OMFXIN&1CKRK5M&1DCE7I2&BTKQMZ&BF6IS9&IGMBPD&17GLBW0&F1NR3R&1BYJ6GK&1QMDI0S&1YBURTD&N3FA6J&1OKN2Q4&1VX6R8D&1RN5YOY&1PGEWZS&186NYSC&6OOHB&DAQXGM&18F8OG0&IEBF22&16BSJS0&270VGN&220EF0&PP2DW2&EXOH0W&1UI8QOX&BESS5A&SYNC6D&3EWNSZ&TX0EOZ&YHES22&SS37DN&155I4KT&SBSDY7&G2CFJM&1L12OEG&189382Y&4IWM93&RVOAXW&NMAEHJ&A3HW6D&react_v16.8.4&react-dom_v16.8.4&1I1OITG&1ZY465&1R86UXI&WLU3QX&1OO689&1N913EH&RZP360&15WCYOM&17TCHPC&115R68D&1VRCLJ7&12F8G3T&QXNNQC&128FRJB&1OH35FB&CHPVZ7&15VJLWF&DXTQHG&TI7NW9&8F7DFB&3ER51Q&1DTSSTA&1PQZ3V&1CA54WE&1GEM33A&OC7AMR&3AYWID&1KYS5DS&O76Y7S&1CD2C6F&1SB1JQ0&1DMMKMS&OCFDX4&1MO3710&1GVEDEZ&1FT6HVF&4JF9F9&1F8VFMW&1GAQQYW&149YUOT&12GEY49&4MFMGQ&16N8W14&12SV68C&2F7EYB&23HVSL&4TAXU8&1YL1F3&14H19K&1WHTWL7&1PYNLWK&1RUO08N&1PLVRSS&126YWXW&1TAPDE6&18TCRAP:81500:13)
  at performUnitOfWork (http://localhost:10400/foo/bar/Combo?1J6XZOQ&CV1G7Q&178CDN5&8GO7HW&1NEWTVK&11D8SWR&EUW1RW&B0SNY0&UKYKU8&Z2LJ32&OMFXIN&1CKRK5M&1DCE7I2&BTKQMZ&BF6IS9&IGMBPD&17GLBW0&F1NR3R&1BYJ6GK&1QMDI0S&1YBURTD&N3FA6J&1OKN2Q4&1VX6R8D&1RN5YOY&1PGEWZS&186NYSC&6OOHB&DAQXGM&18F8OG0&IEBF22&16BSJS0&270VGN&220EF0&PP2DW2&EXOH0W&1UI8QOX&BESS5A&SYNC6D&3EWNSZ&TX0EOZ&YHES22&SS37DN&155I4KT&SBSDY7&G2CFJM&1L12OEG&189382Y&4IWM93&RVOAXW&NMAEHJ&A3HW6D&react_v16.8.4&react-dom_v16.8.4&1I1OITG&1ZY465&1R86UXI&WLU3QX&1OO689&1N913EH&RZP360&15WCYOM&17TCHPC&115R68D&1VRCLJ7&12F8G3T&QXNNQC&128FRJB&1OH35FB&CHPVZ7&15VJLWF&DXTQHG&TI7NW9&8F7DFB&3ER51Q&1DTSSTA&1PQZ3V&1CA54WE&1GEM33A&OC7AMR&3AYWID&1KYS5DS&O76Y7S&1CD2C6F&1SB1JQ0&1DMMKMS&OCFDX4&1MO3710&1GVEDEZ&1FT6HVF&4JF9F9&1F8VFMW&1GAQQYW&149YUOT&12GEY49&4MFMGQ&16N8W14&12SV68C&2F7EYB&23HVSL&4TAXU8&1YL1F3&14H19K&1WHTWL7&1PYNLWK&1RUO08N&1PLVRSS&126YWXW&1TAPDE6&18TCRAP:85175:11)
  at workLoop (http://localhost:10400/foo/bar/Combo?1J6XZOQ&CV1G7Q&178CDN5&8GO7HW&1NEWTVK&11D8SWR&EUW1RW&B0SNY0&UKYKU8&Z2LJ32&OMFXIN&1CKRK5M&1DCE7I2&BTKQMZ&BF6IS9&IGMBPD&17GLBW0&F1NR3R&1BYJ6GK&1QMDI0S&1YBURTD&N3FA6J&1OKN2Q4&1VX6R8D&1RN5YOY&1PGEWZS&186NYSC&6OOHB&DAQXGM&18F8OG0&IEBF22&16BSJS0&270VGN&220EF0&PP2DW2&EXOH0W&1UI8QOX&BESS5A&SYNC6D&3EWNSZ&TX0EOZ&YHES22&SS37DN&155I4KT&SBSDY7&G2CFJM&1L12OEG&189382Y&4IWM93&RVOAXW&NMAEHJ&A3HW6D&react_v16.8.4&react-dom_v16.8.4&1I1OITG&1ZY465&1R86UXI&WLU3QX&1OO689&1N913EH&RZP360&15WCYOM&17TCHPC&115R68D&1VRCLJ7&12F8G3T&QXNNQC&128FRJB&1OH35FB&CHPVZ7&15VJLWF&DXTQHG&TI7NW9&8F7DFB&3ER51Q&1DTSSTA&1PQZ3V&1CA54WE&1GEM33A&OC7AMR&3AYWID&1KYS5DS&O76Y7S&1CD2C6F&1SB1JQ0&1DMMKMS&OCFDX4&1MO3710&1GVEDEZ&1FT6HVF&4JF9F9&1F8VFMW&1GAQQYW&149YUOT&12GEY49&4MFMGQ&16N8W14&12SV68C&2F7EYB&23HVSL&4TAXU8&1YL1F3&14H19K&1WHTWL7&1PYNLWK&1RUO08N&1PLVRSS&126YWXW&1TAPDE6&18TCRAP:85215:22)
  at renderRoot (http://localhost:10400/foo/bar/Combo?1J6XZOQ&CV1G7Q&178CDN5&8GO7HW&1NEWTVK&11D8SWR&EUW1RW&B0SNY0&UKYKU8&Z2LJ32&OMFXIN&1CKRK5M&1DCE7I2&BTKQMZ&BF6IS9&IGMBPD&17GLBW0&F1NR3R&1BYJ6GK&1QMDI0S&1YBURTD&N3FA6J&1OKN2Q4&1VX6R8D&1RN5YOY&1PGEWZS&186NYSC&6OOHB&DAQXGM&18F8OG0&IEBF22&16BSJS0&270VGN&220EF0&PP2DW2&EXOH0W&1UI8QOX&BESS5A&SYNC6D&3EWNSZ&TX0EOZ&YHES22&SS37DN&155I4KT&SBSDY7&G2CFJM&1L12OEG&189382Y&4IWM93&RVOAXW&NMAEHJ&A3HW6D&react_v16.8.4&react-dom_v16.8.4&1I1OITG&1ZY465&1R86UXI&WLU3QX&1OO689&1N913EH&RZP360&15WCYOM&17TCHPC&115R68D&1VRCLJ7&12F8G3T&QXNNQC&128FRJB&1OH35FB&CHPVZ7&15VJLWF&DXTQHG&TI7NW9&8F7DFB&3ER51Q&1DTSSTA&1PQZ3V&1CA54WE&1GEM33A&OC7AMR&3AYWID&1KYS5DS&O76Y7S&1CD2C6F&1SB1JQ0&1DMMKMS&OCFDX4&1MO3710&1GVEDEZ&1FT6HVF&4JF9F9&1F8VFMW&1GAQQYW&149YUOT&12GEY49&4MFMGQ&16N8W14&12SV68C&2F7EYB&23HVSL&4TAXU8&1YL1F3&14H19K&1WHTWL7&1PYNLWK&1RUO08N&1PLVRSS&126YWXW&1TAPDE6&18TCRAP:85298:5)
  at performWorkOnRoot (http://localhost:10400/foo/bar/Combo?1J6XZOQ&CV1G7Q&178CDN5&8GO7HW&1NEWTVK&11D8SWR&EUW1RW&B0SNY0&UKYKU8&Z2LJ32&OMFXIN&1CKRK5M&1DCE7I2&BTKQMZ&BF6IS9&IGMBPD&17GLBW0&F1NR3R&1BYJ6GK&1QMDI0S&1YBURTD&N3FA6J&1OKN2Q4&1VX6R8D&1RN5YOY&1PGEWZS&186NYSC&6OOHB&DAQXGM&18F8OG0&IEBF22&16BSJS0&270VGN&220EF0&PP2DW2&EXOH0W&1UI8QOX&BESS5A&SYNC6D&3EWNSZ&TX0EOZ&YHES22&SS37DN&155I4KT&SBSDY7&G2CFJM&1L12OEG&189382Y&4IWM93&RVOAXW&NMAEHJ&A3HW6D&react_v16.8.4&react-dom_v16.8.4&1I1OITG&1ZY465&1R86UXI&WLU3QX&1OO689&1N913EH&RZP360&15WCYOM&17TCHPC&115R68D&1VRCLJ7&12F8G3T&QXNNQC&128FRJB&1OH35FB&CHPVZ7&15VJLWF&DXTQHG&TI7NW9&8F7DFB&3ER51Q&1DTSSTA&1PQZ3V&1CA54WE&1GEM33A&OC7AMR&3AYWID&1KYS5DS&O76Y7S&1CD2C6F&1SB1JQ0&1DMMKMS&OCFDX4&1MO3710&1GVEDEZ&1FT6HVF&4JF9F9&1F8VFMW&1GAQQYW&149YUOT&12GEY49&4MFMGQ&16N8W14&12SV68C&2F7EYB&23HVSL&4TAXU8&1YL1F3&14H19K&1WHTWL7&1PYNLWK&1RUO08N&1PLVRSS&126YWXW&1TAPDE6&18TCRAP:86205:5)
  at performWork (http://localhost:10400/foo/bar/Combo?1J6XZOQ&CV1G7Q&178CDN5&8GO7HW&1NEWTVK&11D8SWR&EUW1RW&B0SNY0&UKYKU8&Z2LJ32&OMFXIN&1CKRK5M&1DCE7I2&BTKQMZ&BF6IS9&IGMBPD&17GLBW0&F1NR3R&1BYJ6GK&1QMDI0S&1YBURTD&N3FA6J&1OKN2Q4&1VX6R8D&1RN5YOY&1PGEWZS&186NYSC&6OOHB&DAQXGM&18F8OG0&IEBF22&16BSJS0&270VGN&220EF0&PP2DW2&EXOH0W&1UI8QOX&BESS5A&SYNC6D&3EWNSZ&TX0EOZ&YHES22&SS37DN&155I4KT&SBSDY7&G2CFJM&1L12OEG&189382Y&4IWM93&RVOAXW&NMAEHJ&A3HW6D&react_v16.8.4&react-dom_v16.8.4&1I1OITG&1ZY465&1R86UXI&WLU3QX&1OO689&1N913EH&RZP360&15WCYOM&17TCHPC&115R68D&1VRCLJ7&12F8G3T&QXNNQC&128FRJB&1OH35FB&CHPVZ7&15VJLWF&DXTQHG&TI7NW9&8F7DFB&3ER51Q&1DTSSTA&1PQZ3V&1CA54WE&1GEM33A&OC7AMR&3AYWID&1KYS5DS&O76Y7S&1CD2C6F&1SB1JQ0&1DMMKMS&OCFDX4&1MO3710&1GVEDEZ&1FT6HVF&4JF9F9&1F8VFMW&1GAQQYW&149YUOT&12GEY49&4MFMGQ&16N8W14&12SV68C&2F7EYB&23HVSL&4TAXU8&1YL1F3&14H19K&1WHTWL7&1PYNLWK&1RUO08N&1PLVRSS&126YWXW&1TAPDE6&18TCRAP:86117:5)`

  expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
})

/**
 * E.g.
 *
 * ```
 * const MyComponent$9 = React.forwardRef(function MyComponent$9() {
 *   return <div css={{ color: 'red' }} />
 * })
 * ```
 */
describe('React.forwardRef with named function', () => {
  // forwardRef only changes the stack trace for SSR
  test('SSR', () => {
    const stackTrace = `Error
    at Object.createEmotionProps (webpack-internal:///../../packages/react/dist/emotion-element-7a9c77b4.cjs.dev.js:175:40)
    at jsxDEV (webpack-internal:///../../packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js:22:75)
    at Object.MyComponent$9 [as render] (webpack-internal:///./pages/index.js:31:80)
    at ReactDOMServerRenderer.render (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3535:44)
    at ReactDOMServerRenderer.read (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3373:29)
    at Object.renderToString (C:/Projects/OSS/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3988:27)
    at Object.renderPage (C:/Projects/OSS/emotion/node_modules/next/dist/server/render.js:621:45)
    at Object.defaultGetInitialProps (C:/Projects/OSS/emotion/node_modules/next/dist/server/render.js:301:51)
    at Function.getInitialProps (webpack-internal:///../../node_modules/next/dist/pages/_document.js:187:16)
    at Object.loadGetInitialProps (C:/Projects/OSS/emotion/node_modules/next/dist/shared/lib/utils.js:69:29)`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })
})

/**
 * E.g. (put an @ in front of jsxImportSource if doing this for real)
 *
 * ```
 * // jsxImportSource theme-ui
 *
 * function MyComponent$9() {
 *   return <div sx={{ color: 'red' }} />
 * }
 * ```
 *
 * See https://theme-ui.com/sx-prop.
 */
describe('multiple jsx factories', () => {
  test('Chrome', () => {
    const stackTrace = `Error
    at createEmotionProps (emotion-element-db00a197.browser.esm.js:78)
    at jsxDEV (emotion-react-jsx-dev-runtime.browser.esm.js:14)
    at jsxDEV (theme-ui-core-jsx-dev-runtime.esm.js:7)
    at MyComponent$9 (App.js:6)
    at renderWithHooks (react-dom.development.js:14803)
    at mountIndeterminateComponent (react-dom.development.js:17482)
    at beginWork (react-dom.development.js:18596)
    at beginWork$1 (react-dom.development.js:23179)`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('Firefox', () => {
    const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:771:40
jsxDEV@http://localhost:3000/static/js/main.chunk.js:942:247
jsxDEV@http://localhost:3000/static/js/vendors~main.chunk.js:3998:87
MyComponent$9@http://localhost:3000/static/js/main.chunk.js:2094:86
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:21501:31
mountIndeterminateComponent@http://localhost:3000/static/js/vendors~main.chunk.js:24113:17
beginWork@http://localhost:3000/static/js/vendors~main.chunk.js:25191:20
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:29733:18`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('Safari', () => {
    const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:866:49
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1147:247
MyComponent$9@http://localhost:3000/static/js/main.chunk.js:2277:86
renderWithHooks@http://localhost:3000/static/js/vendors~main.chunk.js:19627:31
mountIndeterminateComponent@http://localhost:3000/static/js/vendors~main.chunk.js:22239:32
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:27859:27`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  test('SSR', () => {
    const stackTrace = `Error
    at Object.createEmotionProps (C:/Projects/OSS/emotion/packages/react/dist/emotion-element-7a9c77b4.cjs.dev.js:175:40)
    at Object.jsxDEV (C:/Projects/OSS/emotion/packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js:22:75)
    at jsxDEV (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/@theme-ui/core/jsx-dev-runtime/dist/theme-ui-core-jsx-dev-runtime.cjs.dev.js:15:24)
    at MyComponent$9 (webpack-internal:///./pages/index.js:64:79)
    at processChild (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/react-dom/cjs/react-dom-server.node.development.js:3043:14)
    at resolve (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/react-dom/cjs/react-dom-server.node.development.js:2960:5)
    at ReactDOMServerRenderer.render (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/react-dom/cjs/react-dom-server.node.development.js:3435:22)
    at ReactDOMServerRenderer.read (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/react-dom/cjs/react-dom-server.node.development.js:3373:29)
    at Object.renderToString (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/react-dom/cjs/react-dom-server.node.development.js:3988:27)
    at Object.renderPage (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/next/dist/server/render.js:621:45)`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })

  // From https://github.com/emotion-js/emotion/pull/1714#discussion_r365518850
  test('dollar signs in jsx', () => {
    const stackTrace = `jsx@http://localhost:3000/_next/static/development/pages/theme_ui.js?ts=1578745166666:440:17
jsx$$1@http://localhost:3000/_next/static/development/pages/theme_ui.js?ts=1578745166666:2777:60
MyComponent$9@http://localhost:3000/_next/static/development/pages/theme_ui.js?ts=1578745166666:23:62
renderWithHooks@http://localhost:3000/_next/static/development/dll/dll_d6a88dbe3071bd165157.js?ts=1578745166666:16511:27
mountIndeterminateComponent@http://localhost:3000/_next/static/development/dll/dll_d6a88dbe3071bd165157.js?ts=1578745166666:19045:13`

    expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
  })
})

/**
 * E.g.
 *
 * ```
 * class MyComponent$9 extends React.Component {
 *   render() {
 *     return <div css={{ color: 'red' }} />
 *   }
 * }
 * ```
 */
describe('class component', () => {
  test('Chrome', () => {
    const stackTrace = `Error
    at createEmotionProps (emotion-element-6352414e.browser.esm.js:142)
    at jsxDEV (emotion-react-jsx-dev-runtime.browser.esm.js:18)
    at MyComponent$9.render (App.js:6)
    at finishClassComponent (react-dom.development.js:17163)
    at updateClassComponent (react-dom.development.js:17110)
    at beginWork (react-dom.development.js:18620)
    at beginWork$1 (react-dom.development.js:23179)`

    expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
  })

  test('Firefox', () => {
    const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:844:40
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1125:247
render@http://localhost:3000/static/js/main.chunk.js:2276:89
finishClassComponent@http://localhost:3000/static/js/vendors~main.chunk.js:23777:22
updateClassComponent@http://localhost:3000/static/js/vendors~main.chunk.js:23727:48
beginWork@http://localhost:3000/static/js/vendors~main.chunk.js:25187:20
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:29705:18`

    expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
  })

  test('Safari', () => {
    // render does not appear in the stack trace
    const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:866:49
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1147:247
finishClassComponent@http://localhost:3000/static/js/vendors~main.chunk.js:21453:41
updateClassComponent@http://localhost:3000/static/js/vendors~main.chunk.js:21406:48
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:27384:27`

    expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
  })

  test('SSR', () => {
    const stackTrace = `Error
    at Object.createEmotionProps (C:/Projects/OSS/emotion/packages/react/dist/emotion-element-7a9c77b4.cjs.dev.js:175:40)
    at Object.jsxDEV (C:/Projects/OSS/emotion/packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js:22:75)
    at jsxDEV (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/@theme-ui/core/jsx-dev-runtime/dist/theme-ui-core-jsx-dev-runtime.cjs.dev.js:15:24)
    at MyComponent$9.render (webpack-internal:///./pages/index.js:40:76)
    at processChild (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/react-dom/cjs/react-dom-server.node.development.js:3134:18)
    at resolve (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/react-dom/cjs/react-dom-server.node.development.js:2960:5)
    at ReactDOMServerRenderer.render (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/react-dom/cjs/react-dom-server.node.development.js:3435:22)
    at ReactDOMServerRenderer.read (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/react-dom/cjs/react-dom-server.node.development.js:3373:29)
    at Object.renderToString (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/react-dom/cjs/react-dom-server.node.development.js:3988:27)
    at Object.renderPage (C:/Projects/OSS/emotion/playgrounds/nextjs/node_modules/next/dist/server/render.js:621:45)`

    expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
  })
})

/**
 * E.g.
 *
 * ```
 * import React from 'react'
 *
 * var __extends =
 *   (this && this.__extends) ||
 *   (function () {
 *     var extendStatics = function (d, b) {
 *       extendStatics =
 *         Object.setPrototypeOf ||
 *         ({ __proto__: [] } instanceof Array &&
 *           function (d, b) {
 *             d.__proto__ = b
 *           }) ||
 *         function (d, b) {
 *           for (var p in b)
 *             if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
 *         }
 *       return extendStatics(d, b)
 *     }
 *     return function (d, b) {
 *       extendStatics(d, b)
 *       function __() {
 *         this.constructor = d
 *       }
 *       d.prototype =
 *         b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
 *     }
 *   })()
 *
 * export const MyComponent$9 = (function (_super) {
 *   __extends(MyComponent$9, _super)
 *   function MyComponent$9() {
 *     var _this = (_super !== null && _super.apply(this, arguments)) || this
 *     return _this
 *   }
 *   MyComponent$9.prototype.render = function () {
 *     // Defining a variable to prevent Proper Tail Call
 *     const el = <div css={{ color: 'red' }} />
 *     return el
 *   }
 *   return MyComponent$9
 * })(React.PureComponent)
 * ```
 */
describe('class component transpiled to ES 5', () => {
  test('Chrome', () => {
    const stackTrace = `Error
    at createEmotionProps (emotion-element-10a9af6f.browser.esm.js?d0a2:168)
    at jsxDEV (emotion-react-jsx-dev-runtime.browser.esm.js?cf67:18)
    at MyComponent$9.render (MyComponent9.js?2fbf:37)
    at finishClassComponent (react-dom.development.js?3c4a:17160)
    at updateClassComponent (react-dom.development.js?3c4a:17110)
    at beginWork (react-dom.development.js?3c4a:18620)
    at beginWork$1 (react-dom.development.js?3c4a:23179)
    at performUnitOfWork (react-dom.development.js?3c4a:22154)
    at workLoopSync (react-dom.development.js?3c4a:22130)
    at performSyncWorkOnRoot (react-dom.development.js?3c4a:21756)`

    expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
  })

  test('Firefox', () => {
    const stackTrace = `createEmotionProps@webpack-internal:///../../packages/react/dist/emotion-element-10a9af6f.browser.esm.js:189:42
jsxDEV@webpack-internal:///../../packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js:35:230
MyComponent$9</MyComponent$9.prototype.render@webpack-internal:///./pages/MyComponent9.js:62:82
finishClassComponent@webpack-internal:///../../node_modules/react-dom/cjs/react-dom.development.js:17163:18
updateClassComponent@webpack-internal:///../../node_modules/react-dom/cjs/react-dom.development.js:17110:44
beginWork@webpack-internal:///../../node_modules/react-dom/cjs/react-dom.development.js:18620:16
beginWork$1@webpack-internal:///../../node_modules/react-dom/cjs/react-dom.development.js:23179:14
performUnitOfWork@webpack-internal:///../../node_modules/react-dom/cjs/react-dom.development.js:22154:12
workLoopSync@webpack-internal:///../../node_modules/react-dom/cjs/react-dom.development.js:22130:22`

    expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
  })

  test('Safari', () => {
    // No idea why the function name is just blank in this stack trace
    const stackTrace = `createEmotionProps@http://localhost:3000/static/js/main.chunk.js:973:49
jsxDEV@http://localhost:3000/static/js/main.chunk.js:1609:247
@http://localhost:3000/static/js/main.chunk.js:2926:93
finishClassComponent@http://localhost:3000/static/js/vendors~main.chunk.js:21433:41
updateClassComponent@http://localhost:3000/static/js/vendors~main.chunk.js:21386:48
beginWork$1@http://localhost:3000/static/js/vendors~main.chunk.js:27364:27
performUnitOfWork@http://localhost:3000/static/js/vendors~main.chunk.js:26352:27
workLoopSync@http://localhost:3000/static/js/vendors~main.chunk.js:26328:43
performSyncWorkOnRoot@http://localhost:3000/static/js/vendors~main.chunk.js:25946:25`

    expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
  })

  test('SSR', () => {
    const stackTrace = `Error
    at Object.createEmotionProps (webpack-internal:///../../packages/react/dist/emotion-element-491a37fd.cjs.dev.js:201:42)
    at jsxDEV (webpack-internal:///../../packages/react/jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.dev.js:22:75)
    at MyComponent$9.render (webpack-internal:///./pages/MyComponent9.js:60:82)
    at processChild (/Users/sammagura/Documents/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3134:18)
    at resolve (/Users/sammagura/Documents/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:2960:5)
    at ReactDOMServerRenderer.render (/Users/sammagura/Documents/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3435:22)
    at ReactDOMServerRenderer.read (/Users/sammagura/Documents/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3373:29)
    at Object.renderToString (/Users/sammagura/Documents/emotion/node_modules/react-dom/cjs/react-dom-server.node.development.js:3988:27)
    at Object.renderPage (/Users/sammagura/Documents/emotion/node_modules/next/dist/server/render.js:621:45)
    at Object.defaultGetInitialProps (/Users/sammagura/Documents/emotion/node_modules/next/dist/server/render.js:301:51)`

    expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
  })
})

/**
 * https://github.com/emotion-js/emotion/issues/2614
 *
 * Not sure how to reproduce this other than this repro project:
 * https://github.com/srmagura/emotion-issue-2614
 */
describe('issue #2614 - class component transpiled to ES 5', () => {
  test('Chrome', () => {
    const stackTrace = `Error
    at createEmotionProps (webpack-internal:///./node_modules/@emotion/react/dist/emotion-element-699e6908.browser.esm.js:183)
    at Module.jsx (webpack-internal:///./node_modules/@emotion/react/dist/emotion-react.browser.esm.js:127)
    at Loader.render (webpack-internal:///./node_modules/react-spinners/ScaleLoader.js:56)
    at finishClassComponent (webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:17485)
    at updateClassComponent (webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:17435)
    at beginWork (webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:19073)
    at beginWork$1 (webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:23935)
    at performUnitOfWork (webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:22771)
    at workLoopSync (webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:22702)
    at renderRootSync (webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:22665)`

    expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
  })

  test('Firefox', () => {
    const stackTrace = `createEmotionProps@webpack-internal:///./node_modules/@emotion/react/dist/emotion-element-699e6908.browser.esm.js:183:40
jsx@webpack-internal:///./node_modules/@emotion/react/dist/emotion-react.browser.esm.js:127:105
Loader.prototype.render@webpack-internal:///./node_modules/react-spinners/ScaleLoader.js:56:35
finishClassComponent@webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:17485:31
updateClassComponent@webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:17435:44
beginWork@webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:19073:16
beginWork$1@webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:23935:14
performUnitOfWork@webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:22771:12
workLoopSync@webpack-internal:///./node_modules/react-dom/cjs/react-dom.development.js:22702:22`

    expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
  })

  test('Safari', () => {
    // No idea why the function name is blank and there are no file locations
    const stackTrace = `createEmotionProps@
jsx@
@
finishClassComponent@
updateClassComponent@
beginWork$1@
performUnitOfWork@
workLoopSync@
renderRootSync@
performSyncWorkOnRoot@
scheduleUpdateOnFiber@
updateContainer@`

    expect(getLabelFromStackTrace(stackTrace)).toBeUndefined()
  })

  // No SSR stack trace since this comes from a Gatsby project
})
