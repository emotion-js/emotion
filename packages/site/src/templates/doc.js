import React from 'react'

class DocRoute extends React.Component {
  render() {
    const doc = this.props.data.markdownRemark
    return (
      <div>
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
    }
  }
`
