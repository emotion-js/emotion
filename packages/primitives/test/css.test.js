// @flow
import { css } from '@emotion/primitives'

let returnArguments = (...args) => args

test('basic', () => {
  expect(css`
    color: hotpink;
    ${{ backgroundColor: 'green' }};
  `).toEqual({ color: 'hotpink', backgroundColor: 'green' })
  expect(css({ color: 'green' })).toEqual({ color: 'green' })
  expect(css([{ color: 'green' }, `background-color:yellow;`])).toEqual({
    color: 'green',
    backgroundColor: 'yellow'
  })
  expect(css([{ color: 'green' }])).toEqual({ color: 'green' })
})

test('order with string and object', () => {
  // this test checks the keys instead of the objects
  // because we care about the order of the keys
  expect(
    Object.keys(
      css({ color: 'green' }, `background-color:yellow;`, { flex: 2 })
    )
  ).toEqual(['color', 'backgroundColor', 'flex'])
  expect(
    Object.keys(
      css([
        [{ color: 'green' }, `background-color:yellow;`],
        {
          flex: 2
        }
      ])
    )
  ).toEqual(['color', 'backgroundColor', 'flex'])
  expect(
    Object.keys(
      css([
        { color: 'green' },
        [
          `background-color:yellow;`,
          {
            flex: 2
          }
        ]
      ])
    )
  ).toEqual(['color', 'backgroundColor', 'flex'])
  expect(
    Object.keys(
      css([
        { color: 'green' },
        [
          { flex: 8 },
          `background-color:yellow;`,
          [`flex-grow: 1;`, { flexDirection: 'row' }]
        ]
      ])
    )
  ).toEqual(['color', 'flex', 'backgroundColor', 'flexGrow', 'flexDirection'])
})

it('allows function interpolations when this.mergedProps is defined', () => {
  expect(
    css.call({ mergedProps: { thing: true } }, props => ({
      color: props.thing && 'hotpink'
    }))
  ).toEqual({ color: 'hotpink' })
})

it('works with nested functions', () => {
  expect(
    css.call({ mergedProps: { thing: true } }, props => () => ({
      color: props.thing && 'hotpink'
    }))
  ).toEqual({ color: 'hotpink' })
})

it('works with functions in tagged template literals', () => {
  expect(
    css.call(
      { mergedProps: {} },
      ...returnArguments`
        color: ${() => 'hotpink'};
      `
    )
  ).toEqual({ color: 'hotpink' })
})

test('last arg falsy and string before that', () => {
  expect(css('color:hotpink;', false)).toEqual({ color: 'hotpink' })
})

test('falsy value in the middle', () => {
  expect(
    css`
      color: ${false};
      background-color: hotpink;
    `
  ).toEqual({ backgroundColor: 'hotpink' })
})

test('composition', () => {
  let firstStyle = css`
    color: hotpink;
  `
  expect(
    css`
      background-color: green;
      ${firstStyle};
    `
  ).toEqual({ backgroundColor: 'green', color: 'hotpink' })
})
