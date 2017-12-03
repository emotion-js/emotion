// @flow
import React, { Component } from 'react'
import Playground from '../components/Playground'

const code = `const SomeComponent = styled.div\`
  background-color: hotpink;
\`;
render(<SomeComponent>Some Text</SomeComponent>)
`

export default class Try extends Component<{ data: * }> {
  render() {
    return (
      <Playground
        logoUrl={this.props.data.avatar.childImageSharp.resolutions.src}
        code={code}
      />
    )
  }
}

export const pageQuery = graphql`
  query TryPageQuery {
    avatar: file(name: { eq: "emotion" }) {
      childImageSharp {
        resolutions(width: 96, height: 96) {
          src
        }
      }
    }
  }
`
