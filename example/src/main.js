/* eslint-disable jsx-quotes,import/no-webpack-loader-syntax */
import './global.css'
import './main.js.css'
import './dracula.css'
import React from 'react'
import { render } from 'react-dom'
import { styled } from 'emotion'
import css, { fragment } from 'glam'
import ReactMarkdown from 'react-markdown'
import colors from 'open-color/open-color.json'
import Playground from './playground'

const componentExample = require('raw-loader!./blocks/basic.example')
const docMarkdown = require('raw-loader!../../docs/index.md')

class App extends React.Component {
  render () {
    return (
      <div css={`flex:1;display:flex;flex-direction:column;`}>
        <Playground
          noRender={false}
          codeText={componentExample}
          scope={{
            React,
            css,
            fragment,
            styled,
            colors,
            render,
            ReactMarkdown,
            docMarkdown
          }}
        />
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
