// @flow
import * as React from 'react'
import { render } from 'react-dom'
import App from './App'

let root = document.getElementById('root')

if (!root) {
  throw new Error('could not find root element')
}

render(<App />, root)
