import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, withTheme } from 'theming'
import styled, {
  css,
  fontFace,
  keyframes,
  injectGlobal,
  merge
} from 'react-emotion'
import Markdown from './markdown'
import Playground from './playground'
import logoUrl from '../../../emotion.png'

const introExample = require('./blocks/intro.example')

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
`

const headerClassName = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  '& img': {
    display: 'block',
    width: 128,
    height: 128
  }
})

const docs = [
  { name: 'install', hasCodeExample: false },
  { name: 'nested', hasCodeExample: true },
  { name: 'pseudo', hasCodeExample: true },
  { name: 'media', hasCodeExample: true },
  { name: 'styling-any-component', hasCodeExample: true },
  { name: 'styled-with-component', hasCodeExample: true },
  { name: 'props', hasCodeExample: true },
  { name: 'keyframes', hasCodeExample: true },
  { name: 'composition', hasCodeExample: true },
  { name: 'objects', hasCodeExample: true },
  { name: 'styled-with-object', hasCodeExample: true },
  { name: 'css-prop', hasCodeExample: true },
  { name: 'theming', hasCodeExample: true },
  { name: 'source-maps', hasCodeExample: false }
]

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <PlaygroundWrapper>
          <div className="inner">
            <div className={headerClassName}>
              <h1>
                <img src={logoUrl} alt="emotion" />
                emotion
              </h1>
              <p css={{ fontSize: '1.5em' }}>
                The Next Generation of CSS-in-JS
              </p>
            </div>
            <Playground codeText={introExample} scope={scope} />

            {docs.map(doc => {
              return [
                <Markdown markdown={require(`../../../docs/${doc.name}.md`)} />,
                doc.hasCodeExample && (
                  <Playground
                    name={doc}
                    codeText={require(`./blocks/${doc.name}.example`)}
                    scope={scope}
                  />
                )
              ]
            })}
          </div>
        </PlaygroundWrapper>
      </ThemeProvider>
    )
  }
}

render(<App />, document.getElementById('app'))
