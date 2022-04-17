/** @jsxImportSource @emotion/react */
import React from 'react'
import { Global } from '@emotion/react'

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
      <div css={{ color: 'orchid' }}>Some colored text</div>
    </div>
  )
}

export default App
