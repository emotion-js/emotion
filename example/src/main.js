import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'emotion/react/theming'
import styled, { css } from 'emotion/react'
import Markdown from './markdown'
import Playground from './playground'
import logoUrl from '../../emotion.png'


const cssA = css`
      color: green;
    `

const cssB = css`
      composes: ${cssA}
      color: red;
      font-size: 48px;
    `

const BlueH1 = styled('h1')`
  composes: ${cssB};
  color: blue;
`

const FinalH2 = styled(BlueH1)`
  font-size:32px;
  color: ${p => p.block ? '#EA33C3' : '#e67700'}
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
      <FinalH2 block>Hello</FinalH2>
    )
  }
}

render(<App />, document.getElementById('app'))
