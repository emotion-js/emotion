import 'test-utils/setup-env'
import React from 'react'
import { render } from '@testing-library/react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'

test('nested function using css', () => {
  let Comp = styled.div`
    color: blue;
    border: 2px solid #000;
    ${() => css`
      background-color: red;
    `};
    padding: 30px;
  `
  const { container } = render(<Comp />)

  expect(container.firstChild).toMatchSnapshot()
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
  const { container } = render(<Comp />)

  expect(container.firstChild).toMatchSnapshot()
})
