// @flow
import * as React from 'react'
/** @jsx jsx */
import { Global, jsx, keyframes } from '@emotion/core'

let animation = keyframes({
  'from,to': {
    transform: 'scale(1)'
  },
  '50%': {
    transform: 'scale(0.5)'
  }
})

const App = () => (
  <React.Fragment>
    <Global
      styles={{
        body: {
          padding: 0,
          margin: 0,
          fontFamily: 'sans-serif'
        }
      }}
    />
    <h1
      css={{
        color: 'hotpink',
        animation: `${animation} 1s infinite`
      }}
    >
      wow, some hotpink text!!
    </h1>
  </React.Fragment>
)

export default App
