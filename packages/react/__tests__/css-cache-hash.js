/** @jsx jsx */
import 'test-utils/setup-env'
import { jsx, css } from '@emotion/react'
import { serializeStyles } from '@emotion/serialize'
import * as renderer from 'react-test-renderer'
import { act } from 'react'
const utils = require('@emotion/utils')

const spy = jest.spyOn(utils, 'insertStyles')

test('does not rehash if value is css call return value', async () => {
  const val = css`
    color: hotpink;
  `
  const tree = await act(() =>
    renderer.create(
      <div>
        <div css={val} />
      </div>
    )
  )
  expect(serializeStyles([val])).toBe(val)

  expect(spy.mock.calls[0][1]).toBe(val)
  expect(tree.toJSON()).toMatchSnapshot()
})
