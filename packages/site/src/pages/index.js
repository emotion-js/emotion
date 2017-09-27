import React from 'react'
import styled, { css } from 'react-emotion'
import Box from '../components/Box'
import { LiveEditor, withLive, LiveProvider } from 'react-live/lib'
import GatsbyLink from 'gatsby-link'
import { scope, Error } from '../components/Playground'
import colors from 'open-color'

const Title = Box.withComponent('h1')
const Paragraph = Box.withComponent('p')

const code = `const Link = styled.a\`
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

let Link

const Preview = withLive(({ live: { element: BaseLink } }) => {
  try {
    Link = BaseLink.props.component.withComponent(GatsbyLink)
  } catch (e) {}
  return (
    <Box fontSize={2}>
      <Link to="/docs/install">Install</Link>
      <Link to="/docs" primary>
        Getting Started
      </Link>
    </Box>
  )
})

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

// make this a radio later or something
const SelectButton = styled.button`
  text-align: center;
  flex: 1;
  border: 0;
  color: white;
  background-color: ${colors.violet[8]};
`

class IndexPage extends React.Component {
  componentDidCatch(error) {
    console.error(error)
  }
  render() {
    const { props } = this
    const avatar = props.data.imageSharp.responsiveResolution

    return (
      <LiveProvider
        scope={scope}
        code={code}
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
              <Box bg={colors.gray[3]} css={{ height: 20 }} display="flex">
                <SelectButton>String</SelectButton>
                <SelectButton>Object</SelectButton>
              </Box>
              <LiveEditor css={scroll} />
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
