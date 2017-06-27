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
import Logo from './components/logo'
import logoUrl from '../../emotion.png'

const introExample = require('raw-loader!./blocks/intro.example')
const propsExample = require('raw-loader!./blocks/props.example')
const nestedExample = require('raw-loader!./blocks/nested.example')
const mediaExample = require('raw-loader!./blocks/media.example')
const docMarkdown = require('raw-loader!./guides/index.md')
const readmeMarkdown = require('raw-loader!../../README.md')
const avatarUrl = require('./avatar.jpg')

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
  color: attr(color, #000);
  background: #212529;
  color: #ffd43b;
  
  & .inner {
    max-width: 960px;
    margin: 0 auto;
  }
  
  & .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    
    & img {
      display: block;
      width: 128px;
      height: 128px;
    }
  }
`

class App extends React.Component {
  render () {
    return (
      <PlaygroundWrapper>
        <div className="inner">
          <div className="header">
            <h1>
              <img src={logoUrl} alt="emotion" />

              emotion
            </h1>
            <p>high performance js for your css</p>
          </div>

          <Playground
            noRender={false}
            codeText={introExample}
            scope={{
              avatarUrl,
              React,
              styled,
              render
            }}
          />

          <Playground
            maxHeight={180}
            noRender={false}
            codeText={nestedExample}
            scope={{
              avatarUrl,
              React,
              styled,
              render
            }}
          />

          <Playground
            maxHeight={220}
            noRender={false}
            codeText={mediaExample}
            scope={{
              avatarUrl,
              React,
              styled,
              render
            }}
          />

          <Playground
            noRender={false}
            codeText={propsExample}
            scope={{
              avatarUrl,
              React,
              styled,
              render
            }}
          />
        </div>

      </PlaygroundWrapper>
    )
  }
}

render(<App />, document.getElementById('app'))
