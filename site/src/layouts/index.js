// @flow
import '../utils/make-prism-manual'
import globalStyles from '../utils/global'
import * as React from 'react'
import Link from '../components/Link'
import Helmet from 'react-helmet'
import Search from '../components/Search'
import HeaderLogoImage from '../components/HeaderLogoImage'
import { colors, constants, animatedUnderline, mq } from '../utils/style'
import { Global } from '@emotion/core'
import { StaticQuery, graphql } from 'gatsby'
import { Match } from '@reach/router'

const HeaderLink = props => (
  <Link
    css={[
      {
        fontSize: constants.fontSizes[2],
        fontWeight: '500',
        color: colors.color
      },
      animatedUnderline
    ]}
    {...props}
  />
)

const Header = () => (
  <>
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
          return <HeaderLogoImage avatar={avatar} />
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
      <Match path="/docs/:docName">
        {({ match }: { match?: { docName: string } }) => {
          return (
            <HeaderLink
              className={match ? 'active' : ''}
              activeClassName="active"
              to="/docs"
            >
              Documentation
            </HeaderLink>
          )
        }}
      </Match>

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
  </>
)

const TemplateWrapper = props => {
  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      <Helmet title="emotion" />
      <div
        css={mq({
          display: 'grid',
          gridTemplateColumns: ['1fr', '275px 1fr'],
          gridTemplateRows: ['auto', '72px auto'],
          gridColumnGap: constants.space[2],
          gridRowGap: constants.space[2],
          paddingLeft: constants.space[3],
          paddingRight: constants.space[3],
          margin: '0 auto'
        })}
      >
        <Header />
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default TemplateWrapper
