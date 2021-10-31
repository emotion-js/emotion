// @flow
import * as React from 'react'
/** @jsx jsx */
import { Global, jsx, keyframes } from '@emotion/react'

let animation = keyframes({
  'from,to': {
    transform: 'scale(1)'
  },
  '50%': {
    transform: 'scale(0.5)'
  }
})

function Foobar() {
  function renderSpan() {
    return <span css={{ color: 'orchid' }}>Orchid2</span>
  }

  return (
    <div>
      <span css={{ color: 'orchid' }}>Orchid</span>
      {/* renderSpan() */}
    </div>
  )
}

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
    {/* <h1
      css={{
        color: 'hotpink'
      }}
    >
      wow, some hotpink text!!
      <span css={{ color: 'blue' }}>Blue</span>
    </h1> */}
    <Foobar />
  </React.Fragment>
)

export default App
