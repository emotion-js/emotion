// @flow
import '../utils/make-prism-manual'
import * as React from 'react'
import { Match } from '@reach/router'

import Link from '../components/Link'
import HeaderLogoImage from '../components/HeaderLogoImage'
import { animatedUnderline, colors, constants, mq } from '../utils/style'

const space = constants.space

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
    <div
      css={mq({
        gridColumn: '1 /span 2',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: space[2]
      })}
    >
      <Link
        to="/"
        css={{
          display: 'flex',
          alignItems: 'center',
          color: '#D36AC2',
          textDecoration: 'none',
          marginRight: space[2],
          '&:hover': { color: colors.border }
        }}
      >
        <HeaderLogoImage />
        <h1
          css={mq({
            display: ['none', 'none', 'inline-block'],
            margin: 0,
            marginLeft: space[2],
            padding: 0,
            fontSize: constants.fontSizes[4]
          })}
        >
          Emotion
        </h1>
      </Link>
      <div
        css={mq({
          display: 'grid',
          gridAutoFlow: ['column dense', undefined, 'column'],
          gridColumn: ['2 / span 1', undefined, 'auto'],
          gridRow: ['1', '1', 'auto'],
          alignItems: 'center',
          justifyItems: 'center',
          gap: space[2],
          marginLeft: ['auto'],
          overflow: ['auto', 'auto', 'auto']
        })}
      >
        <Match path="/docs/:docName">
          {({ match }: { match?: { docName: string } }) => {
            return (
              <HeaderLink
                className={match ? 'active' : ''}
                activeClassName="active"
                to="/docs"
              >
                Docs
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
        <HeaderLink to="https://emotion-slack.now.sh/">Slack</HeaderLink>
        <HeaderLink to="https://spectrum.chat/emotion">Spectrum</HeaderLink>
        <HeaderLink to="https://5bb1495273f2cf57a2cf39cc--emotion.netlify.com">
          v9 Docs
        </HeaderLink>
      </div>
    </div>
  )
}
