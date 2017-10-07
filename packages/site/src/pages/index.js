import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import Box from '../components/Box'
import { LiveEditor, withLive, LiveProvider } from 'react-live/lib'
import GatsbyLink from 'gatsby-link'
import { scope, Error } from '../components/Playground'
import { openColors, colors, constants } from '../utils/style'

const Title = Box.withComponent('h1')
const Paragraph = Box.withComponent('p')

const stringCode = `const Link = styled.a\`
  display: inline-block;
  border-radius: 5px;
  padding: 16px;
  margin: 1rem 0;
  width: 12rem;
  background: \${props =>
    props.primary &&
    'linear-gradient(90deg, #D26AC2, #46C9E5)'};
  text-decoration: none;
  color: \${props =>
    props.primary ? '#1D2029' : '#D26AC2'};
  &:hover {
    opacity: 0.95;
  }
\``

const objectCode = `const Link = styled.a(props => ({
  display: 'inline-block',
  borderRadius: 5,
  padding: 16,
  margin: '1rem 0',
  width: '12rem',
  background:
    props.primary &&
    'linear-gradient(90deg, #D26AC2, #46C9E5)',
  color: props.primary ? '#1D2029' : '#D26AC2',
  textDecoration: 'none'
}))`

let Link
const Preview = withLive(({ live: { element: BaseLink, onError, error } }) => {
  try {
    Link = BaseLink.props.component.withComponent(GatsbyLink)
  } catch (e) {}
  return (
    <Box fontSize={2}>
      <ErrorBoundary onError={onError} error={error}>
        <Link
          css={`font-weight: 800;`}
          className={textCenter}
          to="/docs/install"
          primary
        >
          Install
        </Link>
        <Link css={`margin-left: 20px;`} className={textCenter} to="/docs">
          Getting Started
        </Link>
      </ErrorBoundary>
    </Box>
  )
})

class ErrorBoundary extends Component {
  state = { error: false }
  componentDidCatch(err) {
    this.props.onError(err)
  }
  render() {
    if (this.props.error) {
      return null
    }
    return this.props.children
  }
}

const LiveError = withLive(
  props =>
    props.live.error ? (
      <Box fontSize={1}>
        <Error css={scroll}>{props.live.error}</Error>
      </Box>
    ) : null
)

const transform = code => `${code}\nrender(<div component={Link} />);`

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

class IndexPage extends React.Component {
  componentDidCatch(error) {
    console.error(error)
  }
  state = { mode: 'string', stringCode, objectCode }
  render() {
    const avatar = this.props.data.imageSharp.responsiveResolution

    return (
      <LiveProvider
        scope={scope}
        code={
          this.state.mode === 'object'
            ? this.state.objectCode
            : this.state.stringCode
        }
        noInline
        transformCode={transform}
        mountStylesheet={false}
        css={{ height: '100%', display: 'flex' }}
      >
        <Box
          bg={colors.dark}
          display="flex"
          flex={1}
          direction={['column', 'column', 'row']}
        >
          <Box flex={1.5} display="flex" justify="center" align="center">
            <Box color="white" flex={1} css={{ maxWidth: 600 }}>
              <Box>
                <img
                  width="100px"
                  height="100px"
                  alt="Emotion Avatar"
                  src={avatar.src}
                  srcSet={avatar.srcSet}
                />
                <Title
                  display="inline-block"
                  fontSize={'1.6rem'}
                  m={'0 0 0 0.4rem'}
                  className={css`
                    font-weight: 700;
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
                  {/* just putting this here until we write an up to date intro */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque condimentum urna imperdiet lectus convallis, quis
                  cursus nunc euismod. Sed at ornare mauris. Maecenas et orci
                  sed dolor commodo semper. Vestibulum mauris nibh, posuere a
                  ornare nec, rhoncus a magna. Sed non felis et lectus luctus
                  blandit nec lacinia quam.
                </Paragraph>
                <Preview />
              </Box>
            </Box>
          </Box>

          <Box flex={1} display="flex" justify="center" align="center">
            <div
              css={{
                width: 448,
                overflow: 'hidden'
              }}
            >
              <Box bg={openColors.gray[3]} display="flex">
                <SelectButton
                  active={this.state.mode === 'string'}
                  onClick={() => {
                    this.setState({ mode: 'string' })
                  }}
                >
                  String
                </SelectButton>
                <SelectButton
                  active={this.state.mode === 'object'}
                  onClick={() => {
                    this.setState({ mode: 'object' })
                  }}
                >
                  Object
                </SelectButton>
              </Box>
              <LiveEditor
                onChange={code => {
                  this.setState({ [`${this.state.mode}Code`]: code })
                }}
                css={scroll}
              />

              <LiveError css={scroll} />
            </div>
          </Box>
        </Box>
      </LiveProvider>
    )
  }
}

export const pageQuery = graphql`
  query EmotionAvatar {
    imageSharp {
      responsiveResolution(width: 200, height: 200) {
        src
        srcSet
      }
    }
  }
`

export default IndexPage
