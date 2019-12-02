// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import { jsx, css } from '@emotion/core'
import renderer from 'react-test-renderer'

test('string className', () => {
  const tree = renderer
    .create(
      <div
        className="legacy__class"
        css={css`
          color: hotpink;
        `}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

test('object className', () => {
  const tree = renderer
    .create(
      <div
        className={{ toString: () => 'legacy__class' }}
        css={css`
          color: hotpink;
        `}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
