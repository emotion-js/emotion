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

  describe('typical function component', () => {
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

    // test('Safari', () => {
    //   const stackTrace = `TODO`

    //   expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    // })

    // test('Next.js SSR', () => {
    //   const stackTrace = `TODO`

    //   expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    // })
  })

  /**
   * E.g.
   *
   * ```jsx
   * function MyComponent9() {
   *   function renderSpan() {
   *     return <span css={{ color: 'orchid' }}>Orchid2</span>
   *   }
   *
   *   return <div>{renderSpan()}</div>
   * }
   * ```
   */
  describe('render function within function component', () => {
    test('Chrome', () => {
      const stackTrace = `Error
    at createEmotionProps (emotion-element-6352414e.browser.esm.js:142)
    at jsx (emotion-react.browser.esm.js:100)
    at renderSpan (App.js:17)
    at MyComponent9 (App.js:20)
    at renderWithHooks (react-dom.development.js:14803)
    at mountIndeterminateComponent (react-dom.development.js:17482)
    at beginWork (react-dom.development.js:18596)
    at beginWork$1 (react-dom.development.js:23179)`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Firefox', () => {
      const stackTrace = `createEmotionProps@http://localhost:3000/static/js/bundle.js:46440:40
jsx@http://localhost:3000/static/js/bundle.js:46635:113
renderSpan@http://localhost:3000/static/js/bundle.js:47578:79
MyComponent9@http://localhost:3000/static/js/bundle.js:47599:5
renderWithHooks@http://localhost:3000/static/js/bundle.js:18904:27
mountIndeterminateComponent@http://localhost:3000/static/js/bundle.js:21583:13
beginWork@http://localhost:3000/static/js/bundle.js:22697:16`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    // test('Safari', () => {
    //   const stackTrace = `TODO`

    //   expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    // })

    // test('Next.js SSR', () => {
    //   const stackTrace = `TODO`

    //   expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    // })
  })

  describe('element returned by Array.map', () => {
    test('Chrome', () => {
      const stackTrace = `Error
    at createEmotionProps (emotion-element-6352414e.browser.esm.js:142)
    at jsx (emotion-react.browser.esm.js:100)
    at App.js:22
    at Array.map (<anonymous>)
    at MyComponent9 (App.js:22)
    at renderWithHooks (react-dom.development.js:14803)
    at mountIndeterminateComponent (react-dom.development.js:17482)
    at beginWork (react-dom.development.js:18596)`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    test('Firefox', () => {
      const stackTrace = `createEmotionProps@http://localhost:3000/static/js/bundle.js:46440:40
jsx@http://localhost:3000/static/js/bundle.js:46635:113
MyComponent9/<@http://localhost:3000/static/js/bundle.js:47602:81
MyComponent9@http://localhost:3000/static/js/bundle.js:47601:15
renderWithHooks@http://localhost:3000/static/js/bundle.js:18904:27
mountIndeterminateComponent@http://localhost:3000/static/js/bundle.js:21583:13
beginWork@http://localhost:3000/static/js/bundle.js:22697:16`

      expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    })

    // test('Safari', () => {
    //   const stackTrace = `TODO`

    //   expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    // })

    // test('Next.js SSR', () => {
    //   const stackTrace = `TODO`

    //   expect(getLabelFromStackTrace(stackTrace)).toBe(expectedLabel)
    // })
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
