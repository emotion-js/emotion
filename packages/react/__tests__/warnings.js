/** @jsx jsx */
import 'test-utils/setup-env'
import { jsx, css, Global, keyframes, ClassNames } from '@emotion/react'
import styled from '@emotion/styled'
import { render } from '@testing-library/react'

console.error = jest.fn()

const validValues = [
  'normal',
  'none',
  'open-quote',
  'close-quote',
  'no-open-quote',
  'no-close-quote',
  'initial',
  'inherit',
  '"some thing"',
  "'another thing'",
  'var(--variable-name)',
  'url("http://www.example.com/test.png")',
  'linear-gradient(hotpink, #8be9fd)',
  'radial-gradient(hotpink, #8be9fd)',
  'repeating-linear-gradient(hotpink, #8be9fd)',
  'repeating-radial-gradient(hotpink, #8be9fd)',
  'conic-gradient(hotpink, #8be9fd)',
  'counter(chapter_counter)',
  'counters(section_counter, ".")',
  'attr(value string)',
  'open-quote counter(chapter_counter)',
  // https://github.com/emotion-js/emotion/issues/2895
  'element(name)'
]

beforeEach(() => {
  jest.resetAllMocks()
})

test('does not warn when valid values are passed for the content property', () => {
  const style = css(validValues.map(value => ({ content: value })))
  expect(console.error).not.toBeCalled()
  expect(render(<div css={style} />).container.firstChild).toMatchSnapshot()
})

const invalidValues = ['this is not valid', '', 'element']

test('does warn when invalid values are passed for the content property', () => {
  invalidValues.forEach(value => {
    expect(() => render(<div css={{ content: value }} />)).toThrowError(
      `You seem to be using a value for 'content' without quotes, try replacing it with \`content: '"${value}"'\``
    )
  })
})

