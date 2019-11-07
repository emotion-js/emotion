// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Component } from 'react'
import styled from '@emotion/styled'
import { StaticQuery, graphql } from 'gatsby'
import Live, { compile, Editor, ErrorBoundary } from './live'
import Box from '../components/Box'
import { openColors as colors, fonts } from '../utils/style'
import '../utils/highlight-css'

export const scope = {
  process: {
    env: {
      NODE_ENV: process.env.NODE_ENV
    }
  },
  require(moduleName: string) {
    switch (moduleName) {
      case 'emotion':
        return require('emotion')
      case '@emotion/cache':
        return require('@emotion/cache')
      case '@emotion/core':
        return require('@emotion/core')
      case '@emotion/styled':
        return require('@emotion/styled')
      case '@emotion/styled-base':
        return require('@emotion/styled-base')
      case '@emotion/css':
        return require('@emotion/css')
      case '@emotion/is-prop-valid':
        return require('@emotion/is-prop-valid')
      case 'emotion-theming':
        return require('emotion-theming')
      case 'facepaint':
        return require('facepaint')
      default:
        // eslint-disable-next-line no-throw-literal
        throw `Module "${moduleName}" not found`
    }
  }
}

// $FlowFixMe(flow@0.100.0): tagged templates don't support generics
export const Error = styled.pre`
  background-color: ${colors.red[8]};
  overflow: auto;
  padding: 16px;
  height: 100%;
  width: 100%;
  color: white;
  margin: 0;
`

type Props = {
  code: string,
  className?: string,
  editorClassName?: string,
  initialCompiledCode: string
}

export default class Playground extends Component<Props> {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            avatar: file(name: { eq: "emotion" }) {
              childImageSharp {
                resolutions(width: 96, height: 96) {
                  src
                }
              }
            }
          }
        `}
        render={data => {
          let logoUrl = data.avatar.childImageSharp.resolutions.src
          return (
            <Live
              scope={{ ...scope, logoUrl }}
              code={this.props.code}
              initial={this.props.initialCompiledCode}
              compile={compile}
              render={({ error, onChange, onError, element, code }) => {
                return (
                  <Box
                    className={this.props.className}
                    display="flex"
                    direction={['column', 'row']}
                    css={{
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
                      <Editor
                        code={code}
                        onChange={onChange}
                        css={{
                          overflow: 'auto',
                          height: '100%',
                          borderRadius: 0
                        }}
                        className={this.props.editorClassName}
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
                      <ErrorBoundary onError={onError}>
                        {error ? (
                          <Error>{error.toString()}</Error>
                        ) : (
                          <div
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
                          >
                            {element}
                          </div>
                        )}
                      </ErrorBoundary>
                    </Box>
                  </Box>
                )
              }}
            />
          )
        }}
      />
    )
  }
}
