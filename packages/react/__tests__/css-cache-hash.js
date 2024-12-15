/** @jsx jsx */
import 'test-utils/setup-env'
import { jsx, css } from '@emotion/react'
import { serializeStyles } from '@emotion/serialize'
import { render } from '@testing-library/react'
const utils = require('@emotion/utils')

const spy = jest.spyOn(utils, 'insertStyles')

test.skip('does not rehash if value is css call return value', () => {
  const val = css`
    color: hotpink;
  `
  const { container } = render(
    <div>
      <div css={val} />
    </div>
  )
  expect(serializeStyles([val])).toBe(val)

  expect(spy.mock.calls[0][1]).toBe(val)
  expect(container.firstChild).toMatchSnapshot()
})
