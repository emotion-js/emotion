import React, { Component } from 'react'
import { LiveEditor, LivePreview, LiveProvider, withLive } from 'react-live/lib'
import styled, { css, keyframes, merge } from 'react-emotion'
import { ThemeProvider, withTheme } from 'emotion-theming'
import Box from '../components/Box'
import colors from 'open-color'
import '../utils/highlight-css'
import logoUrl from '../assets/logo.png'

export const scope = {
  logoUrl,
  // React,
  css,
  keyframes,
  styled,
  // ThemeProvider,
  // withTheme,
  merge
}

export const Error = styled.pre`
  background-color: ${colors.red[8]};
  overflow: auto;
  padding: 16px;
  height: 100%;
  color: white;
  margin: 0;
`

export const Preview = withLive(
  ({ live, ...props }) =>
    live.error ? (
      <Error {...props}>{live.error}</Error>
    ) : (
      <LivePreview
        css={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          padding: 8,
          minHeight: '100%'
        }}
      />
    )
)

export default class Playground extends Component {
  render() {
    return (
      <LiveProvider
        noInline
        scope={scope}
        code={this.props.code}
        mountStylesheet={false}
      >
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
            display="flex"
            justify="center"
            align="center"
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
