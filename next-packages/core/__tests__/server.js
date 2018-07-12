/** @jsx jsx
 * @jest-environment node
 */
// @flow
import 'test-utils/dev-mode'
import * as React from 'react'
import cases from 'jest-in-case'
import { jsx, Global, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import css from '@emotion/css'
import { renderToString } from 'react-dom/server'
import HTMLSerializer from 'jest-serializer-html'

expect.addSnapshotSerializer(HTMLSerializer)

cases(
  'ssr',
  opts => {
    expect(renderToString(opts.render())).toMatchSnapshot()
  },
  {
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
            <div
              css={[{ animation: `1s ${animation.name}` }, animation.styles]}
            />
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
    }
  }
)
