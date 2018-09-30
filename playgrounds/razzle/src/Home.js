// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'

class Home extends React.Component<{}> {
  render() {
    return (
      <h1
        css={{
          color: 'hotpink'
        }}
      >
        wow, some hotpink text!!
      </h1>
    )
  }
}

export default Home
