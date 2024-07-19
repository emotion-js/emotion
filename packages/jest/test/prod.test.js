import 'test-utils/next-env'
import renderer from 'react-test-renderer'
/** @jsx jsx */
import * as React from 'react'
import { css, jsx } from '@emotion/react'
import { matchers } from '@emotion/jest'

expect.extend(matchers)

gate({ development: false }, ({ test }) => {
  test('it prints fallback values', () => {
    const tree = renderer
      .create(
        <div css={[{ backgroundColor: '#000' }, { backgroundColor: '#fff' }]}>
          <span css={{ color: 'hotpink' }}>{'emotion'}</span>
        </div>
      )
      .toJSON()

    expect(tree).toMatchInlineSnapshot(`
.emotion-0 {
  background-color: #000;
  background-color: #fff;
}

.emotion-1 {
  color: hotpink;
}

<div
  className="emotion-0"
>
  <span
    className="emotion-1"
  >
    emotion
  </span>
</div>
`)
  })

  test('it prints invalid declarations', () => {
    const tree = renderer
      .create(
        <div css={{ bazinga: 'joke' }}>
          <span css={{ color: 'hotpink' }}>{'emotion'}</span>
        </div>
      )
      .toJSON()

    expect(tree).toMatchInlineSnapshot(`
.emotion-0 {
  bazinga: joke;
}

.emotion-1 {
  color: hotpink;
}

<div
  className="emotion-0"
>
  <span
    className="emotion-1"
  >
    emotion
  </span>
</div>
`)
  })
})
