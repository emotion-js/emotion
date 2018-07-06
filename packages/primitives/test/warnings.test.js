// @flow
import { css } from '@emotion/primitives'

// $FlowFixMe
console.error = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

it('does warn when functions are passed to cx calls ', () => {
  css(() => ({}))
  expect(console.error).toBeCalledWith(
    'Interpolating functions in css calls is not allowed.\n' +
      'If you want to have a css call based on props, create a function that returns a css call like this\n' +
      'let dynamicStyle = (props) => css`color: ${props.color}`\n' +
      'It can be called directly with props or interpolated in a styled call like this\n' +
      'let SomeComponent = styled.View`${dynamicStyle}`'
  )
})
