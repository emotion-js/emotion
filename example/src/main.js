/* eslint-disable jsx-quotes */
import './main.js.css'
import React from 'react'
import {render} from 'react-dom'
import {emotion} from 'emotion'
import css from 'glam'
import colors from 'open-color/open-color.json'

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

class Profile extends React.Component {
  state = {
    name: 'Dave',
    permissionLvl: 5
  }

  render () {
    const {permissionLvl, name} = this.state
    return (
      <div css="display:flex;flex-direction:column;">
        <Input
          type="range"
          min={0}
          max={9}
          value={permissionLvl}
          placeholder="name"
          permissionLvl={permissionLvl}
          onChange={({target: {value}}) => this.setState(() => ({permissionLvl: value}))}
        />
        <Input
          type="text"
          value={name}
          placeholder="name"
          permissionLvl={permissionLvl}
          onChange={({target: {value}}) => this.setState(() => ({name: value}))}
        />
        <LoudMessage permissionLvl={permissionLvl}>
          Hello <span css={`color: ${colors.violet[permissionLvl]}`}>{name}</span>
        </LoudMessage>
      </div>
    )
  }
}

render(<Profile permissionLvl={6} />, document.getElementById('app'))
