/* eslint-disable jsx-quotes */
import './main.js.css'
import React from 'react'
import {render} from 'react-dom'
import {emotion} from 'emotion'
import css, {fragment} from 'glam'
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

const Content = emotion('div')`
  display: flex;
`

const flexColumn = Component => {
  const NewComponent = emotion(Component)`
    flex-direction: column;
  `
  NewComponent.displayName = `flexColumn${Component.displayName}`

  return NewComponent
}

const ColumnContent = flexColumn(Content)

const H1 = emotion.h1`
  font-size: attr(fontSize px);
  margin: attr(margin rem, 4);
  font-family: sans-serif;
  color: ${colors.pink[5]};
  @media (min-width: 680px) {
    color: attr(desktopColor);
  }
`

const Title = ({title, scale}) => {
  return (
    <H1 fontSize={16 * scale} desktopColor={colors.gray[5]}>
      {title}
    </H1>
  )
}

class Profile extends React.Component {
  state = {
    name: 'Dave',
    permissionLvl: 5
  }

  render () {
    const {permissionLvl, name} = this.state
    return (
      <div css={`display:flex;flex-direction:column;`}>
        <Banner href="https://github.com/tkh44/emotion">
          emotion (github)
        </Banner>

        <label
          css={`margin: 16px 32px 4px 32px;font-size: 24px; color: ${colors.gray[8]}; font-weight: bold; font-family: sans-serif;`}
        >
          Change Color (inspect in dev tools)
        </label>
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
          {' '}
          <span css={`color: ${colors.violet[permissionLvl]}`}>{name}</span>
        </LoudMessage>
        <Title title="I Am Styled By Attr" scale={2} />
        <ColumnContent>
          <div
            css={`height: 100px; width: 100px; background-color: #20c997; margin: 8ch;`}
          />
          <div
            css={`height: 100px; width: 100px; background-color: #20c997; margin: 8ch;`}
          />
          <div
            css={`height: 100px; width: 100px; background-color: #20c997; margin: 8ch;`}
          />
          <div
            css={`height: 100px; width: 100px; background-color: #20c997; margin: 8ch;`}
          />
        </ColumnContent>
      </div>
    )
  }
}

render(<Profile permissionLvl={6} />, document.getElementById('app'))
