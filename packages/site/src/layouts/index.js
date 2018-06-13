// @flow
import '../utils/make-prism-manual'
import globalStyles from '../utils/global'
import React from 'react'
import Link from '../components/Link'
import styled from '@emotion/styled'
import Box from '../components/Box'
import Helmet from 'react-helmet'
import Search from '../components/Search'
import { colors, constants, animatedUnderline } from '../utils/style'
import Image from 'gatsby-image'
import type { Location, Match } from '../utils/types'
import { Global } from '@emotion/core'
import { StaticQuery } from 'gatsby'
import { Route } from 'react-router'

const StyledLink = styled(Box)`
  color: white;
  padding: ${constants.space[1]}px;
  font-size: ${constants.fontSizes[3]}px;
  text-decoration: none;
  font-weight: 300;
  ${props => !props.hideUnderline && animatedUnderline};
`.withComponent(({ hideUnderline, ...props }) => <Link {...props} />)

const StyledLinkSpan = StyledLink.withComponent('span')

const H1 = Box.withComponent('h1')

const Header = ({ isHome }) => (
  <React.Fragment>
    <Box
      bg={colors.dark}
      css={{
        transition: 'all 200ms ease'
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
            fontFamily: "'Oxygen', sans-serif"
          }}
          align="center"
        >
          <Link to="/" css={{ textDecoration: 'none', display: 'flex' }}>
            <StaticQuery
              query={graphql`
                query Avatar {
                  avatar: file(name: { eq: "emotion" }) {
                    childImageSharp {
                      resolutions(width: 36, height: 36) {
                        ...GatsbyImageSharpResolutions_withWebp_noBase64
                      }
                    }
                  }
                }
              `}
              render={({ avatar }) => {
                return (
                  <Image
                    css={{ display: 'inline-block', margin: 0, padding: 0 }}
                    height="36px"
                    width="36px"
                    resolutions={avatar.childImageSharp.resolutions}
                  />
                )
              }}
            />
            <H1 m={0} p={0} align="center" display={['none', 'inline-flex']}>
              <StyledLinkSpan
                hideUnderline
                css={{
                  flex: 1,
                  margin: 0,
                  letterSpacing: 0.8
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
          <Search />
          <StyledLink activeClassName="active" to="/docs">
            Documentation
          </StyledLink>
          <StyledLink activeClassName="active" to="/community">
            Community
          </StyledLink>
          <StyledLink to="https://github.com/emotion-js/emotion">
            GitHub
          </StyledLink>
          <StyledLink to="https://emotion.now.sh">Slack</StyledLink>
          <StyledLink to="https://spectrum.chat/emotion">Spectrum</StyledLink>
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
        zIndex: 50
      }}
    />
  </React.Fragment>
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
        <Header isHome={isHome} />
        {props.children}
      </BodyInner>
    </OuterGradientContainer>
  )
}

type TemplateWrapperProps = {
  children: (*) => React$Node,
  location: Location,
  match: Match
}

const TemplateWrapper = (props: TemplateWrapperProps) => {
  return (
    // $FlowFixMe
    <React.Fragment>
      <Global css={globalStyles} />
      <BaseWrapper location={props.location}>{props.children}</BaseWrapper>
    </React.Fragment>
  )
}

const OuterWrapper = (props: *) => {
  return (
    <Route
      render={routerProps => {
        return <TemplateWrapper {...routerProps} {...props} />
      }}
    />
  )
}

export default OuterWrapper
