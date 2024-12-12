/** @jsx jsx */
import 'test-utils/setup-env'
import { jsx, css } from '@emotion/react'
import { render } from '@testing-library/react'
import { act } from 'react'

test('tagged template args forwarded', () => {
  function media(...args) {
    return css`
      @media (min-width: 100px) {
        ${css(...args)};
      }
    `
  }

  const { container } = render(
    <h2
      css={css`
        ${media`color: red;`};
      `}
    >
      something
    </h2>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('composition of dynamic array css prop with cssprop-generated className (#1730)', () => {
  const Child = ({ bgColor, ...props }) => (
    <div
      css={[{ width: 50, height: 50 }, { backgroundColor: bgColor }]}
      {...props}
    />
  )
  const Parent = ({ children }) => (
    <Child bgColor="green" css={{ color: 'hotpink' }}>
      {children}
    </Child>
  )
  const { container } = render(
    <Parent>{"I'm hotpink on the green background."}</Parent>
  )

  expect(container.firstChild).toMatchSnapshot()
})
