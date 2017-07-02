import './dracula.css'
import React from 'react'
import { render } from 'react-dom'
import styled from 'emotion/react'
import { css, fontFace, keyframes, injectGlobal } from 'emotion'
import Markdown from './markdown'
import Playground from './playground'
import logoUrl from '../../emotion.png'

const introExample = require('./blocks/intro.example')
const propsExample = require('./blocks/props.example')
const nestedExample = require('./blocks/nested.example')
const mediaExample = require('./blocks/media.example')
const pseudoExample = require('./blocks/pseudo.example')
const keyframesExample = require('./blocks/keyframes.example')
// const fontFaceExample = require('./blocks/font-face.example')
// const docMarkdown = require('./docs/index.md')
// const readmeMarkdown = require('../../README.md')
const avatarUrl = require('./avatar.jpg')

injectGlobal`
  html, body {
    font-family: -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Roboto",
      "Roboto Light",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";
    color: #495057;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
`

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
  color: attr(color, #343a40);
  background: #f8f9fa;
  
  & .inner {
    margin: 0 auto;
    width: calc(100% - 32px);
    max-width: 960px;
    
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
              css,
              React,
              styled,
              render
            }}
          />

          <Markdown markdown={require('../../docs/install.md')} />



          <Markdown markdown={require('../../docs/nested.md')} />
          <Playground
            maxHeight={180}
            noRender={false}
            codeText={nestedExample}
            scope={{
              avatarUrl,
              css,
              React,
              styled,
              render
            }}
          />

          <Markdown markdown={require('../../docs/pseudo.md')} />
          <Playground
            maxHeight={220}
            noRender={false}
            codeText={pseudoExample}
            scope={{
              avatarUrl,
              React,
              css,
              keyframes,
              styled,
              render
            }}
          />

          <Markdown markdown={require('../../docs/media.md')} />
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

          <Markdown markdown={require('../../docs/props.md')} />
          <Playground
            noRender={false}
            codeText={propsExample}
            scope={{
              avatarUrl,
              React,
              css,
              keyframes,
              styled,
              render
            }}
          />

          <Markdown markdown={require('../../docs/keyframes.md')} />
          <Playground
            maxHeight={600}
            noRender={false}
            codeText={keyframesExample}
            scope={{
              avatarUrl,
              React,
              css,
              keyframes,
              styled,
              render
            }}
          />

          {/* <Markdown markdown={require('./docs/font-face.md')}/> */}
          {/* <Playground */}
          {/* maxHeight={600} */}
          {/* noRender={false} */}
          {/* codeText={fontFaceExample} */}
          {/* scope={{ */}
          {/* avatarUrl, */}
          {/* React, */}
          {/* fontFace, */}
          {/* styled, */}
          {/* render */}
          {/* }} */}
          {/* /> */}

          <Markdown markdown={require('../../docs/composes.md')} />
          <Playground
            maxHeight={180}
            noRender={false}
            codeText={require('./blocks/composes.example')}
            scope={{
              avatarUrl,
              React,
              css,
              keyframes,
              styled,
              render
            }}
          />

          <Markdown markdown={require('../../docs/css-prop.md')}/>
          <Playground
            maxHeight={180}
            noRender={false}
            codeText={require('./blocks/css-prop.example')}
            scope={{
              avatarUrl,
              React,
              css,
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
