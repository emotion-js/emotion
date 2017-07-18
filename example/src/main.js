import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'emotion/react/theming'
import styled, { css } from 'emotion/react'
import Markdown from './markdown'
import Playground from './playground'
import logoUrl from '../../emotion.png'


const cssA = css`
  color: green;
  padding: 12;
  border: 1px solid #e67700;
`

const cssB = css`
  composes: ${cssA}
  color: red;
  font-size: 48;
  border-radius: 5;
`

const BlueH1 = styled('h1')`
  composes: ${cssB};
  color: blue;
`

const FinalH2 = styled(BlueH1)`
  font-size:32;
  color: ${p => p.block ? '#EA33C3' : '#e67700'}
`


class App extends React.Component {
  render () {
    return (
      <FinalH2 className="legacy" block>Hello <span>World</span></FinalH2>
    )
  }
}

// const Avatar = styled('div')`
//   composes: ${prettyStyles} ${blue};
//
//   &:hover > ${Image} {
//     width: 96px;
//     height: 96px;
//     borderRadius: 50%;
//   }
// `
render(<App />, document.getElementById('app'))
