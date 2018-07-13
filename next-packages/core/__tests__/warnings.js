// @flow
/** @jsx jsx */
import css from '@emotion/css'
import { jsx } from '@emotion/core'
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
        match[1]
      }" is potentially unsafe when doing server-side rendering. Try changing it to "${
        match[1]
      }-of-type"`
    )
  })
})
