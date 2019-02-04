// @flow
import '../utils/make-prism-manual'
import globalStyles from '../utils/global'
import * as React from 'react'
import Helmet from 'react-helmet'
import SiteHeader from '../components/SiteHeader'
import { constants, mq } from '../utils/style'
import { Global } from '@emotion/core'

const TemplateWrapper = ({ data, children }) => {
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
        <SiteHeader />
        {children}
      </div>
    </React.Fragment>
  )
}

export default TemplateWrapper
