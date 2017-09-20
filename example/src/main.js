import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, withTheme } from 'theming'
import styled, {
  css,
  fontFace,
  keyframes,
  injectGlobal,
  merge
} from 'emotion/react'
import Markdown from './markdown'
import Playground from './playground'
import logoUrl from '../../emotion.png'

const introExample = require('./blocks/intro.example')
const propsExample = require('./blocks/props.example')
const nestedExample = require('./blocks/nested.example')
const mediaExample = require('./blocks/media.example')
const anyComponentExample = require('./blocks/styling-any-component.example')
const pseudoExample = require('./blocks/pseudo.example')
const keyframesExample = require('./blocks/keyframes.example')

const scope = {
  logoUrl,
  React,
  css,
  keyframes,
  styled,
  ThemeProvider,
  withTheme,
  merge
}

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
    margin-top: ${t};
    margin-right: ${r};
    margin-bottom: ${b};
    margin-left: ${l};
  `
}

const PlaygroundWrapper = styled('div')`
  font-family: 'Oxygen', sans-serif;
  flex: 1;
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
  render() {
    return (
      <ThemeProvider theme={theme}>
        <PlaygroundWrapper>
          <div className="inner">
            <div className="header">
              <h1>
                <img src={logoUrl} alt="emotion" />
                emotion
              </h1>
              <p>The Next Generation of CSS-in-JS</p>
            </div>
            <Playground codeText={introExample} scope={scope} />

            <Markdown markdown={require('../../docs/install.md')} />

            <Markdown markdown={require('../../docs/nested.md')} />
            <Playground
              maxHeight={180}
              codeText={nestedExample}
              scope={scope}
            />

            <Markdown markdown={require('../../docs/pseudo.md')} />
            <Playground
              maxHeight={220}
              codeText={pseudoExample}
              scope={scope}
            />

            <Markdown markdown={require('../../docs/media.md')} />
            <Playground maxHeight={220} codeText={mediaExample} scope={scope} />

            <Markdown
              markdown={require('../../docs/styling-any-component.md')}
            />
            <Playground
              maxHeight={220}
              codeText={anyComponentExample}
              scope={scope}
            />

            <Markdown markdown={require('../../docs/props.md')} />
            <Playground codeText={propsExample} scope={scope} />

            <Markdown markdown={require('../../docs/keyframes.md')} />
            <Playground
              maxHeight={600}
              codeText={keyframesExample}
              scope={scope}
            />

            <Markdown markdown={require('../../docs/composition.md')} />
            <Playground
              maxHeight={180}
              codeText={require('./blocks/composition.example')}
              scope={scope}
            />

            <Markdown markdown={require('../../docs/objects.md')} />
            <Playground
              maxHeight={180}
              codeText={require('./blocks/objects.example')}
              scope={scope}
            />

            <Markdown markdown={require('../../docs/styled-with-object.md')} />
            <Playground
              maxHeight={180}
              codeText={require('./blocks/styled-with-object.example')}
              scope={scope}
            />

            <Markdown markdown={require('../../docs/css-prop.md')} />
            <Playground
              maxHeight={180}
              codeText={require('./blocks/css-prop.example')}
              scope={scope}
            />

            <Markdown markdown={require('../../docs/theming.md')} />
            <Playground
              maxHeight={180}
              codeText={require('./blocks/theming.example')}
              scope={scope}
            />
          </div>
        </PlaygroundWrapper>
      </ThemeProvider>
    )
  }
}

render(<App />, document.getElementById('app'))
