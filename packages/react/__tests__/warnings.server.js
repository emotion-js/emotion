/**
 * @jest-environment node
 * @jsx jsx
 */

import 'test-utils/next-env'
import { jsx, css, Global, keyframes } from '@emotion/react'
import { renderToString } from 'react-dom/server'

console.error = jest.fn()

beforeEach(() => {
  jest.resetAllMocks()
})

// In a non-browser (server) environment the `:nth-child` / `:first-child`
// SSR-safety alarm must still fire, because hydration mismatches are a real
// risk when server-rendering. These assertions guard the `!isBrowser` gate in
// `@emotion/cache` — see https://github.com/emotion-js/emotion/issues/3384.
// The browser (CSR) side of this behavior is covered by `warnings.js`.

const ignoreSsrFlag =
  '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */'

describe('unsafe pseudo classes', () => {
  describe(`warns when using without flag: ${ignoreSsrFlag}`, () => {
    const unsafePseudoClasses = [
      ':first-child',
      ':not(:first-child)',
      ':nth-child(3)',
      ':not(:nth-child(3))',
      ':nth-last-child(7)'
    ]

    unsafePseudoClasses.forEach(pseudoClass => {
      it(`"${pseudoClass}"`, () => {
        const style = css`
          ${pseudoClass} {
            color: hotpink;
          }
        `
        const match = pseudoClass.match(/(:first|:nth|:nth-last)-child/)
        expect(match).not.toBeNull()
        renderToString(jsx('div', { css: style }))
        expect(console.error).toBeCalledWith(
          `The pseudo class "${match[0]}" is potentially unsafe when doing server-side rendering. Try changing it to "${match[1]}-of-type".`
        )
      })
    })
  })

  test('does warn when not using the flag on the rule that follows another rule', () => {
    renderToString(
      jsx('div', {
        css: {
          '& > *': {
            marginLeft: 10
          },
          [`& > *:first-child`]: {
            marginLeft: 0
          }
        }
      })
    )
    expect(console.error.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".",
        ],
      ]
    `)
  })

  test('does warn when not using the flag on the rule that preceeds another rule', () => {
    renderToString(
      jsx('div', {
        css: {
          [`& > *:first-child`]: {
            marginLeft: 0
          },
          '& > *': {
            marginLeft: 10
          }
        }
      })
    )
    expect(console.error.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".",
        ],
      ]
    `)
  })

  test('does warn when not using the flag on the rule that follows a declaration', () => {
    renderToString(
      jsx('div', {
        css: {
          color: 'hotpink',
          [`& > *:first-child`]: {
            marginLeft: 0
          }
        }
      })
    )
    expect(console.error.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".",
        ],
      ]
    `)
  })

  test('does warn when not using the flag on the rule that preceeds a declaration', () => {
    renderToString(
      jsx('div', {
        css: {
          [`& > *:first-child`]: {
            marginLeft: 0
          },
          color: 'hotpink'
        }
      })
    )
    expect(console.error.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".",
        ],
      ]
    `)
  })

  test('does warn when not using the flag on a global rule', () => {
    renderToString(
      jsx(Global, {
        styles: {
          [`body > *:first-child`]: {
            marginLeft: 0
          }
        }
      })
    )
    expect(console.error.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".",
        ],
      ]
    `)
  })

  test('does warn when not using the flag on a rule that is defined in another one', () => {
    renderToString(
      jsx('div', {
        css: css`
          div {
            span:first-child {
              border-bottom-left-radius: 0;
            }
          }
        `
      })
    )
    expect(console.error.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".",
        ],
      ]
    `)
  })
})

test('keyframes interpolated into plain string', () => {
  const animateColor = keyframes({
    'from,to': { color: 'green' },
    '50%': { color: 'hotpink' }
  })

  const rotate360 = keyframes({
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(360deg)'
    }
  })

  renderToString(
    jsx('div', { css: [`animation: ${animateColor} 10s ${rotate360} 5s;`] })
  )
  expect(console.error.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "\`keyframes\` output got interpolated into plain string, please wrap it with \`css\`.

        Instead of doing this:

        const animation0 = keyframes\`{from,to{color:green;}50%{color:hotpink;}}\`
        const animation1 = keyframes\`{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}\`
        \`animation: \${animation0} 10s \${animation1} 5s;\`

        You should wrap it with \`css\` like this:

        css\`animation: \${animation0} 10s \${animation1} 5s;\`",
          ],
        ]
    `)
})
