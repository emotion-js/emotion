/** @jsx jsx */
import 'test-utils/setup-env'
import { jsx, css } from '@emotion/react'
import renderer from 'react-test-renderer'
import { act } from 'react'

test('string className', async () => {
  const tree = (
    await act(() =>
      renderer.create(
        <div
          className="legacy__class"
          css={css`
            color: hotpink;
          `}
        />
      )
    )
  ).toJSON()

  expect(tree).toMatchSnapshot()
})

test('object className', async () => {
  const tree = (
    await act(() =>
      renderer.create(
        <div
          className={{ toString: () => 'legacy__class' }}
          css={css`
            color: hotpink;
          `}
        />
      )
    )
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
