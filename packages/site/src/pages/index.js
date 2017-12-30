// @flow
import * as React from 'react'
import styled, { css } from 'react-emotion'
import Box from '../components/Box'
import { LiveEditor, withLive, LiveProvider } from 'react-live/lib'
import _GatsbyLink from 'gatsby-link'
import { scope, Error } from '../components/Playground'
import { openColors, colors, constants } from '../utils/style'
import Image from 'gatsby-image'

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
  textDecoration: 'none',
  '&:hover': {
    opacity: '0.95'
  }
}))`

const GatsbyLink = ({ primary, ...props }) => <_GatsbyLink {...props} />

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
        <Link
          css={`margin-left: 20px;`}
          className={textCenter}
          to="/docs/introduction"
        >
          Getting Started
        </Link>
      </ErrorBoundary>
    </Box>
  )
})

class ErrorBoundary extends React.Component<{
  children: React.Node,
  error: *,
  onError: Error => void
}> {
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

type Props = {
  data: {
    imageSharp: *
  }
}

type State = {
  mode: 'string' | 'object',
  code: string
}

class IndexPage extends React.Component<Props, State> {
  state = { mode: 'string', code: stringCode }
  render() {
    return (
      <LiveProvider
        scope={scope}
        code={this.state.code}
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
                  Building on many other CSS-in-JS libraries, it allows you to
                  style apps quickly with string or object styles. It has
                  predictable composition to avoid specificity issues with CSS.
                  With source maps and labels, Emotion has a great developer
                  experience and great performance with heavy caching in
                  production.
                </Paragraph>
                <Preview />
              </Box>
            </Box>
          </Box>

          <Box flex={1} display="flex" justify="center" align="center">
            <div
              css={{
                overflow: 'hidden'
              }}
            >
              <Box bg={openColors.gray[3]} display="flex">
                <SelectButton
                  active={this.state.mode === 'string'}
                  onClick={() => {
                    this.setState({ code: stringCode, mode: 'string' })
                  }}
                >
                  String
                </SelectButton>
                <SelectButton
                  active={this.state.mode === 'object'}
                  onClick={() => {
                    this.setState({ code: objectCode, mode: 'object' })
                  }}
                >
                  Object
                </SelectButton>
              </Box>
              <LiveEditor
                onChange={code => {
                  this.setState({ code })
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
      resolutions(width: 100, height: 100) {
        ...GatsbyImageSharpResolutions
      }
    }
  }
`

export default IndexPage
