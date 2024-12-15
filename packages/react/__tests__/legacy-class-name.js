/** @jsx jsx */
import 'test-utils/setup-env'
import { jsx, css } from '@emotion/react'
import { render } from '@testing-library/react'

test('string className', () => {
  const { container } = render(
    <div
      className="legacy__class"
      css={css`
        color: hotpink;
      `}
    />
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('object className', () => {
  const { container } = render(
    <div
      className={{ toString: () => 'legacy__class' }}
      css={css`
        color: hotpink;
      `}
    />
  )

  expect(container.firstChild).toMatchSnapshot()
})
