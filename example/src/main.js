/* eslint-disable jsx-quotes */
import './main.js.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {emotion} from 'emotion'
import Playground from 'component-playground'
import colors from 'open-color/open-color.json'
// eslint-disable-next-line no-unused-vars
import css from 'glam'

const componentExample = require('raw-loader!./code-blocks/basic.example')

const Input = emotion('input')`
  margin: 16px 32px;
  font-size: 2em;
  color: ${colors.gray[8]};
  outline: none;
  border: none;
  border-bottom: 2px solid ${props => colors.green[props.permissionLvl]};
`

const LoudMessage = emotion.h1`
  margin: 16px 32px;
  color: ${({permissionLvl}) => colors.green[permissionLvl]};
  font-size: 64px;
  font-family: sans-serif;
  
  &:hover {
    color: ${({permissionLvl}) => colors.blue[permissionLvl]};
  }
`

const Banner = emotion('a')`
  margin: 16px 32px;
  color: ${colors.green[5]};
  font-size: 64px;
  font-family: sans-serif;
  text-decoration: none;
  
  &:hover {
    color: ${colors.blue[5]};
  }
`

class App extends React.Component {
  state = {
    name: 'Dave',
    permissionLvl: 5
  }

  render () {
    const {permissionLvl, name} = this.state
    return (
      <div css="display:flex;flex-direction:column;">
        <Playground
          codeText={componentExample}
          scope={{React, ReactDOM, css, emotion, colors}}
        />

        <Banner href="https://github.com/tkh44/emotion">
          emotion (github)
        </Banner>
        <Input
          type="range"
          min={0}
          max={9}
          value={permissionLvl}
          placeholder="name"
          permissionLvl={permissionLvl}
          onChange={({target: {value}}) =>
            this.setState(() => ({permissionLvl: value}))}
        />
        <Input
          type="text"
          value={name}
          placeholder="name"
          permissionLvl={permissionLvl}
          onChange={({target: {value}}) => this.setState(() => ({name: value}))}
        />
        <LoudMessage permissionLvl={permissionLvl}>
          Hello
          <span css={`color: ${colors.violet[permissionLvl]}`}>{name}</span>
        </LoudMessage>
      </div>
    )
  }
}

ReactDOM.render(<App permissionLvl={6} />, document.getElementById('app'))
