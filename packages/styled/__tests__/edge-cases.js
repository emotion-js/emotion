// @flow
import 'test-utils/next-env'
import * as React from 'react'
import renderer from 'react-test-renderer'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'

test('nested function using css', () => {
  let Comp = styled.div`
    color: blue;
    border: 2px solid #000;
    ${() => css`
      background-color: red;
    `};
    padding: 30px;
  `
  const tree = renderer.create(<Comp />)

  expect(tree.toJSON()).toMatchSnapshot()
})

test('nested function using css and keyframes', () => {
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
  const tree = renderer.create(<Comp />)

  expect(tree.toJSON()).toMatchSnapshot()
})
