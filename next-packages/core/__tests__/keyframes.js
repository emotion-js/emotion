// @flow
/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'
import { safeQuerySelector } from 'test-utils'
import cases from 'jest-in-case'
import * as renderer from 'react-test-renderer'
import createCache from '@emotion/cache'
import { Provider } from '@emotion/core'

cases(
  'keyframes',
  opts => {
    safeQuerySelector('head').innerHTML = ''
    let cache = createCache()
    expect(
      renderer
        .create(<Provider value={cache}>{opts.render()}</Provider>)
        .toJSON()
    ).toMatchSnapshot()
    expect(cache.sheet.tags.map(tag => tag.textContent || '')).toMatchSnapshot()
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
        let serialized = css({
          animation: `${animation} 1s`
        })
        console.log(serialized)

        return <div css={serialized}>{animation.name}</div>
      }
    }
  }
)
