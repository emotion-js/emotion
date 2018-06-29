import React from 'react'

import emotion from '../dist/index.es'

const Container = emotion.View`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`

const Title = emotion.Text`
  font-size: 20px;
  color: hotpink;
`

const Description = emotion.Text`
  font-size: 15px;
  color: #4c4c4c;
`

class App extends React.Component {
  render() {
    return (
      <Container>
        <Title>Emotion Primitives</Title>
        <Description>Style and render primitives across targets.</Description>
      </Container>
    )
  }
}

export default App
