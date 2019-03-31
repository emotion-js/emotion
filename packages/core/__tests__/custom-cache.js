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

test('why this exact api would cause a problem', () => {
  let cache = createCache({
    emotionPlugins: [styledSystemCss]
  })

  let SomeComponentFromNpm = props => {
    // let's say i'm an author of a library using emotion
    // i want to apply padding: 2px to my element and that's it
    return <p css={{ padding: 2 }}>i want this to have padding: 2px</p>
  }
  // as a consumer of the above component, i don't want to have to care that it uses emotion
  // and i especially don't want it to break because of how i'm using emotion in my app

  expect(
    render(
      <CacheProvider value={cache}>
        <div>
          <SomeComponentFromNpm />
          <div
            css={{
              padding: 4
            }}
          >
            i want this to have the padding value at the index 4 from the space
            thing
          </div>
        </div>
      </CacheProvider>
    )
  ).toMatchInlineSnapshot(`
.emotion-0 {
  padding: 8px;
}

.emotion-1 {
  padding: 32px;
}

<div>
  <p
    className="emotion-0"
  >
    i want this to have padding: 2px
  </p>
  <div
    className="emotion-1"
  >
    i want this to have the padding value at the index 4 from the space thing
  </div>
</div>
`)
})
