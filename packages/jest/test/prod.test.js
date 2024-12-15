/** @jsx jsx */
import 'test-utils/setup-env'
import { render } from '@testing-library/react'
import * as React from 'react'
import { css, jsx } from '@emotion/react'
import { matchers } from '@emotion/jest'

expect.extend(matchers)

gate({ development: false }, ({ test }) => {
  test('it prints fallback values', () => {
    const { container } = render(
      <div css={[{ backgroundColor: '#000' }, { backgroundColor: '#fff' }]}>
        <span css={{ color: 'hotpink' }}>{'emotion'}</span>
      </div>
    )

    expect(container.firstChild).toMatchInlineSnapshot(`
.emotion-0 {
  background-color: #000;
  background-color: #fff;
}

.emotion-1 {
  color: hotpink;
}

<div
  class="emotion-0"
>
  <span
    class="emotion-1"
  >
    emotion
  </span>
</div>
`)
  })

  test('it prints invalid declarations', () => {
    const { container } = render(
      <div css={{ bazinga: 'joke' }}>
        <span css={{ color: 'hotpink' }}>{'emotion'}</span>
      </div>
    )

    expect(container.firstChild).toMatchInlineSnapshot(`
.emotion-0 {
  bazinga: joke;
}

.emotion-1 {
  color: hotpink;
}

<div
  class="emotion-0"
>
  <span
    class="emotion-1"
  >
    emotion
  </span>
</div>
`)
  })
})
