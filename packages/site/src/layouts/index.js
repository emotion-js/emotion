import React from 'react'
import PropTypes from 'prop-types'
import Link from '../components/Link'
import styled, { fontFace, injectGlobal, css } from 'react-emotion'
import Box from '../components/Box'
import prismStyles from 'react-live/lib/constants/css'
import Helmet from 'react-helmet'
import 'normalize.css/normalize.css'
import DocWrapper from '../components/DocWrapper'
import { colors, constants } from '../utils/style'
import Image from 'gatsby-image'

injectGlobal(
  prismStyles.replace('prism-code', 'prism-code,pre[class*="language-"]')
)

injectGlobal`
html, body, #___gatsby {
  font-family: -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Roboto",
    "Roboto Light",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol";
  color: #FFFEFF;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  
}

pre[class*="language-"] {
  border-radius: 8px;
  overflow: scroll; 
}
.gatsy-highlight {
  overflow: hidden;
}
* {
  box-sizing: border-box;
}
`

fontFace`
  font-family: 'Oxygen';
  font-style: normal;
  font-weight: 400;
  src: local('Oxygen Regular'), local('Oxygen-Regular'), url(https://fonts.gstatic.com/s/oxygen/v6/qBSyz106i5ud7wkBU-FrPevvDin1pK8aKteLpeZ5c0A.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
`

const StyledLink = styled(Box)`
  color: white;
  padding: ${constants.space[1]}px;
  font-size: ${constants.fontSizes[3]}px;
  text-decoration: none;
  font-weight: 300;
  ${props =>
    !props.hideUnderline &&
    css`
      &::after {
        content: '';
        display: block;
        width: 100%;
        margin-top: 4px;
        height: 4px;
        transition: transform 250ms ease;
        transform: scaleX(0);
        background-color: hotpink;
      }
      &.active::after,
      &:hover::after {
        transform: scaleX(1);
      }
    `};
`.withComponent(({ hideUnderline, ...props }) => <Link {...props} />)

StyledLink.defaultProps = {
  activeClassName: 'active'
}

const Children = ({ children }) => children

const Header = ({ isHome, avatar }) => (
  <Children>
    <Box
      bg={colors.dark}
      p={2}
      css={{
        transition: 'all 200ms ease'
      }}
    >
      <Box display="flex" flex={1} justify="space-between">
        <Box
          flex={1}
          display="flex"
          css={{
            opacity: isHome ? 0 : 1,
            transition: 'opacity 200ms ease',
            fontFamily: "'Oxygen', sans-serif"
          }}
          align="center"
        >
          <Image
            css={{ display: 'inline-block', margin: 0, padding: 0 }}
            height="36px"
            width="36px"
            resolutions={avatar}
          />

          <h1 css={{ margin: 0, padding: 0, display: 'flex' }}>
            <StyledLink
              to="/"
              css={{
                flex: 1,
                margin: 0
              }}
              hideUnderline
            >
              emotion
            </StyledLink>
          </h1>
        </Box>
        <Box flex={1} display="flex" justify="flex-end" css={`overflow: auto;`}>
          <StyledLink to="/try">Try</StyledLink>
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
          !isHome && `linear-gradient(90deg, ${colors.pink}, ${colors.blue})`
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

const TemplateWrapper = props => {
  if (props.location.pathname.match(/\/docs\/.+/)) {
    return (
      <BaseWrapper
        avatar={props.data.avatar.resolutions}
        location={props.location}
      >
        <DocWrapper sidebarNodes={props.data.allFile.edges}>
          {props.children()}
        </DocWrapper>
      </BaseWrapper>
    )
  }
  return (
    <BaseWrapper
      avatar={props.data.avatar.resolutions}
      location={props.location}
    >
      <Box m={[1, 2]}>{props.children()}</Box>
    </BaseWrapper>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export const pageQuery = graphql`
  query TemplateQuery {
    allFile(filter: { extension: { eq: "md" } }) {
      edges {
        node {
          name
          childMarkdownRemark {
            frontmatter {
              title
            }
          }
        }
      }
    }
    avatar: imageSharp {
      resolutions(width: 36, height: 36) {
        ...GatsbyImageSharpResolutions
      }
    }
  }
`

export default TemplateWrapper
