import 'test-utils/setup-env'
import React from 'react'
import { act } from 'react'
import renderer from 'react-test-renderer'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'

test('nested function using css', async () => {
  let Comp = styled.div`
    color: blue;
    border: 2px solid #000;
    ${() => css`
      background-color: red;
    `};
    padding: 30px;
  `
  const tree = await act(() => renderer.create(<Comp />))

  expect(tree.toJSON()).toMatchSnapshot()
})

test('nested function using css and keyframes', async () => {
  let Comp = styled.div`
    ${() => css`
      animation: ${keyframes({
        'from,to': { color: 'green' },
        '50%': {
          color: 'hotpink'
        }
      })};
    `};
  `
  const tree = await act(() => renderer.create(<Comp />))

  expect(tree.toJSON()).toMatchSnapshot()
})
