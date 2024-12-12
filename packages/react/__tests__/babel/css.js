/** @jsx jsx */
import 'test-utils/setup-env'
import { jsx, css } from '@emotion/react'
import renderer from 'react-test-renderer'
import { act } from 'react'

test('tagged template args forwarded', async () => {
  function media(...args) {
    return css`
      @media (min-width: 100px) {
        ${css(...args)};
      }
    `
  }

  const tree = await act(() =>
    renderer.create(
      <h2
        css={css`
          ${media`color: red;`};
        `}
      >
        something
      </h2>
    )
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('composition of dynamic array css prop with cssprop-generated className (#1730)', async () => {
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
  const tree = await act(() =>
    renderer.create(<Parent>{"I'm hotpink on the green background."}</Parent>)
  )

  expect(tree.toJSON()).toMatchSnapshot()
})
