import React from 'react'
import { render } from 'react-dom'
import styled, { ThemeProvider } from 'emotion/react'
import { css, fontFace, keyframes, injectGlobal } from 'emotion'
import Markdown from './markdown'
import Playground from './playground'
import logoUrl from '../../emotion.png'

const introExample = require('./blocks/intro.example')
const propsExample = require('./blocks/props.example')
const nestedExample = require('./blocks/nested.example')
const mediaExample = require('./blocks/media.example')
const anyComponentExample = require('./blocks/styling-any-component.example')
const namedExample = require('./blocks/named.example')
const pseudoExample = require('./blocks/pseudo.example')
const keyframesExample = require('./blocks/keyframes.example')
// const fontFaceExample = require('./blocks/font-face.example')
// const docMarkdown = require('./docs/index.md')
// const readmeMarkdown = require('../../README.md')
const avatarUrl = require('../../emotion.png')


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

const theme = {
  white: '#f8f9fa',
  purple: '#8c81d8',
  gold: '#ffd43b'
}

const PlaygroundWrapper = styled('div')`
  font-family: 'Oxygen', sans-serif;
  flex:1;
  color: #343a40;
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


const cssA = css`
  color: green;
`

const cssB = css`
  color: red;
  font-size: 48px;
`

const cssC = css`
  color: yellow;
`

const cssD = css`
  color: rebeccapurple;
  font-size: 48px;
`

const BlueH1 = styled('h1')`
  color: ${'blue'};
`

const RedH1 = styled('h1')`
  color: ${'red'};
`

const FinalH2 = styled('h2')`
  composes: ${cssD} ${cssA} ${cssB} ${cssC};
`

// const Avatar = styled('div')`
//   composes: ${prettyStyles} ${blue};
//
//   &:hover > ${Image} {
//     width: 96px;
//     height: 96px;
//     borderRadius: 50%;
//   }
// `

class App extends React.Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <PlaygroundWrapper background="#f8f9fa">
          <FinalH2 pink>Hello</FinalH2>
        </PlaygroundWrapper>
      </ThemeProvider>
    )
  }
}

render(<App />, document.getElementById('app'))
