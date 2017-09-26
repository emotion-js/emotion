import React, { Component } from 'react'
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider
} from 'react-live/lib'
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
          <Box flex={1} css={{ height: '100%' }}>
            <LiveEditor css={{ overflow: 'auto' }} />
          </Box>
          <Box flex={1} m={2}>
            <LivePreview css={{ overflow: 'auto' }} />
            <LiveError css={{ backgroundColor: 'red', overflow: 'auto' }} />
          </Box>
        </Box>
      </LiveProvider>
    )
  }
}
