// @flow
import * as React from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { Global } from '@emotion/react'
import Home from './Home'

const App = () => (
  <>
    <Global
      styles={{
        body: {
          padding: 0,
          margin: 0,
          fontFamily: 'sans-serif'
        }
      }}
    />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </>
)

export default App
