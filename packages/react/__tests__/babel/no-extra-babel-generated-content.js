/** @jsx jsx */
/** @emotion/babel-plugin "autoLabel": "never" */
/** @emotion/babel-plugin "sourceMap": false */

import 'test-utils/next-env'
import { jsx, css } from '@emotion/react'
import renderer from 'react-test-renderer'

test('should insert opaque style object with trailing css variable', () => {
  // styles here are simple enough so they are transformed by Babel to the opaque style with {name, styles} shape
  const tree = renderer.create(
    <div
      css={css`
        color: hotpink;
        --some-variable: 16px;
      `}
    >
      Text
    </div>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})