describe('unsafe pseudo classes', () => {
  const ignoreSsrFlag =
    '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */'

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
        expect(
          render(<div css={style} />).container.firstChild
        ).toMatchSnapshot()
        expect(console.error).toBeCalledWith(
          `The pseudo class "${match[0]}" is potentially unsafe when doing server-side rendering. Try changing it to "${match[1]}-of-type".`
        )
      })
    })
  })

  describe(`does not warn when using with flag: ${ignoreSsrFlag}`, () => {
    describe.each([
      {
        type: 'string',
        getStyle: pseudoClass => css`
          ${pseudoClass} ${ignoreSsrFlag} {
            color: rebeccapurple;
          }
        `
      },
      {
        type: 'object',
        getStyle: pseudoClass => ({
          [`${pseudoClass} ${ignoreSsrFlag}`]: {
            color: 'rebeccapurple'
          }
        })
      }
    ])(`with $type styles`, ({ getStyle }) => {
      test.each([
        { pseudoClass: `:first-child` },
        { pseudoClass: `:not(:first-child)` },
        { pseudoClass: `:nth-child(3)` },
        { pseudoClass: `:not(:nth-child(3))` },
        { pseudoClass: `:nth-last-child(7)` },
        { pseudoClass: `:first-child span` },
        { pseudoClass: `:first-child, span` },
        { pseudoClass: `:first-child :nth-child(3)` },
        { pseudoClass: `:first-child, :nth-child(3)` },
        { pseudoClass: `:first-child:nth-child(3)` }
      ])('$pseudoClass', ({ pseudoClass }) => {
        const match = pseudoClass.match(/(:first|:nth|:nth-last)-child/)
        expect(match).not.toBeNull()
        expect(
          render(<div css={getStyle(pseudoClass)} />).container.firstChild
        ).toMatchSnapshot()
        expect(console.error).not.toBeCalled()
      })
    })

    test('does warn when not using the flag on the rule that follows another rule', () => {
      expect(
        render(
          <div
            css={{
              '& > *': {
                marginLeft: 10
              },
              [`& > *:first-child$`]: {
                marginLeft: 0
              }
            }}
          />
        ).container
      ).toMatchSnapshot()
      expect(console.error.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".",
          ],
        ]
      `)
    })

    test('does warn when not using the flag on the rule that preceeds another rule', () => {
      expect(
        render(
          <div
            css={{
              [`& > *:first-child`]: {
                marginLeft: 0
              },
              '& > *': {
                marginLeft: 10
              }
            }}
          />
        ).container
      ).toMatchSnapshot()
      expect(console.error.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".",
          ],
        ]
      `)
    })

    test('does warn when not using the flag on the rule that follows a declaration', () => {
      expect(
        render(
          <div
            css={{
              color: 'hotpink',
              [`& > *:first-child`]: {
                marginLeft: 0
              }
            }}
          />
        ).container
      ).toMatchSnapshot()
      expect(console.error.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".",
          ],
        ]
      `)
    })

    test('does warn when not using the flag on the rule that preceeds a declaration', () => {
      expect(
        render(
          <div
            css={{
              [`& > *:first-child`]: {
                marginLeft: 0
              },
              color: 'hotpink'
            }}
          />
        ).container
      ).toMatchSnapshot()
      expect(console.error.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".",
          ],
        ]
      `)
    })

    test('does warn when not using the flag on a global rule', () => {
      expect(
        render(
          <Global
            styles={{
              [`body > *:first-child`]: {
                marginLeft: 0
              }
            }}
          />
        ).container
      ).toMatchSnapshot()
      expect(console.error.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".",
          ],
        ]
      `)
    })

    test('does not warn when using the flag on the rule that follows another rule', () => {
      expect(
        render(
          <div
            css={{
              '& > *': {
                marginLeft: 10
              },
              [`& > *:first-child${ignoreSsrFlag}`]: {
                marginLeft: 0
              }
            }}
          />
        ).container
      ).toMatchSnapshot()
      expect(console.error).not.toBeCalled()
    })

    test('does not warn when using the flag on the rule that preceeds another rule', () => {
      expect(
        render(
          <div
            css={{
              [`& > *:first-child${ignoreSsrFlag}`]: {
                marginLeft: 0
              },
              '& > *': {
                marginLeft: 10
              }
            }}
          />
        ).container
      ).toMatchSnapshot()
      expect(console.error).not.toBeCalled()
    })

    test('does not warn when using the flag on the rule that follows a declaration', () => {
      expect(
        render(
          <div
            css={{
              color: 'hotpink',
              [`& > *:first-child${ignoreSsrFlag}`]: {
                marginLeft: 0
              }
            }}
          />
        ).container
      ).toMatchSnapshot()
      expect(console.error).not.toBeCalled()
    })

    test('does not warn when using the flag on the rule that preceeds a declaration', () => {
      expect(
        render(
          <div
            css={{
              [`& > *:first-child${ignoreSsrFlag}`]: {
                marginLeft: 0
              },
              color: 'hotpink'
            }}
          />
        ).container
      ).toMatchSnapshot()
      expect(console.error).not.toBeCalled()
    })

    test('does not warn when using the flag on a global rule', () => {
      expect(
        render(
          <Global
            styles={{
              [`body > *:first-child${ignoreSsrFlag}`]: {
                marginLeft: 0
              }
            }}
          />
        ).container
      ).toMatchSnapshot()
      expect(console.error).not.toBeCalled()
    })

    test('does warn when not using the flag on a rule that is defined in another one', () => {
      expect(
        render(
          <div
            css={css`
              div {
                span:first-child {
                  border-bottom-left-radius: 0;
                }
              }
            `}
          />
        ).container.firstChild
      ).toMatchSnapshot()
      expect(console.error.mock.calls).toMatchInlineSnapshot(`
        [
          [
            "The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".",
          ],
        ]
      `)
    })

    test('does not warn when using the flag on a rule that is defined in another one', () => {
      expect(
        render(
          <div
            css={css`
              div {
                span:first-child${ignoreSsrFlag} {
                  border-bottom-left-radius: 0;
                }
              }
            `}
          />
        ).container
      ).toMatchSnapshot()
      expect(console.error).not.toBeCalled()
    })
  })
})

test('global with css prop', () => {
  let { container } = render(
    <Global
      css={{
        html: {
          backgroundColor: 'hotpink'
        },
        '@font-face': {
          fontFamily: 'some-name'
        }
      }}
    />
  )
  expect(container).toMatchSnapshot()

  expect(console.error).toBeCalledWith(
    "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"
  )
})

test('kebab-case', () => {
  css({ 'background-color': 'green' })
  css({ 'background-color': 'hotpink' })
  css({ '-ms-filter': 'inherit' })
  css({ '@media (min-width 800px)': undefined })
  css({ '--primary-color': 'hotpink' })
  css({ ':last-of-type': null })
  expect(console.error.mock.calls).toMatchInlineSnapshot(`
                    [
                      [
                        "Using kebab-case for css properties in objects is not supported. Did you mean backgroundColor?",
                      ],
                      [
                        "Using kebab-case for css properties in objects is not supported. Did you mean msFilter?",
                      ],
                    ]
          `)
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

  render(<div css={[`animation: ${animateColor} 10s ${rotate360} 5s;`]} />)
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

test('`css` opaque object passed in as `className` prop', () => {
  const { container } = render(
    <div
      className={css`
        color: hotpink;
      `}
    />
  )

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="You have tried to stringify object returned from \`css\` function. It isn't supposed to be used directly (e.g. as value of the \`className\` prop), but rather handed to emotion so it can handle it (e.g. as value of \`css\` prop)."
      />
    </div>
  `)
})

test('`css` opaque object passed to `cx` from <ClassNames/>', () => {
  render(
    <ClassNames>
      {({ cx }) => (
        <div
          className={cx(
            css`
              color: hotpink;
            `,
            'other-cls'
          )}
        />
      )}
    </ClassNames>
  )

  expect(console.error.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "You have passed styles created with \`css\` from \`@emotion/react\` package to the \`cx\`.
    \`cx\` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the \`css\` received from <ClassNames/> component.",
      ],
    ]
  `)
})

test('@import nested in scoped `css`', () => {
  render(
    <div
      css={css`
        @import url('https://some-url');

        h1 {
          color: hotpink;
        }
      `}
    />
  )

  expect(console.error.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "\`@import\` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.",
      ],
    ]
  `)
})

test('@import prepended with other rules', () => {
  render(
    <Global
      styles={css`
        h1 {
          color: hotpink;
        }

        @import url('https://some-url');
      `}
    />
  )

  expect(console.error.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "\`@import\` rules can't be after other rules. Please put your \`@import\` rules before your other rules.",
      ],
    ]
  `)
})

test('@import prepended by other @import', () => {
  render(
    <Global
      styles={css`
        @import url('https://some-url');
        @import url('https://some-url2');
      `}
    />
  )

  expect(console.error.mock.calls).toMatchInlineSnapshot(`[]`)
})

test('when using `jsx` multiple static children should not result in a key-related warning', () => {
  render(
    <div css={{ color: 'hotpink' }}>
      <div />
      <div />
    </div>
  )
  expect(console.error.mock.calls).toMatchInlineSnapshot(`[]`)
})
