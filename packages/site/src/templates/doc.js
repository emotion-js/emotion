import React from 'react'
import styled from 'react-emotion'
import { constants } from 'styled-system'

const Title = styled.h1`font-size: ${constants.fontSizes[8]}px;`

class DocRoute extends React.Component {
  render() {
    const doc = this.props.data.markdownRemark
    return (
      <div>
        <Title>{doc.frontmatter.title}</Title>
        <div dangerouslySetInnerHTML={{ __html: doc.html }} />
      </div>
    )
  }
}

export default DocRoute

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
