// @flow
import * as React from 'react'
import styled, { css } from 'react-emotion'
import Box from '../components/Box'
import { scope, Error } from '../components/Playground'
import { openColors, colors, constants } from '../utils/style'
import { GatsbyLink, Preview } from '../utils/demo-buttons'
import Live, {
  compile as _compile,
  Editor,
  ErrorBoundary,
} from '../components/live'
import Image from 'gatsby-image'

const Title = Box.withComponent('h1')
const Paragraph = Box.withComponent('p')

const scroll = css`
  overflow: scroll;
`
const textCenter = css`
  text-align: center;
`

const SelectButton = styled.button`
  ${textCenter};
  flex: 1;
  color: ${props => (props.active ? '#fff' : '#8d8e95')};
  padding: ${constants.space[1]}px;
  background-color: ${props => (props.active ? '#2e313a' : '#21242b')};
  border: 0;
`

type Props = {
  data: {
    imageSharp: *,
    allMarkdownRemark: *,
  },
}

const compile = code => _compile(`${code}\nrender(Link);`)

type State = {
  mode: 'string' | 'object',
  code: string,
}

class IndexPage extends React.Component<Props, State> {
  state = {
    mode: 'string',
    code: this.props.data.allMarkdownRemark.edges[0].node.hast.children[0]
      .children[0].value,
  }
  render() {
    const nodes = this.props.data.allMarkdownRemark.edges[0].node.hast.children
    const precompiledCode = nodes[0].properties.compiled + '\nrender(Link);'
    const stringCode = nodes[0].children[0].value
    const objectCode = nodes[2].children[0].value
    return (
      <Live
        scope={scope}
        initial={precompiledCode}
        compile={compile}
        code={this.state.code}
        render={({ error, code, onChange, element, onError }) => {
          return (
            <Box
              css={{ height: '100%', display: 'flex' }}
              bg={colors.dark}
              display="flex"
              flex={1}
              direction={['column', 'column', 'row']}
            >
              <Box flex={1.5} display="flex" justify="center" align="center">
                <Box color="white" flex={1} css={{ maxWidth: 600 }}>
                  <Box>
                    <div css={{ display: 'inline-block' }}>
                      <Image
                        alt="Emotion Avatar"
                        resolutions={this.props.data.imageSharp.resolutions}
                      />
                    </div>
                    <Title
                      display="inline-block"
                      fontSize={'1.6rem'}
                      m={'0 0 0 0.4rem'}
                      className={css`
                        font-weight: 700;
                        letter-spacing: 1px;
                      `}
                    >
                      emotion
                    </Title>
                    <Paragraph
                      css={{ fontWeight: 700, margin: '1em 0 0.5em 0' }}
                      fontSize={5}
                    >
                      The Next Generation of CSS-in-JS
                    </Paragraph>
                    <Paragraph
                      css={{ fontWeight: 300, lineHeight: '1.5rem' }}
                      fontSize={'1.15rem'}
                    >
                      Emotion is a performant and flexible CSS-in-JS library.
                      Building on many other CSS-in-JS libraries, it allows you
                      to style apps quickly with string or object styles. It has
                      predictable composition to avoid specificity issues with
                      CSS. With source maps and labels, Emotion has a great
                      developer experience and great performance with heavy
                      caching in production.
                    </Paragraph>
                    <ErrorBoundary onError={onError}>
                      {error ? null : (
                        <Preview
                          onError={onError}
                          Link={// $FlowFixMe
                          element.withComponent(GatsbyLink)}
                        />
                      )}
                    </ErrorBoundary>
                  </Box>
                </Box>
              </Box>

              <Box flex={1} display="flex" justify="center" align="center">
                <div
                  css={{
                    overflow: 'hidden',
                  }}
                >
                  <Box bg={openColors.gray[3]} display="flex">
                    <SelectButton
                      active={this.state.mode === 'string'}
                      onClick={() => {
                        onChange(stringCode)

                        this.setState({ mode: 'string' })
                      }}
                    >
                      String
                    </SelectButton>
                    <SelectButton
                      active={this.state.mode === 'object'}
                      onClick={() => {
                        onChange(objectCode)
                        this.setState({ mode: 'object' })
                      }}
                    >
                      Object
                    </SelectButton>
                  </Box>
                  <Editor
                    onChange={newCode => {
                      onChange(newCode)
                    }}
                    code={code}
                    css={scroll}
                  />
                  {error && (
                    <Box className={scroll} fontSize={1}>
                      <Error css={scroll}>{error.toString()}</Error>
                    </Box>
                  )}
                </div>
              </Box>
            </Box>
          )
        }}
      />
    )
  }
}

export const pageQuery = graphql`
  query EmotionAvatar {
    imageSharp {
      resolutions(width: 100, height: 100) {
        ...GatsbyImageSharpResolutions
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/homepage-buttons.md" } }
    ) {
      edges {
        node {
          hast
        }
      }
    }
  }
`

export default IndexPage
