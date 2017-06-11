/* eslint-disable jsx-quotes */
import './global.css'
import './main.js.css'
import './dracula.css'
import React from 'react'
import { findDOMNode, render } from 'react-dom'
import { styled } from 'emotion'
import css, { fragment } from 'glam'
import colors from 'open-color/open-color.json'
import Playground from './playground'

const componentExample = require('raw-loader!./blocks/basic.example')

const Header = styled('header')`
  flex: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;
`

const Banner = styled('h1')`
  margin: 16px 0px;
  font-size: 2rem;
  font-family: sans-serif;
  text-decoration: none;
`

const HeaderLink = styled('a')`
  color: ${colors.green[4]};
  margin-left: auto;
  text-decoration: none;
  &:hover {
    color: ${colors.green[8]};
  }
`

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
