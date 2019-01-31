// @flow
import '../utils/make-prism-manual'
import globalStyles from '../utils/global'
import * as React from 'react'
import Link from '../components/Link'
import styled from '@emotion/styled'
import Box from '../components/Box'
import Helmet from 'react-helmet'
import Search from '../components/Search'
import { colors, constants, animatedUnderline } from '../utils/style'
import Image from 'gatsby-image'
import { Global } from '@emotion/core'
import { StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'

const HeaderLink = props => (
  <Link
    css={{
      fontSize: constants.fontSizes[2],
      fontWeight: '500',
      color: colors.color,
      textDecoration: 'none',
      '&:hover': { color: colors.border }
    }}
    {...props}
  />
)

const Header = () => (
  <div
    css={{
      gridColumn: 'span 2',
      display: 'grid',
      gridTemplateColumns: '.25fr 1fr',
      alignItems: 'center',
      justifyItems: 'center',
      gap: constants.space[2],
      paddingLeft: constants.space[3],
      paddingRight: constants.space[3],
      borderBottom: '2px solid',
      background: colors.parentBg,
      color: colors.color,
      borderColor: colors.border
    }}
  >
    <Link
      to="/"
      css={{
        display: 'flex',
        alignItems: 'center',
        color: '#D36AC2',
        textDecoration: 'none',
        '&:hover': { color: colors.border }
      }}
    >
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
      <h1
        css={{
          margin: 0,
          marginLeft: constants.space[2],
          padding: 0,
          fontSize: constants.fontSizes[4]
        }}
      >
        Emotion
      </h1>
    </Link>
    <div
      css={{
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        gap: constants.space[2],
        marginLeft: 'auto'
      }}
    >
      <HeaderLink activeClassName="active" to="/docs">
        Documentation
      </HeaderLink>
      <HeaderLink activeClassName="active" to="/community">
        Community
      </HeaderLink>
      <HeaderLink to="https://github.com/emotion-js/emotion">GitHub</HeaderLink>
      <HeaderLink to="https://emotion.now.sh">Slack</HeaderLink>
      <HeaderLink to="https://spectrum.chat/emotion">Spectrum</HeaderLink>
      <HeaderLink to="https://5bb1495273f2cf57a2cf39cc--emotion.netlify.com">
        v9 Docs
      </HeaderLink>
      <Search />
    </div>
  </div>
)

const TemplateWrapper = props => {
  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      <Helmet title="emotion" />
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gridTemplateRows: '72px auto'
        }}
      >
        <Header />
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default TemplateWrapper
