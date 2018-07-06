import React from 'react'

import styled from '@emotion/primitives'

const Container = styled.View`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`

const Title = styled.Text`
  font-size: 20px;
  color: hotpink;
`

const Description = styled.Text`
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
