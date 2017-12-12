// @flow
import React, { Component } from 'react'
import { LiveEditor, LivePreview, LiveProvider, withLive } from 'react-live/lib'
import styled from 'react-emotion'
import { ThemeProvider, withTheme } from 'emotion-theming'
import Box from '../components/Box'
import { openColors as colors, fonts } from '../utils/style'
import '../utils/highlight-css'
import * as emotion from 'emotion'

export const scope = {
  ...emotion,
  styled,
  ThemeProvider,
  withTheme,
  require(moduleName: string) {
    switch (moduleName) {
      case 'emotion':
        return require('emotion')
      case 'react-emotion':
      case 'preact-emotion':
        return require('react-emotion')
      case 'emotion-theming':
        return require('emotion-theming')
      case 'recompose/withProps':
        return require('recompose/withProps')
      case 'facepaint':
        return require('facepaint')
      default:
        // eslint-disable-next-line no-throw-literal
        throw `Module "${moduleName}" not found`
    }
  }
}

export const Error = styled.pre`
  background-color: ${colors.red[8]};
  overflow: auto;
  padding: 16px;
  height: 100%;
  width: 100%;
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
          background: 'transparent',
          padding: 8,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: fonts.primary
        }}
      />
    )
)

type Props = {
  code: string,
  logoUrl: string,
  className?: string
}

export default class Playground extends Component<Props> {
  render() {
    return (
      <LiveProvider
        noInline
        scope={{ ...scope, logoUrl: this.props.logoUrl }}
        code={this.props.code}
        mountStylesheet={false}
      >
        <Box
          className={this.props.className}
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
            <LiveEditor
              css={{ overflow: 'auto', height: '100%', borderRadius: 0 }}
            />
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
