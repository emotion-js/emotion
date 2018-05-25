// @flow
import { css, cx } from 'emotion'
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
    "Interpolating functions in css calls is deprecated and will be removed in the next major version of Emotion.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`"
  )
})

it('does warn when functions are passed to cx calls ', () => {
  cx(() => 'cls')
  expect(console.error).toBeCalledWith(
    'Passing functions to cx is deprecated and will be removed in the next major version of Emotion.\nPlease call the function before passing it to cx.'
  )
})
