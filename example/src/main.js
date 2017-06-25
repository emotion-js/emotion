/* eslint-disable jsx-quotes,import/no-webpack-loader-syntax */
import './global.css'
import './dracula.css'
import React from 'react'
import { render } from 'react-dom'
import styled from 'emotion/styled'
import { css, fragment, keyframes } from 'emotion'
import ReactMarkdown from 'react-markdown'
import colors from 'open-color/open-color.json'
import Playground from './playground'

const componentExample = require('raw-loader!./blocks/basic.example')
const docMarkdown = require('raw-loader!./guides/index.md')
const readmeMarkdown = require('raw-loader!../../README.md')

const PlaygroundWrapper = styled('div')`
  flex:1;
  display:flex;
  flex-direction:column;
  color: attr(color, #000);
`

class App extends React.Component {
  render () {
    return (
      <PlaygroundWrapper>
        <Playground
          noRender={false}
          codeText={componentExample}
          scope={{
            React,
            css,
            keyframes,
            fragment,
            styled,
            colors,
            render,
            ReactMarkdown,
            docMarkdown: `${docMarkdown}\n*****\n${readmeMarkdown}`
          }}
        />
      </PlaygroundWrapper>
    )
  }
}

render(<App />, document.getElementById('app'))
