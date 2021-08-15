import App from './App'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import * as React from 'react'
import { hydrate } from 'react-dom'

let root = document.getElementById('root')

if (!root) {
  throw new Error('Cannot find root element')
}

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
)

if (module.hot) {
  module.hot.accept()
}
