/* eslint-disable jsx-quotes */
import './global.css'
import './main.js.css'
import './dracula.css'
import React from 'react'
import { render } from 'react-dom'
import { styled } from 'emotion'
import css, { fragment } from 'glam'
import colors from 'open-color/open-color.json'
import Playground from './playground'

// eslint-disable-next-line import/no-webpack-loader-syntax
const componentExample = require('raw-loader!./blocks/basic.example')

class App extends React.Component {
  render () {
    return (
      <div css={`flex:1;display:flex;flex-direction:column;`}>
        <Playground
          noRender={false}
          codeText={componentExample}
          scope={{ React, css, fragment, styled, colors, render }}
        />
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
