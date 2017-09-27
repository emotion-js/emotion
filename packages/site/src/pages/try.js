import React, { Component } from 'react'
import Playground from '../components/Playground'

const code = `const SomeComponent = styled.div\`
  background-color: hotpink;
\`;
render(<SomeComponent>Some Text</SomeComponent>)
`

export default class Try extends Component {
  render() {
    return <Playground code={code} />
  }
}
