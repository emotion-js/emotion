import './legacy.css'
import './main.js.css'
import React from 'react'
import { render } from 'react-dom'
import css, { fragment } from 'glam'

function Profile ({ name, color }) {
  return (
    <h1
      className="old-legacy-className"
      css={`
        color: ${color};
        font-size: 128px;
      `}
    >
      Hello {name}
    </h1>
  )
}

render(<Profile name="Dave" color="#4263eb" />, document.getElementById('app'))
