/* eslint-disable jsx-quotes,import/no-webpack-loader-syntax */
import './global.css'
import './dracula.css'
import React from 'react'
import { render } from 'react-dom'
import styled from 'emotion/styled'
import { css, fragment, keyframes, fontFace } from 'emotion'
import ReactMarkdown from 'react-markdown'
import colors from 'open-color/open-color.json'
import Playground from './playground'

const componentExample = require('raw-loader!./blocks/basic.example')
const docMarkdown = require('raw-loader!./guides/index.md')
const readmeMarkdown = require('raw-loader!../../README.md')

fontFace`
  font-family: 'Oxygen';
  font-style: normal;
  font-weight: 400;
  src: local('Oxygen Regular'), local('Oxygen-Regular'), url(https://fonts.gstatic.com/s/oxygen/v6/qBSyz106i5ud7wkBU-FrPevvDin1pK8aKteLpeZ5c0A.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
`

const PlaygroundWrapper = styled('div')`
  font-family: 'Oxygen', sans-serif;
  flex:1;
  display:flex;
  flex-direction:column;
  color: attr(color, #000);
  overflow: auto;
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
