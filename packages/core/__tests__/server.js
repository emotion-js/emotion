/** @jsx jsx
 * @jest-environment node
 */
// @flow
import 'test-utils/dev-mode'
import * as React from 'react'
import testCases from 'jest-in-case'
import {
  jsx,
  Global,
  keyframes,
  CacheProvider,
  ClassNames
} from '@emotion/core'
import styled from '@emotion/styled'
import css from '@emotion/css'
import createCache from '@emotion/cache'
import { renderToString } from 'react-dom/server'
import HTMLSerializer from 'jest-serializer-html'
import createEmotionServer from 'create-emotion-server'

expect.addSnapshotSerializer(HTMLSerializer)

let fakeStylisPlugins = []

let cases = {
  basic: {
    render: () => <div css={{ color: 'hotpink' }}>some hotpink text</div>
  },
  global: {
    render: () => (
      <Global
        styles={{
          html: {
            backgroundColor: 'hotpink'
          }
        }}
      />
    )
  },
  keyframes: {
    render: () => {
      const animation = keyframes(
        css`
          from {
            color: green;
          }
          to {
            color: blue;
          }
        `
      )
      return (
        <React.Fragment>
          <div css={{ animation: `1s ${animation}` }} />
        </React.Fragment>
      )
    }
  },
  'only render a style once with the css prop': {
    render: () => {
      return (
        <div css={{ color: 'green' }}>
          <div css={{ color: 'hotpink' }} />
          <div css={{ color: 'hotpink' }} />
        </div>
      )
    }
  },
  'only render a style once with styled': {
    render: () => {
      const SomeComponent = styled.div`
        color: hotpink;
      `
      return (
        <div css={{ color: 'green' }}>
          <SomeComponent />
          <SomeComponent />
        </div>
      )
    }
  },
  'works with nonces': {
    cache: () => createCache({ nonce: 'some-nonce' }),
    render: () => {
      const SomeComponent = styled.div`
        color: hotpink;
      `
      return (
        <React.Fragment>
          <SomeComponent />
          <div css={{ color: 'hotpink' }} />
          <Global
            styles={{
              html: {
                margin: 0,
                padding: 0,
                fontFamily: 'sans-serif'
              }
            }}
          />
        </React.Fragment>
      )
    }
  },
  'prefix option false': {
    cache: () => createCache({ prefix: false }),
    render: () => {
      return <div css={{ display: 'flex' }} />
    }
  },
  'prefix option false with stylis plugins': {
    cache: () =>
      createCache({ prefix: false, stylisPlugins: fakeStylisPlugins }),
    render: () => {
      return <div css={{ display: 'flex' }} />
    }
  },
  'prefix option true with stylis plugins': {
    cache: () =>
      createCache({ prefix: true, stylisPlugins: fakeStylisPlugins }),
    render: () => {
      return <div css={{ display: 'flex' }} />
    }
  },
  'prefix option func false with stylis plugins': {
    cache: () =>
      createCache({ prefix: () => false, stylisPlugins: fakeStylisPlugins }),
    render: () => {
      return <div css={{ display: 'flex' }} />
    }
  },
  'prefix option func false': {
    cache: () => createCache({ prefix: () => false }),
    render: () => {
      return <div css={{ display: 'flex' }} />
    }
  },

  'global with keyframes': {
    render: () => {
      return (
        <Global
          styles={{
            h1: {
              animation: `${keyframes({
                'from,to': {
                  color: 'green'
                },
                '50%': {
                  color: 'hotpink'
                }
              })} 1s`
            }
          }}
        />
      )
    }
  },
  'styled with keyframes': {
    render: () => {
      const SomeComponent = styled.div({
        animation: `${keyframes({
          'from,to': {
            color: 'green'
          },
          '50%': {
            color: 'hotpink'
          }
        })} 1s`
      })
      return <SomeComponent />
    }
  },
  '@import': {
    render: () => {
      // while there's nothing too special here
      // @import has to be the first rule in the style element
      return (
        <React.Fragment>
          <div css={{ color: 'hotpink' }} />
          <Global
            styles={css`
              h1 {
                color: hotpink;
              }
              @import url('https://some-url');
            `}
          />
        </React.Fragment>
      )
    }
  },
  ClassNames: {
    render: () => {
      return (
        <ClassNames>
          {({ css, cx }) => {
            return (
              <div
                className={css`
                  color: hotpink;
                `}
              >
                <span
                  className={cx(
                    {
                      [css`
                        color: green;
                      `]: true,
                      something: false,
                      'other-class': true
                    },
                    [
                      css`
                        color: yellowgreen;
                      `
                    ],
                    false && 'some-class',
                    undefined,
                    null
                  )}
                />
                <span
                  className={cx(css({ color: 'darkgreen' }), 'other-class')}
                />
              </div>
            )
          }}
        </ClassNames>
      )
    }
  }
}

testCases(
  'ssr',
  opts => {
    if (opts.cache) {
      expect(
        renderToString(
          <CacheProvider value={opts.cache()}>{opts.render()}</CacheProvider>
        )
      ).toMatchSnapshot()
    } else {
      expect(renderToString(opts.render())).toMatchSnapshot()
    }
  },
  cases
)

testCases(
  'ssr with old api',
  opts => {
    let cache = createCache()
    if (opts.cache) {
      cache = opts.cache()
    }
    let { renderStylesToString } = createEmotionServer(cache)
    expect(
      renderStylesToString(
        renderToString(
          <CacheProvider value={cache}>{opts.render()}</CacheProvider>
        )
      )
    ).toMatchSnapshot()
  },
  cases
)
