// @flow
import * as React from 'react'
/** @jsx jsx */
import { Global, jsx } from '@emotion/core'
import { createTheme } from '@emotion/theme'

let Theme = createTheme({ color: 'green' })

let Comp = Theme.consume((props, theme) => {
  return <div css={{ color: theme.color }}>content</div>
})

const App = () => (
  <React.Fragment>
    <Theme.Provider theme={{ color: 'blue' }}>
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
          color: 'hotpink'
        }}
      >
        wow, some hotpink text!!
        <Comp />
      </h1>
    </Theme.Provider>
  </React.Fragment>
)

export default App
