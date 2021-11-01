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

function MyComponent9() {
  function renderSpan() {
    return <span>Orchid2</span>
  }

  return (
    <div css={{ color: 'orchid' }}>
      {[1, 2, 3].map((_, i) => (
        <div key={i} css={{ background: 'red' }} />
      ))}
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
    <MyComponent9 />
  </React.Fragment>
)

export default App
