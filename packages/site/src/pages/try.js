import React, { Component } from 'react'
import { LiveEditor, LivePreview, LiveProvider, withLive } from 'react-live/lib'
import styled, { css, keyframes, merge } from 'react-emotion'
import Box from '../components/Box'

const code = `const SomeComponent = styled.div\`
  background-color: hotpink;
\`;
render(<SomeComponent>Some Text</SomeComponent>)
`

const scope = {
  css,
  keyframes,
  styled,
  merge
}

const Error = styled.pre`
  background-color: #d21f1f;
  overflow: auto;
  padding: 16px;
  height: 100%;
  color: white;
  margin: 0;
`

const Preview = withLive(
  ({ live, ...props }) =>
    live.error ? (
      <Error {...props}>{live.error}</Error>
    ) : (
      <LivePreview css={{ overflow: 'auto', padding: 8 }} />
    )
)

export default class Try extends Component {
  render() {
    return (
      <LiveProvider noInline scope={scope} code={code}>
        <Box
          display="flex"
          direction={['column', 'row']}
          css={{
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow:
              '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)'
          }}
        >
          <Box
            flex={1}
            css={{
              overflow: 'hidden',
              minHeight: '100%'
            }}
            fontSize={1}
          >
            <LiveEditor css={{ overflow: 'auto', height: '100%' }} />
          </Box>
          <Box
            flex={1}
            css={{
              overflow: 'hidden',
              minHeight: '100%'
            }}
          >
            <Preview />
          </Box>
        </Box>
      </LiveProvider>
    )
  }
}
