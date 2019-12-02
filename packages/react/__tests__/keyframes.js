// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import { jsx, css, keyframes } from '@emotion/core'
import { safeQuerySelector, throwIfFalsy } from 'test-utils'
import cases from 'jest-in-case'
import * as renderer from 'react-test-renderer'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/core'

cases(
  'keyframes',
  opts => {
    safeQuerySelector('head').innerHTML = ''
    let cache = createCache()
    expect(
      renderer
        .create(<CacheProvider value={cache}>{opts.render()}</CacheProvider>)
        .toJSON()
    ).toMatchSnapshot()
    expect(
      throwIfFalsy(cache.sheet.tags).map(tag => tag.textContent || '')
    ).toMatchSnapshot()
    cache.sheet.flush()
  },
  {
    basic: {
      render: () => {
        // this isn't necessary and many people will likely use
        // keyframes as a tagged template literal but using a css call
        // means prettier will format it
        let animation = keyframes(css`
          from {
            color: green;
          }
          to {
            color: hotpink;
          }
        `)
        return (
          <div
            css={css`
              animation: ${animation};
            `}
          >
            {animation.name}
          </div>
        )
      }
    },
    'without css call': {
      render: () => {
        let animation = keyframes`
          from {
            color: green;
          }
          to {
            color: hotpink;
          }
        `
        return (
          <div
            css={css`
              animation: ${animation};
            `}
          >
            {animation.name}
          </div>
        )
      }
    },
    object: {
      render: () => {
        let animation = keyframes({
          from: {
            color: 'green'
          },
          to: {
            color: 'hotpink'
          }
        })

        return (
          <div
            css={{
              animation: `${animation} 1s`
            }}
          >
            {animation.name}
          </div>
        )
      }
    },
    'object with string keyframes': {
      render: () => {
        let animation = keyframes(css`
          from {
            color: green;
          }
          to {
            color: hotpink;
          }
        `)

        return (
          <div
            css={{
              animation: `${animation} 1s`
            }}
          >
            {animation.name}
          </div>
        )
      }
    },
    'object with animationName and opaque keyframes as value': {
      render: () => {
        let animation = keyframes(css`
          from {
            color: green;
          }
          to {
            color: hotpink;
          }
        `)

        return (
          <div
            css={{
              animationName: animation,
              animationDuration: '1s'
            }}
          >
            {animation.name}
          </div>
        )
      }
    },
    'object with animationName and string keyframes as value': {
      render: () => {
        let animation = keyframes(css`
          from {
            color: green;
          }
          to {
            color: hotpink;
          }
        `)

        return (
          <div
            css={{
              animationName: `${animation}`,
              animationDuration: '1s'
            }}
          >
            {animation.name}
          </div>
        )
      }
    },
    'object with animation and opaque keyframes as value': {
      render: () => {
        let animation = keyframes(css`
          from {
            color: green;
          }
          to {
            color: hotpink;
          }
        `)

        return (
          <div
            css={{
              animation,
              animationDuration: '1s'
            }}
          >
            {animation.name}
          </div>
        )
      }
    },
    'multiple keyframes object': {
      render: () => {
        let animation = keyframes(css`
          from {
            color: green;
          }
          to {
            color: hotpink;
          }
        `)
        let yellowAnimation = keyframes(css`
          from {
            color: green;
          }
          to {
            color: yellow;
          }
        `)
        return (
          <div
            css={{
              animation: `${animation} 1s ${yellowAnimation}`
            }}
          >
            {animation.name}
          </div>
        )
      }
    },
    'keyframes used in css call': {
      render: () => {
        let animation = keyframes(css`
          from {
            color: green;
          }
          to {
            color: hotpink;
          }
        `)
        let yellowAnimation = keyframes(css`
          from {
            color: green;
          }
          to {
            color: yellow;
          }
        `)
        return (
          <div
            css={[
              css({
                animation: `${animation} 1s ${yellowAnimation}`
              })
            ]}
          >
            {animation.name}
          </div>
        )
      }
    }
  }
)
