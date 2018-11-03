// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'

class Home extends React.Component<{}, { isBrowser: boolean }> {
  state = { isBrowser: false }
  componentDidMount() {
    this.setState({ isBrowser: true })
  }
  render() {
    return (
      <h1
        css={{
          color: 'hotpink',
          ':hover': {
            color: 'yellow'
          }
        }}
      >
        wow, some hotpink text!!
        {this.state.isBrowser && <div css={{ color: 'green' }}>wow</div>}
      </h1>
    )
  }
}

export default Home
