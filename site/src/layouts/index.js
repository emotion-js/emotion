// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core'
import '../utils/make-prism-manual'
import globalStyles from '../utils/global'
import * as React from 'react'
import Helmet from 'react-helmet'
import SiteHeader from '../components/SiteHeader'
import { constants, mq } from '../utils/style'
import { Global } from '@emotion/core'

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
      </div>
    </React.Fragment>
  )
}

export default TemplateWrapper
