// @flow
/** @jsx jsx */
import { jsx } from '@emotion/react'
import '../utils/make-prism-manual'
import globalStyles from '../utils/global'
import * as React from 'react'
import Helmet from 'react-helmet'
import SiteHeader from '../components/SiteHeader'
import { constants, mq } from '../utils/style'
import Carbon from '../components/Carbon'
import { Global } from '@emotion/react'

const TemplateWrapper = ({
  children,
  sidebarOpen,
  title
}: {
  children: React.Node,
  sidebarOpen?: boolean,
  title: string
}) => {
  let space = constants.space
  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      <Helmet title={['Emotion', title].join(' - ')} />

      <div
        css={mq({
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: [
            '36px 1fr',
            '36px 1fr',
            'minmax(400px, 80%) 220px'
          ],
          gridTemplateRows: ['48px auto', '48px auto'],
          gridColumnGap: [space[2], space[3]],
          gridRowGap: sidebarOpen ? 0 : [space[2], space[2], space[3]],
          width: '100%',
          maxWidth: '64em',
          paddingTop: [space[2], space[2], space[2]],
          paddingBottom: [space[2], space[2], space[2]],
          paddingLeft: [space[2], space[2], space[3]],
          paddingRight: [space[2], space[2], space[3]],
          margin: '0 auto'
        })}
      >
        {!sidebarOpen && <SiteHeader />}
        {children}
        <Carbon
          // 64em is the maxWidth of the template wrapper, on top of that this needs at least 220px on both sides of that
          // which leads us to approximately minWidth of 92em
          mediaQuery="screen and (min-width: 92em)"
          css={{
            position: 'fixed',
            left: space[2],
            bottom: space[2],
            width: 220
          }}
        />
      </div>
    </React.Fragment>
  )
}

export default TemplateWrapper
