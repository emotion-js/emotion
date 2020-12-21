// @flow
import * as React from 'react'
import styled, { css } from '@emotion/primitives'
import renderer from 'react-test-renderer'
import { StyleSheet } from 'react-native'

jest.mock('react-primitives')

// this isn't intented to test everything
// this is just to make sure things work
// without the babel plugin

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

test('falsy value in the middle', () => {
  expect(
    StyleSheet.flatten(css`
      color: ${false};
      background-color: hotpink;
    `)
  ).toEqual({ backgroundColor: 'hotpink' })
})

test('should render the primitive when styles applied using object style notation', () => {
  const Text = styled.Text`
    color: red;
    font-size: 20px;
    background-color: ${(props) => props.back};
  `
  const tree = renderer
    .create(
      // $FlowFixMe
      <Text style={{ fontSize: 40 }} back="red">
        Emotion Primitives
      </Text>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

// this needs to be here since the babel plugin will remove the whitespace
test('empty string', () => {
  // prettier-ignore
  let style = css`    
      
  `
  expect(StyleSheet.flatten(style)).toEqual({})
})
