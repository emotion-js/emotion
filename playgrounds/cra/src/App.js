/** @jsx jsx */
import React from 'react'
import { Global, jsx } from '@emotion/react'

function MyComponent9() {
  return <div css={{ color: 'red' }} />
}

function App() {
  return (
    <div>
      <Global
        styles={{
          body: {
            padding: '2rem',
            fontFamily: 'sans-serif'
          },
          h1: {
            marginTop: 0
          }
        }}
      />

      <h1>CRA Playground</h1>
      <MyComponent9 />
      {/* <div css={{ color: 'orchid' }}>Some colored text</div> */}
    </div>
  )
}

export default App
