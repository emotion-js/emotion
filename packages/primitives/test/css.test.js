// @flow
import { css } from '@emotion/primitives'
import { StyleSheet } from 'react-native'

let returnArguments = (...args) => args

test('basic', () => {
  expect(
    StyleSheet.flatten(css`
      color: hotpink;
      ${{ backgroundColor: 'green' }};
    `)
  ).toEqual({ color: 'hotpink', backgroundColor: 'green' })
  expect(StyleSheet.flatten(css({ color: 'green' }))).toEqual({
    color: 'green',
  })
  expect(
    StyleSheet.flatten(css([{ color: 'green' }, `background-color:yellow;`]))
  ).toEqual({
    color: 'green',
    backgroundColor: 'yellow',
  })
  expect(StyleSheet.flatten(css([{ color: 'green' }]))).toEqual({
    color: 'green',
  })
})

test('order with string and object', () => {
  // this test checks the keys instead of the objects
  // because we care about the order of the keys
  expect(
    // $FlowFixMe
    Object.keys(
      StyleSheet.flatten(
        css({ color: 'green' }, `background-color:yellow;`, { flex: 2 })
      )
    )
  ).toEqual(['color', 'backgroundColor', 'flex'])
  expect(
    // $FlowFixMe
    Object.keys(
      StyleSheet.flatten(
        css([
          [{ color: 'green' }, `background-color:yellow;`],
          {
            flex: 2,
          },
        ])
      )
    )
  ).toEqual(['color', 'backgroundColor', 'flex'])
  expect(
    // $FlowFixMe
    Object.keys(
      StyleSheet.flatten(
        css([
          { color: 'green' },
          [
            `background-color:yellow;`,
            {
              flex: 2,
            },
          ],
        ])
      )
    )
  ).toEqual(['color', 'backgroundColor', 'flex'])
  expect(
    // $FlowFixMe
    Object.keys(
      StyleSheet.flatten(
        css([
          { color: 'green' },
          [
            { flex: 8 },
            `background-color:yellow;`,
            [`flex-grow: 1;`, { flexDirection: 'row' }],
          ],
        ])
      )
    )
  ).toEqual(['color', 'flex', 'backgroundColor', 'flexGrow', 'flexDirection'])
})

it('allows function interpolations when this is defined', () => {
  expect(
    StyleSheet.flatten(
      css.call({ thing: true }, (props) => ({
        color: props.thing && 'hotpink',
      }))
    )
  ).toEqual({ color: 'hotpink' })
})

it('works with nested functions', () => {
  expect(
    StyleSheet.flatten(
      css.call({ thing: true }, (props) => () => ({
        color: props.thing && 'hotpink',
      }))
    )
  ).toEqual({ color: 'hotpink' })
})

it('works with functions in tagged template literals', () => {
  expect(
    StyleSheet.flatten(
      css.call(
        {},
        ...returnArguments`
        color: ${() => 'hotpink'};
      `
      )
    )
  ).toEqual({ color: 'hotpink' })
})

test('last arg falsy and string before that', () => {
  expect(StyleSheet.flatten(css('color:hotpink;', false))).toEqual({
    color: 'hotpink',
  })
})

test('falsy value in the middle', () => {
  expect(
    StyleSheet.flatten(css`
      color: ${false};
      background-color: hotpink;
    `)
  ).toEqual({ backgroundColor: 'hotpink' })
})

test('composition', () => {
  let firstStyle = css`
    color: hotpink;
  `
  expect(
    StyleSheet.flatten(css`
      background-color: green;
      ${firstStyle};
    `)
  ).toEqual({ backgroundColor: 'green', color: 'hotpink' })
})
