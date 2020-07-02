/** @jsx jsx */
import 'test-utils/next-env'
import { jsx, css } from '@emotion/react'
import renderer from 'react-test-renderer'

test('tagged template args forwarded', () => {
  function media(...args) {
    return css`
      @media (min-width: 100px) {
        ${css(...args)};
      }
    `
  }

  const tree = renderer.create(
    <h2
      css={css`
        ${media`color: red;`};
      `}
    >
      something
    </h2>
  )

  expect(tree.toJSON()).toMatchSnapshot()
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
  const tree = renderer.create(
    <Parent>{"I'm hotpink on the green background."}</Parent>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})
