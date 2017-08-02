import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'emotion/react/theming'
import styled, { css, fontFace, keyframes, injectGlobal } from 'emotion/react'
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

const margin = (t, r, b, l) => {
  return () => css`
    margin-top: ${t}
    margin-right: ${r}
    margin-bottom: ${b}
    margin-left: ${l}
  `
}

const PlaygroundWrapper = styled('div')`
  font-family: 'Oxygen', sans-serif;
  flex:1;
  color: #343a40;
  background: #f8f9fa;
  
  & .inner {
    ${margin(0, 'auto', 0, 'auto')};
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
      <ThemeProvider theme={theme}>
        <PlaygroundWrapper>

          <div className='inner'>
            <div className='header'>
              <h1>
                <img src={logoUrl} alt='emotion' />

                emotion
              </h1>
              <p>The Next Generation of CSS-in-JS</p>
            </div>

            <Playground
              noRender={false}
              codeText={introExample}
              scope={{
                logoUrl,
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
                logoUrl,
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
                logoUrl,
                React,
                css,
                keyframes,
                styled,
                render,
                ThemeProvider
              }}
            />

            <Markdown markdown={require('../../docs/media.md')} />
            <Playground
              maxHeight={220}
              noRender={false}
              codeText={mediaExample}
              scope={{
                logoUrl,
                React,
                styled,
                render
              }}
            />

            <Markdown
              markdown={require('../../docs/styling-any-component.md')}
            />
            <Playground
              maxHeight={220}
              noRender={false}
              codeText={anyComponentExample}
              scope={{
                logoUrl,
                React,
                css,
                keyframes,
                styled,
                render,
                ThemeProvider
              }}
            />

            <Markdown markdown={require('../../docs/props.md')} />
            <Playground
              noRender={false}
              codeText={propsExample}
              scope={{
                logoUrl,
                React,
                css,
                keyframes,
                styled,
                render,
                ThemeProvider
              }}
            />

            <Markdown markdown={require('../../docs/keyframes.md')} />
            <Playground
              maxHeight={600}
              noRender={false}
              codeText={keyframesExample}
              scope={{
                logoUrl,
                React,
                css,
                keyframes,
                styled,
                render,
                ThemeProvider
              }}
            />

            {/* <Markdown markdown={require('./docs/font-face.md')}/> */}
            {/* <Playground */}
            {/* maxHeight={600} */}
            {/* noRender={false} */}
            {/* codeText={fontFaceExample} */}
            {/* scope={{ */}
            {/* logoUrl, */}
            {/* React, */}
            {/* fontFace, */}
            {/* styled, */}
            {/* render */}
            {/* }} */}
            {/* /> */}

            <Markdown markdown={require('../../docs/theming.md')} />
            <Playground
              maxHeight={180}
              noRender={false}
              codeText={require('./blocks/theming.example')}
              scope={{
                logoUrl,
                React,
                css,
                keyframes,
                styled,
                render,
                ThemeProvider
              }}
            />

            <Markdown markdown={require('../../docs/composes.md')} />
            <Playground
              maxHeight={180}
              noRender={false}
              codeText={require('./blocks/composes.example')}
              scope={{
                logoUrl,
                React,
                css,
                keyframes,
                styled,
                render,
                ThemeProvider
              }}
            />

            <Markdown markdown={require('../../docs/objects.md')} />
            <Playground
              maxHeight={180}
              noRender={false}
              codeText={require('./blocks/objects.example')}
              scope={{
                logoUrl,
                React,
                css,
                keyframes,
                styled,
                render,
                ThemeProvider
              }}
            />

            <Markdown markdown={require('../../docs/styled-with-object.md')} />
            <Playground
              maxHeight={180}
              noRender={false}
              codeText={require('./blocks/styled-with-object.example')}
              scope={{
                logoUrl,
                React,
                css,
                styled,
                render
              }}
            />

            <Markdown markdown={require('../../docs/css-prop.md')} />
            <Playground
              maxHeight={180}
              noRender={false}
              codeText={require('./blocks/css-prop.example')}
              scope={{
                logoUrl,
                React,
                css,
                styled,
                render
              }}
            />

            <Markdown markdown={require('../../docs/named.md')} />
            <Playground
              maxHeight={220}
              noRender={false}
              codeText={namedExample}
              scope={{
                logoUrl,
                React,
                css,
                keyframes,
                styled,
                render,
                ThemeProvider
              }}
            />
          </div>

        </PlaygroundWrapper>
      </ThemeProvider>
    )
  }
}

render(<App />, document.getElementById('app'))
