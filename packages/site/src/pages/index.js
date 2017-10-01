import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import Box from '../components/Box'
import { LiveEditor, withLive, LiveProvider } from 'react-live/lib'
import GatsbyLink from 'gatsby-link'
import { scope, Error } from '../components/Playground'
import { colors, constants } from '../utils/style'

const Title = Box.withComponent('h1')
const Paragraph = Box.withComponent('p')

const stringCode = `const Link = styled.a\`
  display: inline-block;
  border-radius: 8px;
  padding: 32px;
  margin: 32px;
  width: 12rem;
  background: darkorchid;
  text-decoration: none;
  color: white;
  \${props => props.primary && css\`
    background-color: darkturquoise;
  \`}
\``

const objectCode = `const Link = styled.a(props => ({
  display: 'inline-block',
  borderRadius: 8,
  padding: 32,
  margin: 32,
  width: '12rem',
  background: props.primary
    ? 'darkturquoise'
    : 'darkorchid',
  color: 'white',
  textDecoration: 'none'
}))
`
let Link
const Preview = withLive(({ live: { element: BaseLink, onError, error } }) => {
  try {
    Link = BaseLink.props.component.withComponent(GatsbyLink)
  } catch (e) {}
  return (
    <Box fontSize={2}>
      <ErrorBoundary onError={onError} error={error}>
        <Link to="/docs/install">Install</Link>
        <Link to="/docs" primary>
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

const scroll = css`overflow: scroll;`
const textCenter = css`text-align: center;`

const SelectButton = styled.button`
  text-align: center;
  flex: 1;
  color: white;
  padding: ${constants.space[1]}px;
  background-color: ${props => (props.active ? colors.violet[8] : '#1d1f21')};
  border: 0 solid ${colors.violet[8]};
  border-bottom-width: 4px;
  :hover {
    background-color: ${props =>
      props.active ? colors.violet[9] : colors.violet[7]};
  }
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
      >
        <div>
          <Box display="flex" justify="center" align="center">
            <img
              width="200px"
              height="200px"
              alt="Emotion Avatar"
              src={avatar.src}
              srcSet={avatar.srcSet}
            />
          </Box>
          <Title fontSize={8} mb={2} mt={0} css={textCenter}>
            emotion
          </Title>
          <Paragraph css={textCenter} fontSize={4}>
            The Next Generation of CSS-in-JS
          </Paragraph>
          <div css={textCenter}>
            <Preview />
          </div>
          <Box display="flex" justify="center" align="center">
            <div
              css={{
                width: 448,
                overflow: 'hidden',
                borderRadius: 8
              }}
            >
              <Box bg={colors.gray[3]} display="flex">
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
                  this.setState({ objectCode: code })
                }}
                css={scroll}
              />

              <LiveError css={scroll} />
            </div>
          </Box>
        </div>
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
