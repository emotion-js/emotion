// @flow
import 'test-utils/legacy-env'
import { css } from 'emotion'
import * as React from 'react'
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

afterEach(() => {
  jest.clearAllMocks()
})

it('does not warn when valid values are passed for the content property', () => {
  const cls = css(validValues.map(value => ({ content: value })))
  expect(console.error).not.toBeCalled()
  expect(renderer.create(<div className={cls} />).toJSON()).toMatchSnapshot()
})

const invalidValues = ['this is not valid', '']

it('does warn when invalid values are passed for the content property', () => {
  invalidValues.forEach(value => {
    expect(
      renderer.create(<div className={css({ content: value })} />).toJSON()
    ).toMatchSnapshot()
    expect(console.error).toBeCalledWith(
      `You seem to be using a value for 'content' without quotes, try replacing it with \`content: '"${value}"'\``
    )
  })
})

it('does warn when functions are passed to css calls', () => {
  css(() => 'color:hotpink;')
  expect(console.error).toBeCalledWith(
    "Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`"
  )
})

it('warns when class names from css are interpolated', () => {
  let cls = css`
    color: green;
  `
  css`
    .${cls} {
      color: hotpink;
    }
  `
  expect((console.error: any).mock.calls[0]).toMatchInlineSnapshot(`
Array [
  "Interpolating a className from css\`\` is not recommended and will cause problems with composition.
Interpolating a className from css\`\` will be completely unsupported in a future major version of Emotion",
]
`)
})
