// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import css from '@emotion/css'
import { jsx, Global } from '@emotion/core'
import renderer from 'react-test-renderer'

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

let unsafePseudoClasses = [
  ':first-child',
  ':nth-child(3)',
  ':nth-last-child(7)'
]

unsafePseudoClasses.forEach(pseudoClass => {
  it('does warn when using ' + pseudoClass, () => {
    const style = css`
      ${pseudoClass} {
        color: hotpink;
      }
    `
    let match = (pseudoClass.match(/:(first|nth|nth-last)-child/): any)
    expect(match).not.toBeNull()
    expect(renderer.create(<div css={style} />).toJSON()).toMatchSnapshot()
    expect(console.error).toBeCalledWith(
      `The pseudo class "${
        match[0]
      }" is potentially unsafe when doing server-side rendering. Try changing it to "${
        match[1]
      }-of-type"`
    )
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
  expect(console.error.mock.calls).toMatchInlineSnapshot(`
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
