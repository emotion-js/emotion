/* eslint-disable jsx-quotes,import/no-webpack-loader-syntax */
import './global.css'
import './dracula.css'
import React from 'react'
import { render } from 'react-dom'
import styled from 'emotion/styled'
import { fontFace, fragment, keyframes } from 'emotion'
import Markdown from './components/markdown'
import Playground from './playground'
import logoUrl from '../../emotion.png'

const introExample = require('raw-loader!./blocks/intro.example')
const propsExample = require('raw-loader!./blocks/props.example')
const nestedExample = require('raw-loader!./blocks/nested.example')
const mediaExample = require('raw-loader!./blocks/media.example')
const pseudoExample = require('raw-loader!./blocks/pseudo.example')
const keyframesExample = require('raw-loader!./blocks/keyframes.example')
const fontFaceExample = require('raw-loader!./blocks/font-face.example')
// const docMarkdown = require('raw-loader!./guides/index.md')
// const readmeMarkdown = require('raw-loader!../../README.md')
const avatarUrl = require('./avatar.jpg')

fontFace`
  font-family: 'Oxygen';
  font-style: normal;
  font-weight: 400;
  src: local('Oxygen Regular'), local('Oxygen-Regular'), url(https://fonts.gstatic.com/s/oxygen/v6/qBSyz106i5ud7wkBU-FrPevvDin1pK8aKteLpeZ5c0A.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
`

const innerContent = fragment`
  margin: 0 auto;
  width: calc(100% - 32px);
  max-width: 960px;
`

const PlaygroundWrapper = styled('div')`
  font-family: 'Oxygen', sans-serif;
  flex:1;
  color: attr(color, #343a40);
  background: #f8f9fa;
  
  & .inner {
    @apply ${innerContent};
    
    @media (min-width: 960px) {
      width: 100%;
    }
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

          <Markdown markdown={require('raw-loader!./guides/install.md')} />

          <Markdown markdown={require('raw-loader!./guides/nested.md')} />
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

          <Markdown markdown={require('raw-loader!./guides/pseudo.md')} />
          <Playground
            maxHeight={220}
            noRender={false}
            codeText={pseudoExample}
            scope={{
              avatarUrl,
              React,
              styled,
              render
            }}
          />

          <Markdown markdown={require('raw-loader!./guides/media.md')} />
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

          <Markdown markdown={require('raw-loader!./guides/props.md')} />
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

          <Markdown markdown={require('raw-loader!./guides/keyframes.md')} />
          <Playground
            maxHeight={600}
            noRender={false}
            codeText={keyframesExample}
            scope={{
              avatarUrl,
              React,
              keyframes,
              styled,
              render
            }}
          />

          {/*<Markdown markdown={require('raw-loader!./guides/font-face.md')}/>*/}
          {/*<Playground*/}
            {/*maxHeight={600}*/}
            {/*noRender={false}*/}
            {/*codeText={fontFaceExample}*/}
            {/*scope={{*/}
              {/*avatarUrl,*/}
              {/*React,*/}
              {/*fontFace,*/}
              {/*styled,*/}
              {/*render*/}
            {/*}}*/}
          {/*/>*/}
        </div>

      </PlaygroundWrapper>
    )
  }
}

render(<App />, document.getElementById('app'))
