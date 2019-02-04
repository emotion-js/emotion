// @flow
import '../utils/make-prism-manual'
import * as React from 'react'
import Link from '../components/Link'
import Search from '../components/Search'
import HeaderLogoImage from '../components/HeaderLogoImage'
import { animatedUnderline, colors, constants } from '../utils/style'
import { graphql, StaticQuery } from 'gatsby'
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

export default function SiteHeader() {
  return (
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
        <HeaderLogoImage />
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
        <HeaderLink to="https://github.com/emotion-js/emotion">
          GitHub
        </HeaderLink>
        <HeaderLink to="https://emotion.now.sh">Slack</HeaderLink>
        <HeaderLink to="https://spectrum.chat/emotion">Spectrum</HeaderLink>
        <HeaderLink to="https://5bb1495273f2cf57a2cf39cc--emotion.netlify.com">
          v9 Docs
        </HeaderLink>
        <Search />
      </div>
    </>
  )
}
