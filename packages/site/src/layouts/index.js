// @flow
import '../utils/global'
import React from 'react'
import Link from '../components/Link'
import styled from 'react-emotion'
import Box from '../components/Box'
import Helmet from 'react-helmet'
import DocWrapper from '../components/DocWrapper'
import { colors, constants, animatedUnderline } from '../utils/style'
import Image from 'gatsby-image'
import type { Location, Match } from '../utils/types'

const StyledLink = styled(Box)`
  color: white;
  padding: ${constants.space[1]}px;
  font-size: ${constants.fontSizes[3]}px;
  text-decoration: none;
  font-weight: 300;
  ${props => !props.hideUnderline && animatedUnderline};
`.withComponent(({ hideUnderline, ...props }) => <Link {...props} />)

const StyledLinkSpan = StyledLink.withComponent('span')

StyledLink.defaultProps = {
  activeClassName: 'active',
}

const Children = ({ children }) => children

const H1 = Box.withComponent('h1')

const Header = ({ isHome, avatar }) => (
  <Children>
    <Box
      bg={colors.dark}
      css={{
        transition: 'all 200ms ease',
      }}
    >
      <Box
        overflow={['auto', 'initial']}
        display="flex"
        flex={1}
        p={2}
        justify={'space-between'}
      >
        <Box
          flex={1}
          display="inline"
          css={{
            opacity: isHome ? 0 : 1,
            transition: 'opacity 200ms ease',
            fontFamily: "'Oxygen', sans-serif",
          }}
          align="center"
        >
          <Link to="/" css={{ textDecoration: 'none', display: 'flex' }}>
            <Image
              css={{ display: 'inline-block', margin: 0, padding: 0 }}
              height="36px"
              width="36px"
              resolutions={avatar}
            />
            <H1 m={0} p={0} align="center" display={['none', 'inline-flex']}>
              <StyledLinkSpan
                hideUnderline
                css={{
                  flex: 1,
                  margin: 0,
                  letterSpacing: 0.8,
                }}
              >
                emotion
              </StyledLinkSpan>
            </H1>
          </Link>
        </Box>
        <Box
          flex={1}
          display="flex"
          justify="flex-end"
          css={{ overflow: 'initial' }}
        >
          <StyledLink to="/docs">Documentation</StyledLink>
          <StyledLink to="https://github.com/emotion-js/emotion">
            GitHub
          </StyledLink>
          <StyledLink to="https://emotion.now.sh">Slack</StyledLink>
        </Box>
      </Box>
    </Box>
    <span
      css={{
        height: 4,
        transition: !isHome && 'transform 400ms ease',
        transitionDelay: '100ms',
        transformOrigin: 'left',
        transform: `scaleX(${isHome ? 0 : 1})`,
        background:
          !isHome && `linear-gradient(90deg, ${colors.pink}, ${colors.blue})`,
        zIndex: 100,
      }}
    />
  </Children>
)

const OuterGradientContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-height: 100%;
  background: linear-gradient(
    to bottom,
    ${colors.blue} 0%,
    ${colors.pink} 100%
  );
  transition: padding 200ms ease;
`

const BodyInner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: ${p => p.color};
  background: ${p => p.bg};
  border-radius: 2px;
`

const BaseWrapper = props => {
  const isHome = props.location.pathname === '/'
  return (
    <OuterGradientContainer p={isHome ? [1, 2] : 0}>
      <BodyInner
        bg={isHome ? '#1e2029' : '#FFFEFF'}
        color={isHome ? '#FFFEFF' : '#1e2029'}
      >
        <Helmet title="emotion" />
        <Header avatar={props.avatar} isHome={isHome} />
        {props.children}
      </BodyInner>
    </OuterGradientContainer>
  )
}

type SidebarNode = {
  node: {
    frontmatter: {
      title: string,
    },
    fields: {
      slug: string,
    },
  },
}

type TemplateWrapperProps = {
  children: (*) => React$Node,
  location: Location,
  match: Match,
  data: {
    avatar: {
      childImageSharp: {
        resolutions: Object,
      },
    },
    allMarkdownRemark: {
      edges: Array<SidebarNode>,
    },
  },
}

const TemplateWrapper = (props: TemplateWrapperProps) => {
  let children = <Box m={[1, 2]}>{props.children()}</Box>
  if (props.location.pathname.match(/\/docs.*/)) {
    children = (
      <DocWrapper sidebarNodes={props.data.allMarkdownRemark.edges}>
        {props.children({
          ...props,
          markdownNodes: props.data.allMarkdownRemark.edges,
        })}
      </DocWrapper>
    )
  }
  return (
    <BaseWrapper
      avatar={props.data.avatar.childImageSharp.resolutions}
      location={props.location}
    >
      {children}
    </BaseWrapper>
  )
}

export const pageQuery = graphql`
  query TemplateQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { glob: "**/docs/*.md" } }) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
    avatar: file(name: { eq: "emotion" }) {
      childImageSharp {
        resolutions(width: 36, height: 36) {
          ...GatsbyImageSharpResolutions_withWebp_noBase64
        }
      }
    }
  }
`

export default TemplateWrapper
