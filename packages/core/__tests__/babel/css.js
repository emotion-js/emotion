/** @jsx jsx */
import 'test-utils/next-env'
import { jsx, css } from '@emotion/core'
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
