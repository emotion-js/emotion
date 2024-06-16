/** @jsx jsx
 * @jest-environment node
 */

import 'test-utils/dev-mode'
import * as React from 'react'
import testCases from 'jest-in-case'
import {
  jsx,
  css,
  Global,
  keyframes,
  CacheProvider,
  ClassNames
} from '@emotion/react'
import styled from '@emotion/styled'
import createCache from '@emotion/cache'
import { renderToString } from 'react-dom/server'
import HTMLSerializer from 'jest-serializer-html'
import createEmotionServer from '@emotion/server/create-instance'

expect.addSnapshotSerializer(HTMLSerializer)

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
      const animation = keyframes(css`
        from {
          color: green;
        }
        to {
          color: blue;
        }
      `)
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
    cache: () => createCache({ key: 'css', nonce: 'some-nonce' }),
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
    let cache = opts.cache ? opts.cache() : createCache({ key: 'css' })
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
