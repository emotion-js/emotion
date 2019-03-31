// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import createCache from '@emotion/cache'
import { jsx, CacheProvider } from '@emotion/core'
import renderer from 'react-test-renderer'

import styledSystemCss from '@styled-system/css'

function render(ele) {
  return renderer.create(ele).toJSON()
}

test('with prefix option', () => {
  let cache = createCache({ prefix: false })

  expect(
    render(
      <CacheProvider value={cache}>
        <div css={{ display: 'flex' }} />
      </CacheProvider>
    )
  ).toMatchInlineSnapshot(`
.emotion-0 {
  display: flex;
}

<div
  className="emotion-0"
/>
`)
})

test('emotion plugins', () => {
  let cache = createCache({
    emotionPlugins: [
      (...args) => {
        return args.map(styles => {
          if ('p' in styles) {
            styles.padding = styles.p
            delete styles.p
          }
          return styles
        })
      }
    ]
  })

  expect(
    render(
      <CacheProvider value={cache}>
        <div css={{ p: 16 }} />
      </CacheProvider>
    )
  ).toMatchInlineSnapshot(`
.emotion-0 {
  padding: 16px;
}

<div
  className="emotion-0"
/>
`)
})

test('emotion plugins - @styled-system/css', () => {
  let cache = createCache({
    emotionPlugins: [styledSystemCss]
  })

  expect(
    render(
      <CacheProvider value={cache}>
        <div
          css={{
            fontSize: [4, 5, 6],
            color: 'primary',
            bg: 'gray',
            '&:hover': {
              color: 'secondary'
            }
          }}
        />
      </CacheProvider>
    )
  ).toMatchInlineSnapshot(`
.emotion-0 {
  color: primary;
  background-color: gray;
  font-size: 24px;
}

.emotion-0:hover {
  color: secondary;
}

@media screen and (min-width:40em) {
  .emotion-0 {
    font-size: 32px;
  }
}

@media screen and (min-width:52em) {
  .emotion-0 {
    font-size: 48px;
  }
}

<div
  className="emotion-0"
/>
`)
})
