// @flow
import '../utils/make-prism-manual'
import globalStyles from '../utils/global'
import * as React from 'react'
import Helmet from 'react-helmet'
import SiteHeader from '../components/SiteHeader'
import { constants, mq } from '../utils/style'
import { Global } from '@emotion/core'

const TemplateWrapper = ({ data, children, sidebarOpen }) => {
  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      <Helmet title="emotion" />
      <div
        css={mq({
          display: 'grid',
          gridTemplateColumns: [
            '36px 1fr',
            '36px 1fr',
            '220px minmax(220px, calc(64em - 220px - 64px))'
          ],
          // width: ['100%', '100%', 'auto'],
          gridTemplateRows: ['auto', '72px auto'],
          gridColumnGap: [constants.space[2], constants.space[3]],
          gridRowGap: sidebarOpen
            ? 0
            : [constants.space[2], constants.space[3]],
          paddingTop: [constants.space[2], constants.space[2], 0],
          paddingBottom: [constants.space[2], constants.space[2], 0],
          paddingLeft: [
            constants.space[2],
            constants.space[2],
            constants.space[3]
          ],
          paddingRight: [
            constants.space[2],
            constants.space[2],
            constants.space[3]
          ],
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
