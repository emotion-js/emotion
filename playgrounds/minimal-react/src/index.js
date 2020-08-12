import React from 'react'
import ReactDOM from 'react-dom'
import Greeting from './Greeting'

const App = () => {
  return (
    <div>
      <h1>Minimal React</h1>
      <Greeting message="Hello" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app-root'))
