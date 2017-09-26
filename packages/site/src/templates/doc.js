import React from 'react'

class BlogPostRoute extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    console.log(post)
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} className="post" />
      </div>
    )
  }
}

export default BlogPostRoute

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`
