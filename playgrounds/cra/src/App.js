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

const MyComponent9 = function MyComponent9() {
  return <div css={{ color: 'orchid' }}>Foobar</div>
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
    <MyComponent9 />
  </React.Fragment>
)

export default App
