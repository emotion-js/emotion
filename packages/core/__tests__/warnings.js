// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import css from '@emotion/css'
import { jsx, Global, keyframes } from '@emotion/core'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'

// $FlowFixMe
console.error = jest.fn()

const validValues = [
  'normal',
  'none',
  'counter',
  'open-quote',
  'close-quote',
  'no-open-quote',
  'no-close-quote',
  'initial',
  'inherit',
  '"some thing"',
  "'another thing'",
  'url("http://www.example.com/test.png")',
  'counter(chapter_counter)',
  'counters(section_counter, ".")',
  'attr(value string)'
]

beforeEach(() => {
  jest.resetAllMocks()
})

it('does not warn when valid values are passed for the content property', () => {
  const style = css(validValues.map(value => ({ content: value })))
  expect(console.error).not.toBeCalled()
  expect(renderer.create(<div css={style} />).toJSON()).toMatchSnapshot()
})

const invalidValues = ['this is not valid', '']

it('does warn when invalid values are passed for the content property', () => {
  // $FlowFixMe
  invalidValues.forEach(value => {
    expect(
      renderer.create(<div css={{ content: value }} />).toJSON()
    ).toMatchSnapshot()
    expect(console.error).toBeCalledWith(
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
        const match = (pseudoClass.match(/(:first|:nth|:nth-last)-child/): any)
        expect(match).not.toBeNull()
        expect(renderer.create(<div css={style} />).toJSON()).toMatchSnapshot()
        expect(console.error).toBeCalledWith(
          `The pseudo class "${
            match[0]
          }" is potentially unsafe when doing server-side rendering. Try changing it to "${
            match[1]
          }-of-type".`
        )
      })
    })
  })

  describe(`does not warn when using with flag: ${ignoreSsrFlag}`, () => {
    const ignoredUnsafePseudoClasses = [
      `:first-child ${ignoreSsrFlag}`,
      `:not(:first-child) ${ignoreSsrFlag}`,
      `:nth-child(3) ${ignoreSsrFlag}`,
      `:not(:nth-child(3)) ${ignoreSsrFlag}`,
      `:nth-last-child(7) ${ignoreSsrFlag}`,
      `:first-child span ${ignoreSsrFlag}`,
      `:first-child, span ${ignoreSsrFlag}`,
      `:first-child :nth-child(3) ${ignoreSsrFlag}`,
      `:first-child, :nth-child(3) ${ignoreSsrFlag}`,
      `:first-child:nth-child(3) ${ignoreSsrFlag}`
    ]

    ignoredUnsafePseudoClasses.forEach(pseudoClass => {
      const styles = {
        string: css`
          ${pseudoClass} {
            color: rebeccapurple;
          }
        `,
        object: {
          [pseudoClass]: {
            color: 'rebeccapurple'
          }
        }
      }

      Object.keys(styles).forEach(type => {
        it(`"${pseudoClass.replace(
          /\/\* \S+ \*\//g,
          '/* [flag] */'
        )}" in a style ${type}`, () => {
          const match = (pseudoClass.match(
            /(:first|:nth|:nth-last)-child/
          ): any)
          expect(match).not.toBeNull()
          expect(
            renderer.create(<div css={styles[type]} />).toJSON()
          ).toMatchSnapshot()
          expect(console.error).not.toBeCalled()
        })
      })
    })
  })
})

test('global with css prop', () => {
  let tree = renderer
    .create(
      // $FlowFixMe
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
    .toJSON()
  expect(tree).toMatchSnapshot()

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
  expect((console.error: any).mock.calls).toMatchInlineSnapshot(`
                    Array [
                      Array [
                        "Using kebab-case for css properties in objects is not supported. Did you mean backgroundColor?",
                      ],
                      Array [
                        "Using kebab-case for css properties in objects is not supported. Did you mean msFilter?",
                      ],
                    ]
          `)
})

test('unterminated comments', () => {
  const renderWithStyles = styles => renderer.create(<div css={styles} />)

  expect(() =>
    renderWithStyles(css`
      background-color: green;
    `)
  ).not.toThrowError()

  expect(() =>
    renderWithStyles(css`
      background-color: green; /* comment */
    `)
  ).not.toThrowError()

  expect(() =>
    renderWithStyles(css`
      background-color: green; /*
    `)
  ).toThrowErrorMatchingInlineSnapshot(
    `"Your styles have an unterminated comment (\\"/*\\" without corresponding \\"*/\\")."`
  )

  expect(() =>
    renderWithStyles(css`
      background-color: green; /* comment */
      color: red;
      opacity: 0.9; /*
    `)
  ).toThrowErrorMatchingInlineSnapshot(
    `"Your styles have an unterminated comment (\\"/*\\" without corresponding \\"*/\\")."`
  )
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

  renderer.create(
    <div css={[`animation: ${animateColor} 10s ${rotate360} 5s;`]} />
  )
  expect((console.error: any).mock.calls).toMatchInlineSnapshot(`
            Array [
              Array [
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
