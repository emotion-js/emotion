// @flow
import { css } from 'emotion'
import * as React from 'react'
import renderer from 'react-test-renderer'

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

it('does not warn when valid values are passed for the content property', () => {
  // $FlowFixMe
  console.error = jest.fn()
  const cls = css(validValues.map(value => ({ content: value })))
  expect(console.error).not.toBeCalled()
  expect(renderer.create(<div className={cls} />).toJSON()).toMatchSnapshot()
})

const invalidValues = ['this is not valid', '']

it('does warn when invalid values are passed for the content property', () => {
  // $FlowFixMe
  console.error = jest.fn()
  invalidValues.forEach(value => {
    expect(
      renderer.create(<div className={css({ content: value })} />).toJSON()
    ).toMatchSnapshot()
    expect(console.error).toBeCalledWith(
      `You seem to be using a value for 'content' without quotes, try replacing it with \`content: '"${value}"'\``
    )
  })
})
