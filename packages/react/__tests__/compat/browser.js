/** @jsx jsx */
import 'test-utils/dev-mode'
import { throwIfFalsy } from 'test-utils'
import { jsx, CacheProvider } from '@emotion/react'
import { render } from '@testing-library/react'
import { css, cache } from '@emotion/css'

test('composition works from old emotion css calls', () => {
  const cls = css`
    color: green;
  `
  render(
    <CacheProvider value={cache}>
      <div css={cls} />
    </CacheProvider>
  )
  expect(document.documentElement).toMatchSnapshot()
})
